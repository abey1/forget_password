const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const userRoute = require("./routes/userRoute");
const cors = require("cors");

// express app
const app = express();

// use cors
app.use(cors());

// allows the server to use json
app.use(express.json());

//routes
app.use("/api/user", userRoute);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to DB & listening on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
