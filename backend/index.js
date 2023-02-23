const express = require("express");
const router = require("./routes/router");
const morgan = require("morgan");
const itemsModel = require("./models/itemsModel");
const userModel = require("./models/userModel");
const purchaseModel = require("./models/purchaseModel");
const sequelize = require("./dbConfig");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
sequelize
  .authenticate()
  .then((data) => {
    app.listen(3001);
  })
  .catch((err) => {
    console.log(err);
  });


userModel.hasMany(purchaseModel);
purchaseModel.belongsTo(userModel);

purchaseModel.belongsToMany(itemsModel, { through: "PurchaseItems" });
itemsModel.belongsToMany(purchaseModel, { through: "PurchaseItems" });

async function syn() {
  await sequelize.sync();
}
syn();
app.use(morgan("dev"));
app.use(router);