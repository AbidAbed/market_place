const purchaseModel = require("../models/purchaseModel");
const userModel = require("../models/userModel");
const itemsModel = require("../models/itemsModel");
const { literal } = require("../dbConfig");
const { authUser } = require("./usersRouteController");
async function getPurchases(request, response) {
  try {
    const { id } = request.query;
    const user = await userModel.findByPk(id, {
      include: [
        {
          model: purchaseModel,
          as: "purchases",
        },
      ],
    });
    if (!user) {
      response.status(404).send({ error: "user with passed id doesn't exist" });
      return;
    } else {
      response.send(user.purchases);
    }
  } catch (err) {
    console.log(err);
    response.status(500).send({ error: "Internal Server Error" });
  }
}
async function postPurchase(request, response) {
  try {
    const { token } = request.cookies;
    const decoded = await authUser(token, response);
    if (decoded.error) {
      return;
    }
    const { items } = request.body;

    const user = await userModel.findByPk(decoded.id);
    if (!user) {
      response.send({ error: "user with passed id doesn't exist" });
      return;
    }

    let validItemsFlag = true;
    let error = {
      message: "",
      itemsId: [],
    };
    let totallCost = 0;
    const purchasedItems = [];
    const amountPurchasedArray = [];
    const addedItemIds = [];

    for (let i = 0; i < items.length; i++) {
      if (addedItemIds.includes(items[i].id)) {
        // Item has already been added to the purchase
        const itemQuery = await itemsModel.findByPk(items[i].id);
        totallCost += items[i].amountPurchased * itemQuery.price;
        continue;
      }

      let itemQuery = await itemsModel.findByPk(items[i].id);
      if (!itemQuery) {
        validItemsFlag = false;
        error.message = "no such item with id ";
        error.itemsId.push({ id: items[i].id });
        break;
      }

      let item = await itemQuery.get({ plain: true });

      if (items[i].amountPurchased > item.amount) {
        validItemsFlag = false;
        error.message = "Amount purchased is more than amount available";
        error.itemsId.push({
          id: items[i].id,
          amount: item.amount,
          amountPurchased: items[i].amountPurchased,
        });
      } else {
        item.amount = item.amount - items[i].amountPurchased;
        purchasedItems.push(item);
        amountPurchasedArray.push({
          amountPurchased: items[i].amountPurchased,
          id: item.id,
        });
        addedItemIds.push(item.id);
      }

      totallCost = totallCost + item.price * items[i].amountPurchased;
    }
    if (!validItemsFlag) {
      response.send({ error });
      return;
    }

    const purchase = await user.createPurchase({
      purchaseDate: new Date(),
      purchaseCost: totallCost,
      arrivalStatus: "pending",
    });

    for (const item of amountPurchasedArray) {
      await purchase.addItems(item.id, {
        through: { amountPurchased: item.amountPurchased },
      });
      await userModel.update(
        {
          purchasedItems: literal(
            `array_append("purchasedItems", '${item.id}')`
          ),
        },
        { where: { id: decoded.id } }
      );
    }

    await itemsModel.bulkCreate(purchasedItems, {
      updateOnDuplicate: ["amount"],
    });

    await itemsModel.update(
      { status: "OUT OF STOCK" },
      { where: { amount: 0 } }
    );

    response.send(purchase);
  } catch (err) {
    response.send({ error: "internal server error" });
  }
}

module.exports = { getPurchases, postPurchase };
