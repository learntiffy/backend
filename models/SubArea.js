const mongoose = require("mongoose");
const Status = require("../data/Status");
const Schema = mongoose.Schema;

const subAreaSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  area: {
    type: Schema.Types.ObjectId,
    ref: "Area",
    required: true,
  },
  status: {
    type: String, //ACTIVE-INACTIVE-DELETED
    default: Status.ACTIVE,
  },
});

module.exports = mongoose.model("SubArea", subAreaSchema);
