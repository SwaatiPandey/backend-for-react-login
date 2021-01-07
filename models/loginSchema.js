// const mongoose = require("mongoose");

// const loginSchema = new mongoose.Schema({
//     loginUserId: {
// 		type: String,
// 		unique: true,
// 		required: true,
// 	},
//   userEmail: {
//     type: String,
//     unique: true,
//     required: [true, "Please enter Email"],
//     validate: [
//       {
//         validator: function () {
//           return this.emailId.trim().length;
//         },
//         message: "User's email id should not be empty",
//       },
//       {
//         validator: function () {
//           const re = /<("[^"]*?"|'[^']*?'|[^'">])*>/;
//           if (re.test(this.emailId)) {
//             return false;
//           }
//         },
//         message: "Email id cannot be HTML",
//       },
//       {
//         validator: function () {
//           const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//           if (!re.test(this.emailId)) {
//             return false;
//           }
//         },
//         message: "Email id is not valid",
//       },
//     ],
//   },
//   },
//   password: {
//     type: String,
//     unique: true,
//     required: [true, "Please enter Email"],
//     validate: [
//       {
//         validator: function () {
//           return this.emailId.trim().length;
//         },
//         message: "User's email id should not be empty",
//       },
//       {
//         validator: function () {
//           const re = /<("[^"]*?"|'[^']*?'|[^'">])*>/;
//           if (re.test(this.emailId)) {
//             return false;
//           }
//         },
//         message: "Email id cannot be HTML",
//       },
//     ],
//   },
// });
// const UserLogin = mongoose.model("UserLogin", loginSchema);
// module.export = UserLogin;
