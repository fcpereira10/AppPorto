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
    console.log("get event by id" + JSON.stringify(req.params));
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
    let {query}= req.params;
    var nameRegex = new RegExp(query, "i");
    Event.find({title: {$regex: nameRegex}})
    .then(events => {
      console.log(events);
      res.json({ events }
        )})
    .catch(error => res.status(400).json({ error }))
  }
  async function filterEventsByCategory(req, res) {
  
    let { categories } = req.query;
    Event.find({categoryId : { $in : categories }}).then(async (events) => {
      res.json({events});
  })
  .catch(error => res.status(400).json({error}))

  }

  async function addEvent(req, res){
    const newEvent = new Event({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        date: req.body.date,
        photo: req.body.photo,
        address: req.body.address,
        categoryId: req.body.categoryId
    })
    newEvent.save()
    .then(event => res.json({event}))
    .catch(error => res.status(400).json({error}))
  }

  async function editEvent(req, res){
      const query = {_id : req.params.id }
      const update = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        date: req.body.date,
        photo: req.body.photo,
        address: req.body.address,
        categoryId: req.body.categoryId
      }
      await Event.findByIdAndUpdate(query, update,{
        returnOriginal: false,
        useFindAndModify: false,
        upsert: true
      }).then(event => {
        return res.status(200).json({ event: event })
      })
      .catch(error => res.status(400).json({error}))

  }

  async function deleteEvent(req, res){
    const query = {_id: req.params.id}
    Event.deleteOne(query, error => {
      if (error) {
        res.status(404).json({ error });
      } else {
        res.status(200).json();
      }
    })
  }

  module.exports = {
      getAllEvents,
      getEvent,
      searchEvents,
      filterEventsByCategory,
      addEvent,
      editEvent,
      deleteEvent,
  }