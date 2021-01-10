const express = require("express");

// Created router Instance
const userRoute = express.Router();

const {
  createUser,
  checkConfirmPassword,
  createPasswordHash,
} = require("../controllers/signUpController");
const {
  // checkRequestBody,
  // isUserRegistered,
  loginUser,
} = require("../controllers/loginController");
const {checkRequestBody,isUserRegistered,verifyPostRequest} = require("../middleware/userMiddleware")

userRoute 
  .route("/signup")
  .post(
    verifyPostRequest,
    checkConfirmPassword,
    createPasswordHash,
    createUser
  );

// Route definitions
// route:"/employee/"

userRoute.route("/login").post(checkRequestBody,isUserRegistered, loginUser);

module.exports = userRoute;
