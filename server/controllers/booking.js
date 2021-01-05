'use strict';
const Event = require('../models/event')
const Booking = require('../models/booking')

async function getAllBookingsByUser(req,res){
    let returnBookings = [];
    Booking.find({userId: req.params.id})
    .then(bookings => {
        for (const booking of bookings){

        Event.findById(booking.eventId)
        .then(event =>{
            let book = booking.toObject();
            book.event = event;
            returnBookings.push(book);
        })
        }
        res.json({bookings: returnBookings})
    })
    .catch(error => res.status(400).json({ error }))
}

module.exports = {
    getAllBookingsByUser
}