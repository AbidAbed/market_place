const jwt = require("jsonwebtoken");
const express = require("express");
const router = require("./routes/router");
const morgan = require("morgan");
const itemsModel = require("./models/itemsModel");
const userModel = require("./models/userModel");
const purchaseModel = require("./models/purchaseModel");
const sequelize = require("./dbConfig");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const SECRETKEY = "secretKey";
const saltRounds = 2;

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
  await sequelize.sync({ force: true });
  const [admin, created] = await userModel.findOrCreate({
    where: { email: "admin@admin.com" },
    defaults: {
      email: "admin@admin.com",
      password: await bcrypt.hash("admin1234", saltRounds),
      firstName: "super",
      lastName: "admin",
      mobileNumber: "00000-000-0000000",
      city: "admins's city",
      buildingNumber: "69",
      street: "admins's street",
      isAdmin: true,
    },
  });
  const token = await jwt.sign(
    { email: admin.email, id: admin.id, isAdmin: admin.isAdmin },
    SECRETKEY
  );
  console.log(token);
}
syn();
app.use(morgan("dev"));
app.use(router);