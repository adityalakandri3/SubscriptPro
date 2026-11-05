const transporter = require("../db/email.config");
const db= require("../db/config");
const OtpModel=db.OtpModel;

const sendOtp = async(req,user)=>{
    const otp = Math.floor(1000+(Math.random()*9000));

    const payload={
        otp:otp,
        user_id:user.id
    }
     await OtpModel.create(payload);

     await transporter.sendMail({
        from:process.env.SMTP_USER,
        to:user.email,
        subject:"verify OTP",

     })
     return otp;
}

module.exports ={sendOtp};