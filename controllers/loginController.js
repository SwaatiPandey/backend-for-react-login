const bcrypt = require("bcryptjs");
// const uniquid = require("uniquid");
const AppError = require("../helper/appErrorClass");
const sendErrorMessage = require("../helper/sendError");
// const sendResponse = require("../helper/sendResponse");
// const UserSignup = require("../models/signUpSchema");
const { generateToken } = require("../helper/jwtAuthentication");


const loginUser = async (req, res, next) => {
  console.log("Current User", req.currentUser);
  try {
    let result = await bcrypt.compare(
      req.body.userPassword,
      req.currentUser.userPassword
    );
    if (!result) {
      return sendErrorMessage(
        new AppError(401, "Unsuccessful", "Password is incorrect"),
        req,
        res
      );
    }
    let jwtToken = await generateToken(
      { emailId: req.currentUser.emailId },
      process.env.JWT_SECRET
    );
    console.log("Token", jwtToken);
    res.cookie("jwt", jwtToken);
    res.status(200).json({
      status: "Successful login",
      data: [
        {
          jwt: jwtToken,
        },
      ],
    });
  } catch (err) {
    return sendErrorMessage(
      new AppError(500, "Unsuccessful", "internal error"),
      req,
      res
    );
  }
};

module.exports.loginUser = loginUser;
