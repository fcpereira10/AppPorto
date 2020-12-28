'use strict';
const router = require('express').Router();
const eventController = require('../controllers/event');

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEvent);
router.get('/search/:query', eventController.searchEvents);
router.post('/add', eventController.addEvent);
router.put('/edit', eventController.editEvent);
router.delete('/delete',eventController.deleteEvent);
module.exports = router;