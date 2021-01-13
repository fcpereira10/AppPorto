'use strict';

const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String },
    password: { type: String, required: true },
    isAdmin: {type: Boolean, required: true}
  },
);
function jwtSecret() {
  return "secret"; //TODO CHANGE TO BE IN .ENV FILE
}

userSchema.methods = {
  checkPassword(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  

  generateJWT() {
    return jwt.sign(
      {
        _id: this._id,
        username: this.username,
        email: this.email,
        isAdmin: this.isAdmin, 
      },
      jwtSecret(),
    );
  },
  toAuthJSON() {
    return {
      _id: this._id,
      username: this.username,
      email: this.email,
      isAdmin: this.isAdmin,
      token: this.generateJWT(),
    };
  },
};

function setUsername(next) {
  this.username = this.get("username")
  next();
}

userSchema.pre('save', setUsername);
const User = mongoose.model("user", userSchema);
module.exports = User;