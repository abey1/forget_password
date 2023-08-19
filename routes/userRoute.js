const express = require("express");
const router = express.Router();

// controller functions
const {
  loginUser,
  signupUser,
  verifyToken,
} = require("../controllers/userController");

// verify token
router.post("/verify", verifyToken);

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

module.exports = router;
