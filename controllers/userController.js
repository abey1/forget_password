const UserModel = require("../models/userModels");
const jwt = require("jsonwebtoken");

const createForgetPasswordToken = ({ email, _id, secret }) => {
  return jwt.sign({ email, _id }, secret, { expiresIn: "5m" });
};

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1h" });
};

// verify token
const verifyToken = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    const { email } = await UserModel.findOne({ _id });
    const newToken = createToken(_id);
    // send an updated token as well
    res.status(200).json({ email, token: newToken });
  } catch (error) {
    res.status(400).json({ error });
  }
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.signup(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// forgot password
const forgetPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email must be filled in" });
  }
  try {
    const oldUser = await UserModel.findOne({ email });
    if (!oldUser) {
      return res.status(400).json({ error: "User does not exist" });
    }
    const secret = process.env.SECRET + oldUser.password;
    const token = createForgetPasswordToken({
      email: oldUser.email,
      _id: oldUser._id,
      secret,
    });
    const passwordRestLink = `${process.env.SERVER_URL}/api/user/reset-password/${oldUser._id}/${token}`;
    console.log(passwordRestLink);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// handle forget password
const handleForgetPassword = async (req, res) => {
  const { id, token } = req.params;
  console.log("id=", id, " and token=", token);
  // verify if id is in database
  try {
    const oldUser = await UserModel.findOne({ _id: id });
    if (oldUser) {
      const secret = process.env.SECRET + oldUser.password;
      const verify = jwt.verify(token, secret);
      return res.send("Verified");
    } else {
      console.log("User does not exist");
      return res.send("User does not exist");
    }
  } catch (error) {
    res.send(
      `${error.message} please hit forget password again and resend the link to your email`
    );
    return console.log(error.message);
  }
};

module.exports = {
  loginUser,
  signupUser,
  verifyToken,
  forgetPassword,
  handleForgetPassword,
};
