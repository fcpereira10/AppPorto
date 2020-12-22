'use strict';

const mongoose = require("mongoose");


const { Schema } = mongoose;

const ticketSchema = new Schema(
  {
    date: {type: Date, required: true},
    userId: {type: String},
    eventId: {type: String}
    
  },
);
const Ticket = mongoose.model("category", ticketSchema);
module.exports = Ticket;