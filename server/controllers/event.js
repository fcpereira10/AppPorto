'use strict';
const Event = require('../models/event')
const Category = require('../models/category')
async function getAllEvents(req, res) {

  console.log("get all events");
    Event.find()
    .then(events => res.json({ events }))
    .catch(error => res.status(400).json({ error }))
  }
  async function getEvent(req, res) {
    console.log("get event by id");
    let categoryName;

    Event.findById({_id: req.params.id})
    .then(async (event) => {
      const {categoryId}= event;
      await Category.findById({_id: categoryId})
      .then(category => 
        categoryName = category.description)
        res.json({ event, categoryName})
      })
    .catch(error => res.status(400).json({ error }))
  }


  module.exports = {
      getAllEvents,
      getEvent,
  }