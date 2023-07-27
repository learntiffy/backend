const Status = require("../data/Status");
const User = require("../models/User");
const Area = require("../models/Area");
const SubArea = require("../models/SubArea");
const Item = require("../models/Item");
const Menu = require("../models/Menu");
const Order = require("../models/Order");
const MenuDay = require("../models/MenuDay");
const Response = require("../models/Response");

const cloudinary = require("../utils/cloudinary");

exports.saveArea = async (req, res, next) => {
  try {
    let area = req.body.area;
    area = area._id
      ? await Area.findByIdAndUpdate(area._id, area)
      : await new Area(req.body.area).save();
    res.json(new Response(200, "Area saved", area));
  } catch (err) {
    return next(err);
  }
};

exports.saveSubArea = async (req, res, next) => {
  try {
    let subArea = req.body.subArea;
    subArea = subArea._id
      ? await SubArea.findByIdAndUpdate(subArea._id, subArea)
      : await new SubArea(req.body.subArea).save();
    res.json(new Response(200, "SubArea saved", subArea));
  } catch (err) {
    return next(err);
  }
};


exports.saveItem = async (req, res, next) => {
  try {
    let item = JSON.parse(req.body.item)
    const isUpdateImage = item._id ? (item.isUpdateImage ? true : false) : true;
    item = item._id
      ? await Item.findByIdAndUpdate(item._id, item)
      : await new Item(item).save();

    if (isUpdateImage) {
      await cloudinary.upload(item._id, req.file, async (error, result) => {
        if (error) {
          console.log(`Error in cloudinary: ${error}`);
          return;
        }
        item.imageURL = result.secure_url;
        await item.save();
        res.json(new Response(200, "Item saved", item));
      });
    } else {
      res.json(new Response(200, "Item saved", item));
    }
  } catch (err) {
    return next(err);
  }
};

exports.saveMenu = async (req, res, next) => {
  try {
    let menu = req.body.menu;
    menu = menu._id
      ? await Menu.findByIdAndUpdate(menu._id, menu)
      : await new Menu(req.body.menu).save();
    res.json(new Response(200, "Menu saved", menu));
  } catch (err) {
    return next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    res.json(new Response(200, "", await User.find({}, { token: 0, _v: 0 })));
  } catch (err) {
    return next(err);
  }
};

exports.getArea = async (req, res, next) => {
  try {
    res.json(new Response(200, "", await Area.find()));
  } catch (err) {
    return next(err);
  }
};

exports.getSubArea = async (req, res, next) => {
  try {
    const areaId = req.query.areaId;
    res.json(new Response(200, "", await SubArea.find({ area: areaId })));
  } catch (err) {
    return next(err);
  }
};

exports.getItem = async (req, res, next) => {
  try {
    res.json(new Response(200, "", await Item.find()));
  } catch (err) {
    return next(err);
  }
};

exports.getMenu = async (req, res, next) => {
  try {
    const menuId = req.query.menuId;
    const menu = menuId
      ? await Menu.findById({ _id: menuId }).populate({
        path: "items",
      })
      : await Menu.find();
    res.json(new Response(200, "", menu));
  } catch (err) {
    return next(err);
  }
};

exports.getMenuDay = async (req, res, next) => {
  try {
    const menuDay = await MenuDay.find().populate({ path: "menu" });
    const menuByDay = {
      today: {
        lunch: menuDay.find(x => x.day.includes('TODAY_LUNCH')),
        dinner: menuDay.find(x => x.day.includes('TODAY_DINNER'))
      },
      tomo: {
        lunch: menuDay.find(x => x.day.includes('TOMO_LUNCH')),
        dinner: menuDay.find(x => x.day.includes('TOMO_DINNER'))
      },
    }
    res.json(
      new Response(200, "", menuByDay)
    );
  } catch (err) {
    return next(err);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const orderId = req.query.orderId;
    const date = req.query.date;
    let order;
    if (orderId) {

    } else if (date) {
      order = await Order.find({ status: Status.INCART }).populate([
        {
          path: "user",
          select: { firstName: 1, lastName: 1, mobile: 1 }
        },
        {
          path: "address",
          populate: [
            {
              path: "area",
              select: { name: 1, pincode: 1 }
            },
            {
              path: "subArea",
              select: { name: 1 }
            },
          ]
        },
        {
          path: "items",
          select: { name: 1 }
        },
        {
          path: "feedback"
        }
      ]);
    }
    res.json(new Response(200, "", order));
  } catch (err) {
    return next(err);
  }
};
