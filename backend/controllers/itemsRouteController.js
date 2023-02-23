const itemsModel = require("../models/itemsModel");
async function getItems(request, response) {
  try {
    await itemsModel.sync();
    const data = await itemsModel.findAll();
    response.send(data);
  } catch (error) {
    console.error(error);
    response.status(500).send(error);
  }
}

async function postItem(request, response) {
  try {
    await itemsModel.sync();
    const data = await itemsModel.create(request.body);
    response.send(data);
  } catch (error) {
    response.status(500).send(error);
  }
}

module.exports = {
  getItems,
  postItem,
};
