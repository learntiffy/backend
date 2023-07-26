const mongoose = require("mongoose");
const Status = require("../data/Status");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  homeNo: {
    type: String,
    required: true,
  },
  society: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    required: true,
  },
  area: {
    type: Schema.Types.ObjectId,
    ref: "Area",
    required: true,
  },
  subArea: {
    type: Schema.Types.ObjectId,
    ref: "SubArea",
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  status: {
    type: String, //PENDING-ACTIVE-DELETED
    default: Status.PENDING,
  },
});

module.exports = mongoose.model("Address", addressSchema);
