const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const saltRounds = 2;
const SECRETKEY = "secretKey";
async function authUser(token, response) {
  try {
    const decoded = await jwt.verify(token, SECRETKEY);
    return decoded;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      response.status(401).send({ auth: false, message: "expired token" });
    } else {
      response.status(401).send({ auth: false, message: "invalid token" });
    }
    return { error };
  }
}
async function postLogin(request, response) {
  try {
    const user = await userModel.findOne({
      where: { email: request.body.email },
    });
    if (!user) {
      return response
        .status(404)
        .send({ email: "Email does not exist", password: "" });
    }
    const isMatch = await bcrypt.compare(request.body.password, user.password);
    if (!isMatch) {
      return response
        .status(401)
        .send({ email: "", password: "wrong password" });
    }
    const { password, ...userData } = user.get({ plain: true });

    const token = await jwt.sign(
      { email: userData.email, id: userData.id, isAdmin: userData.isAdmin },
      SECRETKEY
    );
    response.cookie("token", token, { maxAge: 1000 * 60 * 60, httpOnly: true });
    response.send(userData);
  } catch (error) {
    response
      .status(500)
      .send({ message: error.message || "Internal server error" });
  }
}

async function postSignup(request, response) {
  try {
    const signupObj = { ...request.body };
    const hashedPassword = await bcrypt.hash(signupObj.password, saltRounds);
    signupObj.password = hashedPassword;
    const [newUser, created] = await userModel.findOrCreate({
      where: { email: signupObj.email },
      defaults: signupObj,
    });
    if (created) {
      const {
        email,
        id,
        firstName,
        lastName,
        mobileNumber,
        city,
        buildingNumber,
        street,
        purchasedItems,
      } = newUser;
      response.send({
        email,
        id,
        firstName,
        lastName,
        mobileNumber,
        city,
        buildingNumber,
        street,
        purchasedItems: purchasedItems || [],
      });
    } else {
      response
        .status(409)
        .send({ email: "user already exists with passed email" });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: "internal server error" });
  }
}

async function postAuth(request, response) {
  try {
    const { token } = request.cookies;
    const { id } = await authUser(token, response);
    await userModel.sync();
    const user = await userModel.findByPk(id);
    if (user) {
      const {
        email,
        id,
        firstName,
        lastName,
        mobileNumber,
        city,
        buildingNumber,
        street,
        purchasedItems,
      } = user;

      const data = {
        email,
        id,
        firstName,
        lastName,
        mobileNumber,
        city,
        buildingNumber,
        street,
        purchasedItems: purchasedItems || [],
      };
      response.send({ auth: true, message: "valid token", data });
    } else {
      response.status(404).send({ error: "user doesn't exist" });
    }
  } catch (error) {}
}

async function updateUser(request, response) {
  try {
    const { token } = request.cookies;
    const decoded = await authUser(token, response);
    if (decoded.error) {
      return;
    }
    const userData = await userModel.findByPk(decoded.id);

    if (!userData) {
      response.status(404).send({ error: "user doesn't exist" });
      return;
    }

    const { password } = userData;

    const passwordMatch = await bcrypt.compare(request.body.password, password);

    if (!passwordMatch) {
      response.status(401).send({ email: "", password: "wrong password" });
      return;
    }

    let updatedData;

    if (request.body.newPassword) {
      const hash = await bcrypt.hash(request.body.newPassword, saltRounds);
      updatedData = {
        email: request.body.email,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        mobileNumber: request.body.mobileNumber,
        city: request.body.city,
        buildingNumber: request.body.buildingNumber,
        street: request.body.street,
        password: hash,
      };
    } else {
      updatedData = {
        email: request.body.email,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        mobileNumber: request.body.mobileNumber,
        city: request.body.city,
        buildingNumber: request.body.buildingNumber,
        street: request.body.street,
      };
    }

    const [, [updatedUserData]] = await userModel.update(updatedData, {
      where: { id: decoded.id },
      returning: true,
    });

    const {
      email,
      id,
      firstName,
      lastName,
      mobileNumber,
      city,
      buildingNumber,
      street,
    } = updatedUserData;

    response.send({
      email,
      id,
      firstName,
      lastName,
      mobileNumber,
      city,
      buildingNumber,
      street,
    });
  } catch (error) {
    console.error(error);
    response.status(500).send({ error: "Internal Server Error" });
  }
}

async function getUserById(request, response) {
  const { id } = request.query;

  try {
    const user = await userModel.findByPk(id);

    if (!user) {
      response.status(404).send({ error: "id doesn't exist" });
      return;
    }

    response.send({
      email: user.email,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      mobileNumber: user.mobileNumber,
      city: user.city,
      buildingNumber: user.buildingNumber,
      street: user.street,
      purchasedItems: user.purchasedItems,
    });
  } catch (err) {
    response.status(500).send({ error: "Internal Server Error" });
  }
}

async function postLogout(request, response) {
  try {
    response.cookie("token", "", { maxAge: 0, httpOnly: true });
    response.status(200).send();
  } catch (err) {
    response.status(500).send({ error: "internal server error" });
  }
}
module.exports = {
  postLogin,
  postSignup,
  postAuth,
  updateUser,
  getUserById,
  postLogout,
  authUser
};
