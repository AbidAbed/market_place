const express = require("express");
const usersRouteController = require("../controllers/usersRouteController.js");
const usersRoute = express.Router();
const { celebrate, Joi, errors, Segments } = require("celebrate");
const cookieParser = require("cookie-parser");

const emailConstraint = Joi.string().email().required().not().empty();
const stringConstraint = Joi.string().required().not().empty();
const numberConstraint = Joi.number().integer().not().empty().required();

usersRoute.use(cookieParser());
usersRoute.post(
  "/users/login",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: emailConstraint,
      password: stringConstraint,
    }),
  }),
  usersRouteController.postLogin
);
usersRoute.post(
  "/users/signup",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: emailConstraint,
      password: stringConstraint.min(8),
      firstName: stringConstraint,
      lastName: stringConstraint,
      mobileNumber: stringConstraint,
      city: stringConstraint,
      buildingNumber: numberConstraint,
      street: stringConstraint,
      purchasedItems: Joi.array().items(Joi.number().integer()),
    }),
  }),
  usersRouteController.postSignup
);
usersRoute.post(
  "/users/auth",
  celebrate({
    [Segments.COOKIES]: Joi.object().keys({
      token: stringConstraint,
    }),
  }),
  usersRouteController.postAuth
);
usersRoute.put(
  "/users",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: emailConstraint,
      password: stringConstraint.min(8),
      newPassword: stringConstraint.min(8).optional(),
      firstName: stringConstraint,
      lastName: stringConstraint,
      mobileNumber: stringConstraint,
      city: stringConstraint,
      buildingNumber: numberConstraint,
      street: stringConstraint,
      purchasedItems: Joi.array().items(Joi.number().integer()),
    }),
    [Segments.COOKIES]: Joi.object().keys({
      token: stringConstraint,
    }),
  }),
  usersRouteController.updateUser
);
usersRoute.get(
  "/users",
  celebrate({
    query: Joi.object().keys({
      id: numberConstraint,
    }),
  }),
  usersRouteController.getUserById
);
usersRoute.post(
  "/users/logout",
  celebrate({
    [Segments.COOKIES]: Joi.object().keys({
      token: stringConstraint,
    }),
  }),
  usersRouteController.postLogout
);
//usersRoute.use(usersRouteController.errorsHandler);
module.exports = usersRoute;
