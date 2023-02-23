const express = require("express");
const itemsRoute = express.Router();
const itemsRouteController = require("../controllers/itemsRouteController");
const { celebrate, Joi, errors, Segments } = require("celebrate");

const stringConstraint = Joi.string().required().not().empty();
const numberConstraint = Joi.number().integer().not().empty().required();

itemsRoute.get("/items", itemsRouteController.getItems);

itemsRoute.post(
  "/items",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: stringConstraint,
      price: numberConstraint,
      images: Joi.array().items(stringConstraint).required(),
      description: stringConstraint,
      status: stringConstraint,
      amount: numberConstraint,
      arrivalDate: Joi.date().iso().required(), //2023-02-19T14:30:00.000Z
    }),
  }),
  itemsRouteController.postItem
);
module.exports = itemsRoute;
