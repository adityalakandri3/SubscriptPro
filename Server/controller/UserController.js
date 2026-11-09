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

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        status: false,
        message: "Email and Otp are required",
      });
    }
    const existingUser = await User.findOne({ where: { email: email } });
    if (!existingUser) {
      return res.status(400).json({
        status: false,
        message: "No User found for this email",
      });
    }

    if (Number(existingUser.is_verified) === 1) {
      return res.status(400).json({
        status: false,
        message: "The email is already verified.",
      });
    }

    const existingUserAndOtp = await OtpModel.findOne({
      where: { user_id: existingUser.id, otp: otp },
    });
    if (!existingUserAndOtp) {
      if (Number(existingUser.is_verified) === 0) {
        await sendOtp(req, existingUser);
        return res.status(400).json({
          status: false,
          message: "Invalid OTP. New OTP has been send to your email.",
        });
      }
    }

    const currentTime = new Date();
    const expirationTime = new Date(
      existingUserAndOtp.created_at.getTime() + 15 * 60 * 1000,
    );
    if (currentTime > expirationTime) {
      await sendOtp(req, existingUser);
      return res.status(400).json({
        status: false,
        message: "OTP Expired. New OTP has been sent to your email.",
      });
    }

    const updatePayload = {
      is_verified: 1,
    };
    await User.update(updatePayload, { where: { email: email } });
    await OtpModel.destroy({ where: { email: email } });

    return res.status(200).json({
      status: true,
      message: "OTP verified successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong.",
      error: error.message,
    });
  }
};

module.exports = { createUser };
