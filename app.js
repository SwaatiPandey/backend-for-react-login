// Import Packages
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Module Imports
const userRoute = require("./routes/userRoutes");

// .env path
dotenv.config({ path: "./config.env" });

// Server Create
const app = express();

// Express Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes import
app.use("/users/", userRoute);

// Home Page
app.get("/", (req, res) => {
  res.json({
    status: "Sucessfull",
    message: "This is the Home Page",
  });
});

// 404 Not Found Page
app.get("*", (req, res) => {
  res.json({
    status: "Sucessfull",
    message: "No Routes Found",
  });
});

// DB Connection
try {
  mongoose.connect(
    process.env.DATABASE_URL,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    () => {
      console.log("Connected to DB!");
      app.listen(
        process.env.PORT,
        console.log(`http://localhost:${process.env.PORT}`)
      );
    }
  );
} catch (error) {
  console.log(error);
}
