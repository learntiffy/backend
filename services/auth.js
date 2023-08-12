const User = require("../models/User");
const Response = require("../models/Response");
const Status = require("../data/Status");
const UserType = require("../data/UserType");
const jwt = require("../utils/jwt");
const otp = require('../utils/otp');
const mail = require('../utils/mail');
const logger = require("./utils/logger");

exports.userLogin = async (req, res, next) => {
  try {
    const email = req.body.email;
    let user = await User.findOne({ email: email });
    if (user) {
      if ([Status.REGISTERED, Status.ACTIVE].includes(user.status)) {
        await this.sendToken(user);
        logger.info(`OTP sent successfully to ${email}`);
        res.json(new Response(200, "OTP sent successfully"));
      } else {
        res.json(new Response(401, "User isn't verified"));
      }
    } else {
      res.json(new Response(404, "User doen't exist"));
    }
  } catch (err) {
    return next(err);
  }
};

exports.adminLogin = async (req, res, next) => {
  try {
    const userName = req.body.userName;
    const password = req.body.password;
    if (
      userName === process.env.ADMIN_USER &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const jwtToken = jwt.generate(
        { userName: userName, type: UserType.ADMIN },
        "180d"
      );
      logger.info(`Admin logged in successfully`);
      res.json(new Response(200, "Login successfully", jwtToken));
    } else {
      res.json(new Response(400, "Invalid credentials"));
    }
  } catch (err) {
    return next(err);
  }
};

exports.sendToken = async (user) => {
  const OTP = otp.generateOTP();
  user.token = otp.getOtpToken(OTP);
  await user.save();
  mail.setMailOptions(user.email, 'Verify OTP', mail.sendOTPMail(user.firstName, user.lastName, OTP));
  mail.sendMail();
}
