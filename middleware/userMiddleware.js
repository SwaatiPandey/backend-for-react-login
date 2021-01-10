const AppError = require("../helper/appErrorClass");
const sendErrorMessage = require("../helper/sendError");
const UserSignup=require("../models/signUpSchema")

const checkRequestBody = (req, res, next) => {
  let validationArray = [];
  switch (req.url) {
    case "/login":
      validationArray = ["emailId", "userPassword"];
      break;
      case "/signup":
        validationArray = ["firstName","lastName", "emailId", "userPassword","confirmPassword"];
        break;
    default:
      return sendErrorMessage(
        new AppError(404, "Unsuccessful", "Requested Url is not available"),
        req,
        res
      );
  }
  let result = validationArray.every((key) => {
    return req.body[key] && req.body[key].trim().length;
  });
  if (!result) {
    return sendErrorMessage(
      new AppError(400, "Unsuccessful", "Invalid Request Body"),
      req,
      res
    );
  }
  next();
};

const isUserRegistered = (req, res, next) => {
    console.log(req.body.emailId);
    UserSignup.findOne({ emailId: req.body.emailId })
      .then((user) => {
        console.log("User", user);
        // findUser = user;
        req.currentUser = user;
        if (!user) {
          return sendErrorMessage(
            new AppError(402, "Unsuccessful", "User not Registered"),
            req,
            res
          );
        }
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
module.exports.checkRequestBody= checkRequestBody;
module.exports.isUserRegistered = isUserRegistered;
module.exports.verifyPostRequest= verifyPostRequest;
