'use strict';

const router = require('express').Router();
const userController = require('../controllers/user');
const bookingController = require('../controllers/booking');

router.get('/:id/bookings', bookingController.getAllBookingsByUser);
module.exports = router;
