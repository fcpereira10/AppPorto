'use strict'
const Event = require('../models/event')
const Category = require('../models/category')
const Booking = require('../models/booking')
const User = require('../models/user')
const fs = require('fs')
const nodemailer = require('nodemailer');
async function getAllEvents (req, res) {
  Event.find()
    .then(events => res.json({ events }))
    .catch(error => res.status(400).json({ error }))
}
async function getEvent (req, res) {
  let categoryName, event
  Event.findById(req.params.id)
    .then(async response => {
      const { categoryId } = response
      await Category.findById({ _id: categoryId }).then(category => {
        event = response.toObject()
        event.categoryName = category.description
      })

      res.json(event)
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
  let stringDate = req.body.date
  let date = new Date(stringDate)
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
      var base64Data = req.body.photo.replace(/^data:image\/png;base64,/, '')
      fs.writeFile(
        './uploads/' + event._id + '.png',
        base64Data,
        'base64',
        err => {
          if (err) throw err
        }
      )
      res.status(200).json({ event: event, message: 'Event Added' })
    })

    .catch(error => {
      console.log('error ' + error)
      res.status(400).json({ error })
    })
}

async function editEvent (req, res) {
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
  booking
    .save()
    .then(checkout => {
      res
        .status(200)
        .json({
          checkout: checkout,
          message: 'Checkout done! Check your email'
        })
      let adminEmail =  User.find({isAdmin: true})
      console.log("admin "+adminEmail)
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: adminEmail.email,
          pass: 'PortoLodz'
        }
      })
      console.log("admin email "+adminEmail.email)
      var mailOptions = {
        from: adminEmail.email,
        to: 'ritanorinho7@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
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
