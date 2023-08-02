const express = require("express");

const adminController = require("../controllers/adminController");
const isAdmin = require("../middlewares/isAdmin");

const router = express.Router();

router.post("/save/:type", isAdmin, adminController.save);

router.get("/get/:type", isAdmin, adminController.get);

router.put("/set/menu", isAdmin, adminController.setMenu);

router.put("/change/order/status", isAdmin, adminController.changeOrderStatus);

module.exports = router;