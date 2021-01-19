'use strict';
const router = require('express').Router();
const eventController = require('../controllers/event');
const auth = require('../middleware/validator/auth');

router.get('/', eventController.getAllEvents);
router.get('/get/:id', eventController.getEvent);
router.get('/search/:query', eventController.searchEvents);
router.get('/filter', eventController.filterEventsByCategory);
router.post('/', eventController.addEvent);
router.put('/edit/:id', eventController.editEvent);
router.delete('/',eventController.deleteEvent);
router.post('/checkout',auth.check.required, eventController.checkout);
module.exports = router;