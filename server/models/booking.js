'use strict';

const mongoose = require("mongoose");


const { Schema } = mongoose;

const bookingSchema = new Schema(
  {
    pricePaid: {type: String, required: true},
    bookingDate: {type: Date, required: true},
    userId: {type: String, required: true},
    eventId: {type: String, required: true},
    numberTickets: {type: Number, required: true}
    
  },
);
let Booking;
try {
  Booking = mongoose.model("booking")
} catch (error) {
  Booking = mongoose.model("booking", bookingSchema);
}
 

module.exports = Booking;