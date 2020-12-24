const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  logintime: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Login", loginSchema);
