'use strict';

const mongoose = require("mongoose");


const { Schema } = mongoose;

const eventSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: {type: String, required: true},
    price: {type: String},
    date: {type: Date, required: true},
    photo: {type: String, default:'' },
    address: {type: String, required: true},
    categoryId: {type: String}, 
    
  },
);
const Event = mongoose.model("category", eventSchema);
module.exports = Event;