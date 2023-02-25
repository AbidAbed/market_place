const express = require("express");
const purchaseController = require("../controllers/purchaseRouteController");
const purchaseRoute = express.Router();
const { celebrate, Joi, errors, Segments } = require("celebrate");

const numberConstraint = Joi.number().integer().not().empty().required();
const stringConstraint = Joi.string().required().not().empty();
purchaseRoute.get(
  "/users/purchase",
  celebrate({
    query: Joi.object().keys({
      id: numberConstraint,
    }),
  }),
  purchaseController.getPurchases
);
purchaseRoute.post(
  "/users/purchase",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      items: Joi.array()
        .items(
          Joi.object()
            .keys({
              id: numberConstraint,
              amountPurchased: numberConstraint.positive(),
            })
            .required()
        )
        .required(),
    }),
    [Segments.COOKIES]: Joi.object().keys({
      token: stringConstraint,
    }),
  }),
  purchaseController.postPurchase
);
module.exports = purchaseRoute;
