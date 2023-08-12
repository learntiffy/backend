const logger = require("../utils/logger");
const Order = require("../models/Order");
const MenuDay = require("../models/MenuDay");
const Response = require("../models/Response");

const adminService = require("../services/admin");
const Status = require("../data/Status");

const ApiType = Object.freeze({
  USER: "user",
  AREA: "area",
  SUBAREA: "subArea",
  ITEM: "item",
  MENU: "menu",
  MENUDAY: "menuDay",
  ORDER: "order",
});

exports.save = async (req, res, next) => {
  switch (req.params.type) {
    case ApiType.AREA:
      await adminService.saveArea(req, res, next);
      break;
    case ApiType.SUBAREA:
      await adminService.saveSubArea(req, res, next);
      break;
    case ApiType.ITEM:
      await adminService.saveItem(req, res, next);
      break;
    case ApiType.MENU:
      await adminService.saveMenu(req, res, next);
      break;
  }
};

exports.get = async (req, res, next) => {
  switch (req.params.type) {
    case ApiType.USER:
      await adminService.getUsers(req, res, next);
      break;
    case ApiType.AREA:
      await adminService.getArea(req, res, next);
      break;
    case ApiType.SUBAREA:
      await adminService.getSubArea(req, res, next);
      break;
    case ApiType.ITEM:
      await adminService.getItem(req, res, next);
      break;
    case ApiType.MENU:
      await adminService.getMenu(req, res, next);
      break;
    case ApiType.MENUDAY:
      await adminService.getMenuDay(req, res, next);
      break;
    case ApiType.ORDER:
      await adminService.getOrder(req, res, next);
      break;
  }
};

exports.setMenu = async (req, res, next) => {
  const menuDay = req.body.menuDay;
  await MenuDay.findByIdAndUpdate(menuDay._id, menuDay);
  logger.info(`MenuDay updated - ${menuDay._id}`);
  res.json(new Response(201, "MenuDay updated!!"));
};

exports.changeOrderStatus = async (req, res, next) => {
  const order = req.body.order;
  if (Status[order.status]) {
    await Order.findByIdAndUpdate(order._id, { status: order.status });
    logger.info(`Order status updated (OrderId - ${order._id}, Status - ${order.status})`);
    res.json(new Response(201, "Order status changed!!"));
  } else
    res.json(new Response(401, "Invalid order status!!"));
};
