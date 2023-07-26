const mongoose = require("mongoose");
const Status = require("../data/Status");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    feedback: {
      type: Schema.Types.ObjectId,
      ref: "Feedback",
      required: false,
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    paymentMode: {
      type: String,
      required: false,
    },
    transactionId: {
      type: String,
      required: false,
    },
    status: {
      type: String, //CANCELLED-DELIVERED-PREPARED-ONGOING/REJECTED-ORDERED-INCART
      default: Status.INCART,
    },
    meal: {
      type: String,
      required: true,
    },
    mealDate: {
      type: Date,
      required: true,
    },
    orderDate: {
      type: Date,
      required: true,
    },
  },
);

module.exports = mongoose.model("Order", orderSchema);
