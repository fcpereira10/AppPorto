'use strict';

const mongoose = require("mongoose");


const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    description: { type: String, required: true, unique: true },
    
  },
);
const Category = mongoose.model("category", categorySchema);
module.exports = Category;