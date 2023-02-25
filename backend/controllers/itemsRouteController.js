const itemsModel = require("../models/itemsModel");
const jwt = require("jsonwebtoken");
const SECRETKEY = "secretKey";
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
//protected
async function postItem(request, response) {
  try {
    const token = request.headers["authorization"];
    const decoded = await jwt.verify(token, SECRETKEY);
    if (!decoded.isAdmin) {
      response.status(401).send({ error: "unAutharized user" });
      return;
    }
    await itemsModel.sync();
    const data = await itemsModel.create(request.body);
    response.send(data);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      response.status(401).send({ auth: false, message: "expired token" });
    } else {
      response.status(401).send({ auth: false, message: "invalid token" });
    }
  }
}

module.exports = {
  getItems,
  postItem,
};
