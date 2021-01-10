const { verifyToken } = require("../helper/jwtAuthentication");
const sendErrorMessage = require("../helper/sendError");
const AppError = require("../helper/appErrorClass");
//function to protect route
const protectRoute = async (req, res, next) => {
  // extract token
  if (!req.headers.authorization) {
    return sendErrorMessage(
      new AppError(401, "Unsuccessful", "Please login or signup"),
      req,
      res
    );
  }
  // if headers are present
  let jwtToken = req.headers.authorization.split(" ")[1];
  let decoded;
  try {
    decoded = await verifyToken(jwtToken, process.env.JWT_SECRET);
  } catch (err) {
    return sendErrorMessage(
      new AppError(401, "Unsuccesssul", "Invalid Token"),
      req,
      res
    );
  }
  //to check if users registered
  let { email: currentUser } = users.find((user) => {
    return user.email == decoded.email;
  });
  if (!currentUser) {
    return sendErrorMessage(
      new AppError(401, "Unsuccesssul", "User not valid"),
      req,
      res
    );
  }
  // check verification
  req.currentUser = currentUser;
  // give access
  next();
};
module.exports = protectRoute;