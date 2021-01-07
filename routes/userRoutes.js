const express = require("express");

// Created router Instance
const userRoute = express.Router();

// const { verifyPostRequest } = require("../controllers/loginController");
const {
  verifyPostRequest,
  createUser,
} = require("../controllers/signUpController");

// Route definitions
// route:"/employee/"
userRoute.route("/signup").post(verifyPostRequest, createUser);

// route : "/employee/:empid"
// employeeRoute
//   .route("/:empId")
//   .delete(deleteEmpById)
//   .get(findEmpById)
//   .patch(updateEmployee);

module.exports = userRoute;
