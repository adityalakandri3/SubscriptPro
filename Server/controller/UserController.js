const db = require("../db/config");
const User = db.User;
const OtpModel = db.OtpModel;
const {
  hashedPassword,
  matchPassword,
} = require("../middleware/Auth.middleware");
const { sendOtp } = require("../middleware/Email.middleware");

const createUser = async (req, res) => {
  try {
    const { f_name, l_name, email, phone, password } = req.body;
    if (!f_name || !l_name || !email || !phone || !password) {
      return res.status(400).json({
        status: false,
        message: "All fields are required.",
      });
    }
    const hashed = await hashedPassword(password);
    const payload = {
      f_name,
      l_name,
      email,
      phone,
      password: hashed,
      active: "0",
      is_verified: "0",
    };

    const user = await User.create(payload);
    await sendOtp(req, user);
    return res.status(200).json({
      status: true,
      message: "User created and otp sent successfully.",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong.",
      error: error.message,
    });
  }
};

module.exports = { createUser };
