const mongoose = require("mongoose");
const Status = require("../data/Status");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: false,
  },
  status: {
    type: String, //ACTIVE-INACTIVE-DELETED
    default: Status.ACTIVE,
  },
});

module.exports = mongoose.model("Item", itemSchema);
