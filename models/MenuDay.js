const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuDaySchema = new Schema({
  day: {
    type: String,
    required: true,
  },
  menu: {
    type: Schema.Types.ObjectId,
    ref: "Menu",
  },
  isSet: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("MenuDay", menuDaySchema);
