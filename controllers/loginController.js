const bcrypt = require("bcryptjs");
const uniquid = require("uniquid");
const AppError = require("../helper/appErrorClass");
const sendErrorMessage = require("../helper/sendError");
const sendResponse = require("../helper/sendResponse");

const checkRequestBody = (req, res, next) => {
  let validationArray = [];
  switch(req.url){
    case "/login":
      validationArray=["email", "password"],
      break;
      default:
        return sendErrorMessage(
          new AppError(404,"Unsuccessful","Requested Url is not available"),
          req,
          res
        );
  }
  let result = validationArray.every((key)=>{
    return req.body[key] && req.body[key].trim.length;
});
  if(!result){
    return sendErrorMessage(
      new AppError(400,"Unsuccessful", "Invalid Request Body"),
      req,
      res
    );
  }
  next();
};
const isUserRegistered = (req, res, next) => {
  let findUser = users.find((user) => {
    return user.email == req.body.email;
  });

  if (!findUser) {
    return sendErrorMessage(
      new AppError(402, "Unsuccessful", "User not Registered"),
      req,
      res
    );
  }
  req.currentUser = { ...findUser };
  // req.test = "some value";
  next();
};
const loginUser = async(req,res,next)=>{
  console.log("Recent User",req.recentUser.email);
  try{
    let result= await bcrypt.compare(
      req.body.password,
      req.recentUser.password
    );
    if (!result){
      return sendErrorMessage(
        new AppError(401,"Unsuccessful", "Password is incorrect"),
        req,
        res
      );
    }
    let jwtToken = await generateToken(
      {email: req.recentUser.email},
      process.env.JWT_SECRET
    );
    console.log("Token",jwtToken);
    res.cookie("jwt",jwtToken);
    res.status(200).json({
      status:"Successful login",
      data:[
        {
          jwt:jwtToken,
        },
      ],
    });
  }catch (err){
    return sendErrorMessage(
      new AppError(500,"Unsuccessful","internal error"),
      req,
      res
    );
  }
};
module.exports.checkRequestBody= checkRequestBody;
module.exports.isUserRegistered= isUserRegistered;
module.exports.loginUser= loginUser;
