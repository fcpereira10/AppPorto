'use strict';
const router = require('express').Router();
const eventController = require('../controllers/event');

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEvent);

module.exports = router;