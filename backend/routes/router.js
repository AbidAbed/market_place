const express = require("express");
const router = express.Router();
const itemsRoute = require("./itemsRoute");
const usersRoute = require("./usersRoute");
const purchaseRoute = require("./purchaseRoute");
async function errorsHandler(err, request, response, next) {
  try {
    response.status(400);

    const { details } = err;
    const error = {};

    details.forEach((element) => {
      const errorData = element.details[0];
      const { path, message } = errorData;
      error[path] = message.replaceAll('"', "");
    });

    response.json(error);
  } catch (err) {
    response.status(500).send({ error: "Internal Server Error" });
  }
}
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "PUT");
  next();
});
router.use(usersRoute);
router.use(itemsRoute);
router.use(purchaseRoute);
router.use(errorsHandler);
module.exports = router;
