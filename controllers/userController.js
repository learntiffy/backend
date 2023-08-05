const Status = require("../data/Status");
const MongoQuery = require("../data/MongoQuery");
const MenuuDay = require("../data/MenuDay");
const User = require("../models/User");
const Menu = require("../models/Menu");
const MenuDay = require("../models/MenuDay");
const Order = require("../models/Order");
const Area = require("../models/Area");
const SubArea = require("../models/SubArea");
const Address = require("../models/Address");
const Feedback = require("../models/Feedback");
const Response = require("../models/Response");
const crypto = require("../utils/crypto");
const mail = require('../utils/mail');

const userService = require("../services/user");

exports.getUser = async (req, res, next) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    res.json(new Response(200, "", user));
  } catch (err) {
    return next(err);
  }
};

exports.getMenuDay = async (req, res, next) => {
  try {
    const menuDay = req.query.menuDay;
    if (MenuuDay[menuDay]) {
      let dayMenu =
        menuDay === MenuuDay.ALL
          ? await MenuDay.find().populate({
            path: "menu",
            populate: { path: "items" },
          })
          : await MenuDay.find({ day: menuDay }).populate({
            path: "menu",
            populate: { path: "items" },
          });

      dayMenu.forEach(x => {
        x.menu.items = x.menu.items.filter(x => x.status === Status.ACTIVE)
      });
      res.json(new Response(200, "", dayMenu));
    } else {
      throw Error("");
    }
  } catch (err) {
    return next(err);
  }
};

exports.getArea = async (req, res, next) => {
  try {
    res.json(new Response(200, "", await Area.find({ status: Status.ACTIVE })));
  } catch (err) {
    return next(err);
  }
};

exports.getSubArea = async (req, res, next) => {
  try {
    const areaId = req.query.areaId;
    res.json(
      new Response(
        200,
        "",
        await SubArea.find({ area: areaId, status: Status.ACTIVE })
      )
    );
  } catch (err) {
    return next(err);
  }
};

exports.saveAddress = async (req, res, next) => {
  try {
    let address = req.body.address;
    const userId = req.id;
    if (address._id) {
      address = await Address.findByIdAndUpdate(address._id, address);
    } else {
      address = await new Address(address).save();
      await User.findByIdAndUpdate(userId, { $push: { address: address._id } });
    }
    res.json(new Response(200, "Address saved", address));
  } catch (err) {
    return next(err);
  }
};

exports.editAddress = async (req, res, next) => {
  try {
    const address = req.body.address;
    await Address.findByIdAndUpdate(address.addressId, address);
    res.json(new Response(200, "Address edited!!"));
  } catch (err) {
    return next(err);
  }
};

exports.deleteAddress = async (req, res, next) => {
  try {
    const addressId = req.params.addressId;
    await Address.findByIdAndUpdate(addressId, { status: Status.DELETED });
    res.json(new Response(200, "Address deleted!!"));
  } catch (err) {
    return next(err);
  }
};

exports.getAddress = async (req, res, next) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).populate({
      path: "address",
      populate: {
        path: "subArea",
        populate: {
          path: "area",
        },
      },
    });
    const address = user.address.filter(
      (x) => x.status === Status.ACTIVE
      && x.subArea.status === Status.ACTIVE
      && x.subArea.area.status === Status.ACTIVE
      );
    console.log('getAddress', {address}, {user})
    res.json(new Response(200, "", address));
  } catch (err) {
    return next(err);
  }
};

exports.getAddressById = async (req, res, next) => {
  try {
    const addressId = req.params.addressId;
    const address = await Address.findById(addressId).populate({
      path: "subArea",
      populate: {
        path: "area",
      },
    });
    res.json(new Response(200, "", address));
  } catch (err) {
    return next(err);
  }
};

exports.checkout = async (req, res, next) => {
  try {
    const userId = req.id;
    let order = req.body.order;
    order = JSON.parse(crypto.decrypt(order));

    const isItemsValid = await userService.validateOrderItems(order.items);
    if (!isItemsValid) throw Error("Items are invalid");

    const isValidAddress = await userService.validateUserAddress(userId, order);
    if (!isValidAddress) throw Error("Address is invalid");

    await userService.calculateOrderAmount(order);
    order.orderDate = new Date();
    order.user = userId;
    order = await new Order(order).save();
    order = await Order.findById(order._id).populate(MongoQuery.POPULATE_ORDER_2);
    mail.setMailOptions(order.user.email, 'Your Order With Tapauswa', mail.sendOrderMail(order));
    mail.sendMail();
    res.json(new Response(201, "", order));
  } catch (err) {
    return next(err);
  }
};

exports.feedback = async (req, res, next) => {
  try {
    let feedback = req.body.feedback;
    const orderId = feedback.orderId;
    feedback = await new Feedback(feedback).save();
    const order = await Order.findByIdAndUpdate(orderId, { feedback: feedback });
    res.json(new Response(200, "", order));
  } catch (err) {
    return next(err);
  }
}

exports.getOrders = async (req, res, next) => {
  try {
    const userId = req.id;
    let orders = await Order.find({
      user: userId,
      status: { $in: [Status.ORDERED, Status.DELIVERED] }
    })
      .populate([
        { path: 'address', populate: [{ path: 'area' }, { path: 'subArea' }] },
        { path: 'items' },
        { path: 'feedback' }
      ])
      .sort({ mealDate: -1 });
    res.json(new Response(200, "", orders));
  } catch (err) {
    return next(err);
  }
};