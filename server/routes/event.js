'use strict';
const router = require('express').Router();
const eventController = require('../controllers/event');

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEvent);
router.get('search/:query', eventController.searchEvents);
module.exports = router;