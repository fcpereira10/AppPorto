'use strict';

const mongoose = require("mongoose");


const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: {type: String, required: true},
    date: {type: Date, required: true},
    userId: {type: String},
    eventId: {type: String}
    
  },
);
const Review = mongoose.model("category", reviewSchema);
module.exports = Review;