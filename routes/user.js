const express = require("express");

const userController = require("../controllers/userController");
const isUser = require("../middlewares/isUser");

const router = express.Router();

router.get("/getUser", isUser, userController.getUser);

router.get("/getMenuDay", isUser, userController.getMenuDay);

router.get("/getArea", isUser, userController.getArea);

router.get("/getSubArea", isUser, userController.getSubArea);

router.post("/saveAddress", isUser, userController.saveAddress);

router.put("/editAddress", isUser, userController.editAddress);

router.get("/getAddress", isUser, userController.getAddress);

router.get("/getAddress/:addressId", isUser, userController.getAddressById);

router.delete(
  "/deleteAddress/:addressId",
  isUser,
  userController.deleteAddress
);

router.post("/checkout", isUser, userController.checkout);

router.get("/getOrders", isUser, userController.getOrders);

router.post("/feedback", isUser, userController.feedback);

module.exports = router;
