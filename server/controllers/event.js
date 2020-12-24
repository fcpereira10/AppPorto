'use strict';
const Event = require('../models/event')
async function getAllEvents(req, res) {
    Event.find()
    .then(events => res.json({ events }))
    .catch(error => res.status(400).json({ error }))
  }
  async function getEvent(req, res) {

    Event.findById({_id: req.params.id})
    .then(event => res.json({ event }))
    .catch(error => res.status(400).json({ error }))
  }
  module.exports = {
      getAllEvents,
      getEvent
  }