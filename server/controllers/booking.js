'use strict';
const Event = require('../models/event')
const Booking = require('../models/booking')
const User = require('../models/user')
async function getAllBookingsByUser(req,res){
    console.log('all bookings by user')
    const { payload } = req
    console.log('payload ' + JSON.stringify(req.payload))
    const { _id, isAdmin } = payload;
    let query = {};
    let returnBookings= [];
   
    if (!isAdmin) {
       
        query = {userId: _id};
    }
    Booking.find(query).sort({bookingDate: -1})
    .then(async (bookings) => {
        console.log("bookings "+bookings);
        for (const booking of bookings){
        let book = booking.toObject();
        await Event.findById(booking.eventId)
        .then(event =>{ 
            book.event = event;
        })
        await User.findById(booking.userId)
        .then(user => {
            book.user = user;
            returnBookings.push(book);
        })
        }
        console.log("before res.json");
        res.json({bookings: returnBookings})
        
    })
    .catch(error => res.status(400).json({ error }))
}
async function getAllBookings(req, res) {
    let returnBookings= [];

    Booking.find().sort({bookingDate: -1})
    .then(async (bookings) => {
        console.log("bookings "+bookings);
        for (const booking of bookings){

        await Event.findById(booking.eventId)
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
    getAllBookingsByUser,
    getAllBookings
}