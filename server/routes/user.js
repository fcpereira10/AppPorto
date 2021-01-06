'use strict';

const router = require('express').Router();
const userController = require('../controllers/user');
const bookingController = require('../controllers/booking');
const validators = require('../middleware/validator/user');
const auth = require('../middleware/validator/auth');


router.get('/:id/bookings', bookingController.getAllBookingsByUser);
router.post('/login', userController.login);
router.post('/', validators.userRegister, userController.add);
router.get('/current', auth.check.required, userController.getCurrent);
module.exports = router;
