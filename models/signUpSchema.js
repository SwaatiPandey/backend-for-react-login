const mongoose = require("mongoose");

const userSignupSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
  },
  firstName: {
    type: String,
    required: [true, "Please enter First Name"],
    validate: [
      {
        validator: function () {
          return this.firstName.trim().length;
        },
        message: "Firstname should not be empty",
      },
      {
        validator: function () {
          const re = /<("[^"]*?"|'[^']*?'|[^'">])*>/;
          if (re.test(this.firstName)) {
            return false;
          }
        },
        message: "Firstname cannot be HTML",
      },
    ],
  },
  lastName: {
    type: String,
    required: [true, "Please enter last Name"],
    validate: [
      {
        validator: function () {
          return this.lastName.trim().length;
        },
        message: "Last name should not be empty",
      },
      {
        validator: function () {
          const re = /<("[^"]*?"|'[^']*?'|[^'">])*>/;
          if (re.test(this.lastName)) {
            return false;
          }
        },
        message: "Lastname content cannot be HTML",
      },
    ],
  },
  emailId: {
    type: String,
    required: [true, "Please enter Email"],
    // unique: true,
    validate: [
      {
        validator: function () {
          return this.emailId.trim().length;
        },
        message: "User's email id should not be empty",
      },
      {
        validator: function () {
          const re = /<("[^"]*?"|'[^']*?'|[^'">])*>/;
          if (re.test(this.emailId)) {
            return false;
          }
        },
        message: "Email id cannot be HTML",
      },
      {
        validator: function () {
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

          if (!re.test(this.emailId)) {
            return false;
          }
        },
        message: "Email id is not valid",
      },
    ],
  },
  userPassword: {
    type: String,
    required: [true, "Please enter Password"],
    validate: [
      {
        validator: function () {
          return this.lastName.trim().length;
        },
        message: "Password should not be empty",
      },
      {
        validator: function () {
          const re = /<("[^"]*?"|'[^']*?'|[^'">])*>/;
          if (re.test(this.lastName)) {
            return false;
          }
        },
        message: "password content cannot be HTML",
      },
    ],
  },
  confirmPassword: {
    type: String,
    required: [true, "Please enter Confirm Password"],
    validate: [
      {
        validator: function () {
          return this.lastName.trim().length;
        },
        message: "Confirm Password should not be empty",
      },
      {
        validator: function () {
          const re = /<("[^"]*?"|'[^']*?'|[^'">])*>/;
          if (re.test(this.lastName)) {
            return false;
          }
        },
        message: "Confirm password content cannot be HTML",
      },
    ],
  },
});
const UserSignup = mongoose.model("UserSignup", userSignupSchema);
module.exports = UserSignup;
