const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("marketPlace", "backend", "1234", {
  dialect: "postgres",
  host: "localhost",
  port: 5432,
});

module.exports = sequelize;
