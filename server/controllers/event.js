'use strict'
const Event = require('../models/event')
const Category = require('../models/category')
const Booking = require('../models/booking')
const User = require('../models/user')
const nodemailer = require('nodemailer')
async function getAllEvents (req, res) {
  Event.find().sort({date: 1})
    .then(events => res.json({ events }))
    .catch(error => res.status(400).json({ error }))
}
async function getEvent (req, res) {
  let event
  Event.findById(req.params.id)
    .then(async response => {
      const { categoryId } = response
      await Category.findById({ _id: categoryId }).then(category => {
        event = response.toObject()
        event.categoryName = category.description
        res.json({ event})
      })
      
          
    })
    .catch(error => res.status(400).json({ error }))
}

async function searchEvents (req, res) {
  let { query } = req.params
  var nameRegex = new RegExp(query, 'i')
  Event.find({ title: { $regex: nameRegex } })
    .then(events => {
      res.json({ events })
    })
    .catch(error => res.status(400).json({ error }))
}
async function filterEventsByCategory (req, res) {
  let { categories } = req.query
  Event.find({ categoryId: { $in: categories } })
    .then(async events => {
      res.json({ events })
    })
    .catch(error => res.status(400).json({ error }))
}

async function addEvent (req, res) {

  let stringDate = req.body.date.split('/')
  let date = new Date(stringDate[2], stringDate[1], stringDate[0])
  let hourSplit = req.body.hour.split(':')
  date.setHours(hourSplit[0], hourSplit[1])

  const newEvent = new Event({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    date: date,
    address: req.body.address,
    categoryId: req.body.categoryId
  })
  newEvent
    .save()
    .then(event => {
      res.status(200).json({ event: event, message: 'Event Added' })
    })

    .catch(error => {
      console.log('error ' + error)
      res.status(400).json({ error })
    })
}

async function editEvent (req, res) {
  console.log("edit event "+JSON.stringify(req.body))
  let stringDate = req.body.date
  let dt = new Date(stringDate)
  let hours = req.body.hour.split(':')
  dt.setHours(hours[0], hours[1])

  const query = { _id: req.params.id }
  const update = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    date: dt,
    address: req.body.address,
    categoryId: req.body.categoryId
  }
  await Event.findByIdAndUpdate(query, update, {
    returnOriginal: false,
    useFindAndModify: false,
    upsert: true
  })
    .then(event => {
      return res.status(200).json({ event: event, message: 'Event Edited' })
    })
    .catch(error =>
      res.status(400).json({ error, message: 'An Error Occurred' })
    )
}

async function deleteEvent (req, res) {
  console.log('delete event ' + req.query.eventId)
  const query = { _id: req.query.eventId }
  Event.deleteOne(query, error => {
    if (error) {
      res.status(404).json({ error })
    } else {
      res.status(200).json()
    }
  })
}
async function checkout (req, res) {
  const { payload } = req

  const booking = new Booking({
    pricePaid: req.body.total,
    bookingDate: req.body.date,
    userId: payload._id,
    eventId: req.body.eventId,
    numberTickets: req.body.numberTickets
  })
  booking.save().then(checkout => {
    res.status(200).json({
      checkout: checkout,
      message: 'Checkout done! Check your email'
    })
    User.find({ isAdmin: true })
      .then(admin => {
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: admin[0].email,
            pass: 'PortoLodz'
          }
        })
        var mailOptions = {
          from: admin[0].email,
          to: payload.email,
          subject: 'New booking on Apporto',
          text:
            "Hi! Thank you for using Apporto. You have a new booking on your Profile Booking's section."
        }

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error)
          } else {
            console.log('Email sent: ' + info.response)
          }
        })
      })
      .catch(error => {
        console.log(error)
        res.status(400).json({ error, message: 'Please, try again.' })
      })
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
  checkout
}
