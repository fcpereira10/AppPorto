'use strict';
const Event = require('../models/event')
const Category = require('../models/category')
const fs = require('fs')
async function getAllEvents(req, res) {

    Event.find()
    .then(events => res.json({ events }))
    .catch(error => res.status(400).json({ error }))
  }
  async function getEvent(req, res) {
    let categoryName, event;
    Event.findById(req.params.id)
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
    let stringDate = req.body.date;
    let date = new Date(stringDate)
    let hourSplit = req.body.hour.split(':');
     date.setHours(hourSplit[0], hourSplit[1])
   
      const newEvent = new Event({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        date: date,
        address: req.body.address,
        categoryId: req.body.categoryId
    })
    newEvent.save()
    .then(event => {

      var base64Data = req.body.photo.replace(/^data:image\/png;base64,/, "");
      fs.writeFile('./uploads/'+event._id+'.png', base64Data,  'base64', (err) => {
        if (err) throw err
      })
      res.json({event})
    
    })

    .catch(error => {
      console.log("error "+error);
      res.status(400).json({error})
    })
  }

  async function editEvent(req, res){
    
      let stringDate = req.body.date;
      let dt = new Date(stringDate)
      let hours = req.body.hour.split(':');
      dt.setHours(hours[0], hours[1])
      
      const query = {_id : req.params.id }
      const update = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        date: dt,
        address: req.body.address,
        categoryId: req.body.categoryId
      }
      await Event.findByIdAndUpdate(query, update,{
        returnOriginal: false,
        useFindAndModify: false,
        upsert: true
      }).then(event => {
        return res.status(200).json({ event: event, message:"Event Edited" })
      })
      .catch(error => res.status(400).json({error, message:"An Error Occurred"}))

  }

  async function deleteEvent(req, res){
    console.log("delete event " +req.query.eventId)
    const query = {_id: req.query.eventId}
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