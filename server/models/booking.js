'use strict';

const mongoose = require("mongoose");


const { Schema } = mongoose;

const bookingSchema = new Schema(
  {
    pricePaid: {type: String, required: true},
    date: {type: Date, required: true},
    userId: {type: String, required: true},
    eventId: {type: String, required: true},
    numberTickets: {type: Number, required: true}
    
  },
);
const Booking = mongoose.model("booking", bookingSchema);
module.exports = Booking;