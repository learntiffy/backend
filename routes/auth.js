const express = require("express");

const authController = require("../controllers/authController");

const router = express.Router();

router.post("/registerUser", authController.registerUser);

router.post("/:type/login", authController.login);

router.post("/verifyOTP", authController.verifyOTP);

module.exports = router;
