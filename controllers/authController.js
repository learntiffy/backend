const User = require("../models/User");
const Response = require("../models/Response");
const UserType = require("../data/UserType");
const jwt = require('../utils/jwt');
const Status = require('../data/Status');

const authService = require("../services/auth");

exports.registerUser = async (req, res, next) => {
  try {
    let user = req.body.user;
    user = await new User(user).save();
    res.json(new Response(201, "User Created"));
  } catch (err) {
    if (err.name === "MongoServerError") {
      res.json(
        new Response(
          401,
          err.keyValue.mobile
            ? "MobileNo already exists"
            : "Email already exists"
        )
      );
    }
    return next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const type = req.params.type.toUpperCase();
    switch (type) {
      case UserType.USER:
        await authService.userLogin(req, res, next);
        break;
      case UserType.ADMIN:
        await authService.adminLogin(req, res, next);
        break;
    }
  } catch (err) {
    return next(err);
  }
};

exports.verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email: email });
    console.log({email, otp});
    console.log(user);
    if (user && user.status !== Status.INACTIVE) {
      if (otp === jwt.verify(user.token).otp) {
        const jwtToken = jwt.generate(
          { id: user._id, mobile: user.email, type: UserType.USER },
          "365d"
        );
        user.status = Status.ACTIVE;
        await user.save();
        res.json(new Response(200, 'OTP verification successfull!!', jwtToken));
      } else {
        res.json(new Response(401, 'Invalid OTP!! Please try again.'));
      }
    } else {
      res.json(new Response(401, 'The user either does not exist or is not authorised to access the application at the moment.'));
    }
  } catch (err) {
    return next(err);
  }
}

