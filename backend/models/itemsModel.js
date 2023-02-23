const sequelize = require("../dbConfig");
const { DataTypes } = require("sequelize");
const itemsModel = sequelize.define(
  "items",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    // creatorId: {
    //   type: DataTypes.BIGINT,
    //   allowNull: false,
    // },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    arrivalData: {
      type: DataTypes.DATE,
    },
    // purchasedBy: {
    //   type: DataTypes.ARRAY(DataTypes.BIGINT),
    // },
  },
  {
    schema: "items",
    freezeTableName: true,
    tableName:"items"
  }
);
module.exports = itemsModel;
