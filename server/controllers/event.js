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
    let categoryName, event;
    

    Event.findById({_id: req.params.id})
    .then(async (response) => {
      const {categoryId}= response;
      await Category.findById({_id: categoryId})
      .then(category => {
          event = response.toObject();
          event.categoryName = category.description
      }
      )
       
        res.json(event)
      })
    .catch(error => res.status(400).json({ error }))
  }

  async function searchEvents(req, res){

    let events = [];
    Event.find({"title": {$regex:".*"+req.params.query+".*"}
  }).then(async (results) => {
    results.map(result => {
      Category.findById({_id: result.categoryId})
      .then(category => {
        let event = result.toObject();
        event.categoryName = category.description;
        response.push(event);
      })
      res.json(events);
    })
  })
  .catch(error => res.status(400).json({error}))
  }
  async function filterEventsByCategory(req, res) {
    let events = [];
    Event.find({ _id : { $in :req.params.id}}).then(async (results) => {
    results.map(result => {
      Category.findById({_id: result.categoryId})
      .then(category => {
        let event = result.toObject();
        event.categoryName = category.description;
        response.push(event);
      })
      res.json(events);
    })
  })
  .catch(error => res.status(400).json({error}))

  }


  module.exports = {
      getAllEvents,
      getEvent,
      searchEvents,
      filterEventsByCategory
  }