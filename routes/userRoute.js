const express = require("express");
const router = express.Router();

// controller functions
const {
  loginUser,
  signupUser,
  verifyToken,
  forgetPassword,
  handleForgetPassword,
} = require("../controllers/userController");

// verify token
router.post("/verify", verifyToken);

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// forget password
router.post("/forget-password", forgetPassword);

// handle forget password request
router.get("/reset-password/:id/:token", handleForgetPassword);

module.exports = router;
