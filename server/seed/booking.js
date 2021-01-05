"use strict";

const Booking = require("../models/Booking");

function mockData() {
  return [
    new Booking({
        pricePaid: "30€",
        date: Date.now(),
        userId: "5fe1c91603adee46959f023d",
        eventId: "5fe4b4d4c6dd2a9cb83b5bee",
        numberTickets: 1, 
    }),
    new Booking({
        pricePaid: "50€",
        date: Date.now(),
        userId: "5fe1c91603adee46959f023d",
        eventId: "5fe4b4d4c6dd2a9cb83b5bef",
        numberTickets: 2, 
    }),

  ];
}

function seedBookings() {
  const bookings = mockData();
  Booking.find({})
    .deleteMany()
    .then(() => {
      Booking.create(bookings, (err) => {
        if (err) {
          console.error(`Error seeding booking: ${err}`);
        }
      });
    });
    console.log(bookings);
  return {bookings};
}

module.exports = { seedBookings };