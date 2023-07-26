const { body } = require("express-validator");

const isPassword = (exports.isPassword = (value) => {
  if (value.length < 8) {
    throw new Error("Your password must contain at least 8 characters.");
  }
  if (value.search(/[A-Z]/) < 0) {
    throw new Error("Your password must contain at least one capital letter.");
  }
  if (value.search(/[0-9]/) < 0) {
    throw new Error("Your password must contain at least one digit.");
  }
  if (value.search(/[!@#$%^&*]/) < 0) {
    throw new Error(
      "Your password must contain at least one special character."
    );
  }
});

exports.isRegisterUser = () => {
  return [
    body("user.userName").notEmpty().withMessage("Invalid userName"),
    body("user.firstName").notEmpty().withMessage("Invalid firstName"),
    body("user.lastName").notEmpty().withMessage("Invalid lastName"),
    body("user.mobile")
      .isNumeric()
      .isLength({ min: 10, max: 10 })
      .withMessage("Invalid mobile number"),
    body("user.email").isEmail().withMessage("Invalid email"),
    body("user.password").custom((value) => {
      isPassword(value);
      return true;
    }),
  ];
};
