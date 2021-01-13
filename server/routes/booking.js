'use strict';
const router = require('express').Router();
const bookingController = require('../controllers/booking');

router.get("/", bookingController.getAllBookings);
module.exports = router;