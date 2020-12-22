'use strict';

const mongoose = require("mongoose");


const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String },
    password: { type: String, required: true }
  },
);
const User = mongoose.model("user", userSchema);
module.exports = User;