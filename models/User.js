const mongoose = require("mongoose");
const Status = require("../data/Status");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: [
    {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
  ],
  token: {
    type: String
  },
  status: {
    type: String, //REGISTERED-ACTIVE-DELETED
    default: Status.REGISTERED,
  },
});

module.exports = mongoose.model("User", userSchema);
