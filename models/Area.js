const mongoose = require("mongoose");
const Status = require("../data/Status");
const Schema = mongoose.Schema;

const areaSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  status: {
    type: String, //ACTIVE-INACTIVE-DELETED
    default: Status.ACTIVE,
  },
});

module.exports = mongoose.model("Area", areaSchema);
