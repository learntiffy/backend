const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  comment: {
    type: String
  },
  foodRating: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
