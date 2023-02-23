const sequelize = require("../dbConfig");
const { DataTypes } = require("sequelize");
const userModel = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    buildingNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    purchasedItems: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    // createdItems: {
    //   type: DataTypes.ARRAY(DataTypes.BIGINT),
    //   allowNull: true,
    // },
  },
  { schema: "users", freezeTableName: true, tableName: "users" }
);

module.exports = userModel;
