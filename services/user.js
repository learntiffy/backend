const User = require("../models/User");
const Address = require("../models/Address");
const Item = require("../models/Item");
const Status = require("../data/Status");
const ItemType = require("../data/ItemType");

exports.validateOrderItems = async (items) => {
    let sabjiCnt = 0, rotiCnt = 0, dalCnt = 0, riceCnt = 0;
    for (item of items) {
        item = await Item.findById(item);
        if (item.status === Status.ACTIVE) {
            switch (item.type) {
                case ItemType.SABJI:
                    sabjiCnt++;
                    break;
                case ItemType.ROTI:
                    rotiCnt++;
                    break;
                case ItemType.DAL:
                    dalCnt++;
                    break;
                case ItemType.RICE:
                    riceCnt++;
                    break;
            }
        }
    }
    return (sabjiCnt === 2 && rotiCnt === 1 && dalCnt === 1 && riceCnt === 1);
}

exports.validateUserAddress = async (userId, order) => {
    try {
        const user = await User.findById(userId).populate({ path: 'address' });
        const address = user.address.find(x => x._id.toString() == order.address);
        if (address.status === Status.ACTIVE) {
            let _address = { ...address._doc };
            delete _address._id;
            _address = await new Address(_address).save();
            order.address = _address;
        }
        return address.status === Status.ACTIVE;
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.calculateOrderAmount = async (order) => {
    let amount = 0;
    for (item of order.items) {
        item = await Item.findById(item);
        amount += item.price;
    }
    order.amount = amount;
}