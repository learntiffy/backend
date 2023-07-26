const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  couponCount: {
    type: Number,
    required: true,
  },
  expireDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
