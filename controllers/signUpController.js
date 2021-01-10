const bcrypt = require("bcryptjs");
const uniquid = require("uniquid");
const AppError = require("../helper/appErrorClass");
const sendErrorMessage = require("../helper/sendError");
const sendResponse = require("../helper/sendResponse");
const userSignup = require("../models/signUpSchema");

const verifyPostRequest = (req, res, next) => {
  console.log(req.body);
  const requiredProperties = [
    "firstName",
    "lastName",
    "emailId",
    "userPassword",
    "confirmPassword",
  ];
  let result = requiredProperties.every((key) => {
    return req.body[key];
  });
  if (!result) {
    sendErrorMessage(
      new AppError(400, "unsuccessful", "request body is inavlid"),
      req,
      res
    );
  } else {
    next();
  }
};
const checkConfirmPassword = (req, res, next) => {
  if (req.body.userPassword !== req.body.confirmPassword) {
    return sendErrorMessage(
      new AppError(400, "Unsuccessful", "Password and confirm dont match")
    );
  }
  next();
};
const createPasswordHash = async (req, res, next) => {
  try {
    let salt = await bcrypt.genSalt(10);
    req.body.userPassword = await bcrypt.hash(req.body.userPassword, salt);
    next();
  } catch (err) {
    return sendErrorMessage(
      new AppError(500, "Unsuccessful", "Internal Error"),
      req,
      res
    );
  }
};
const createUser = async (req, res, next) => {
  let { firstName, lastName, emailId, userPassword } = req.body;
  try {
    let newUser = new userSignup({
      userId: uniquid() + Date.now(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      emailId: emailId.trim(),
      userPassword: userPassword.trim(),
    });

    let user = await newUser.save();

    sendResponse(201, "Successful", user, req, res);
  } catch (err) {
    console.error(err);
  }
};
module.exports.verifyPostRequest = verifyPostRequest;
module.exports.checkConfirmPassword = checkConfirmPassword;
module.exports.createPasswordHash = createPasswordHash;
module.exports.createUser = createUser;
//get all users
