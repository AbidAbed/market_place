const sequelize = require("../dbConfig");
const { DataTypes } = require("sequelize");
const purchaseModel = sequelize.define(
  "purchase",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    purchaseDate: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
      allowNull: false,
    },
    purchaseCost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    arrivalStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "purchase",
    freezeTableName: true,
    tableName: "purchase",
  }
);
module.exports = purchaseModel;
