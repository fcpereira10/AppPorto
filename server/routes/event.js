'use strict';
const router = require('express').Router();
const eventController = require('../controllers/event');

router.get('/', eventController.getAllEvents);
router.get('/get/:id', eventController.getEvent);
router.get('/search/:query', eventController.searchEvents);
router.get('/filter', eventController.filterEventsByCategory);
router.post('/', eventController.addEvent);
router.put('/edit', eventController.editEvent);
router.delete('/',eventController.deleteEvent);
module.exports = router;