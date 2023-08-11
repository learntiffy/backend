const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const forumSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    postDate: {
      type: Date,
      required: true,
    },
  },
);

module.exports = mongoose.model("Forum", forumSchema);
