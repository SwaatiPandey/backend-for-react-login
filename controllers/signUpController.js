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
const createUser = async (req, res, next) => {
  let {
    firstName,
    lastName,
    emailId,
    userPassword,
    confirmPassword,
  } = req.body;
  try {
    let newUser = new userSignup({
      userId: uniquid() + Date.now(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      emailId: emailId.trim(),
      userPassword: userPassword.trim(),
      confirmPassword: confirmPassword.trim(),
    });

    let user = await newUser.save();

    sendResponse(201, "Successful", user, req, res);
  } catch (err) {
    console.error(err);
  }
};
module.exports.verifyPostRequest = verifyPostRequest;
module.exports.createUser = createUser;

//get all users
