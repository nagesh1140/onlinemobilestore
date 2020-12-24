const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  imagelink: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
