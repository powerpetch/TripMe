const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  comment: String,
  name: String,
  img: String,
  rating: Number,
});

module.exports = mongoose.model("Post", postSchema);
