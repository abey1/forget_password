const UserModel = require("../models/userModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "makeslifeeasy.shop@gmail.com",
    pass: "ybayenfhtpxmwvcw",
  },
});

const getMailOptions = ({ to, text }) => {
  const mailOptions = {
    from: "abeydellelegn@gmail.com",
    to,
    subject: "Sending Email using Node.js",
    text,
  };
  return mailOptions;
};

const createForgetPasswordToken = ({ email, _id, secret }) => {
  return jwt.sign({ email, _id }, secret, { expiresIn: "1h" });
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

// forgot password sends email link
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
    // reset password link
    const passwordRestLink = `${process.env.SERVER_URL}/api/user/reset-password/${oldUser._id}/${token}`;
    transporter.sendMail(
      getMailOptions({ to: oldUser.email, text: passwordRestLink }),
      function (error, info) {
        if (error) {
          return console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).json({ status: "Email sent" });
        }
      }
    );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// forget password will display passowrd and confirm password after the use clicks on the link
// provided to his/her email
const handleForgetPassword = async (req, res) => {
  const { id, token } = req.params;
  //console.log("id=", id, " and token=", token);
  // verify if id is in database
  try {
    const oldUser = await UserModel.findOne({ _id: id });
    if (oldUser) {
      const secret = process.env.SECRET + oldUser.password;
      const verify = jwt.verify(token, secret);
      return res.render("index", {
        email: verify.email,
        status: "not verified",
      });
    } else {
      //console.log("User does not exist");
      return res.send("User does not exist");
    }
  } catch (error) {
    return res.send(error.message);
    //return console.log(error.message);
  }
};

// forget password: this method will receive confirmed password and updates the user details
// with the new password in the mongo database
const resetNewPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  // console.log(password);
  // verify if id is in database
  try {
    const oldUser = await UserModel.findOne({ _id: id });
    if (oldUser) {
      const secret = process.env.SECRET + oldUser.password;
      const verify = jwt.verify(token, secret);
      // encrypt new password
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);
      // update the password in the database
      const user = await UserModel.updateOne(
        { _id: id },
        { $set: { password: newPassword } }
      );
      return res.render("index", { email: verify.email, status: "verified" });
    } else {
      console.log("User does not exist");
      return res.send("User does not exist");
    }
  } catch (error) {
    res.send(error.message);
    return console.log(error.message);
  }
};

module.exports = {
  loginUser,
  signupUser,
  verifyToken,
  forgetPassword,
  handleForgetPassword,
  resetNewPassword,
};
