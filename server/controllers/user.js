'use strict'
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

function login (req, res, next) {
  console.log('login user')
  return passport.authenticate(
    'login-user',
    { session: false },
    (err, passportUser, info) => {
      if (err) {
        return next(err)
      }
      if (passportUser) {
        const reqUser = {
          _id: passportUser._id,
          email: passportUser.email,
          username: passportUser.username,
          isAdmin: passportUser.isAdmin, 
        }

        req.login(reqUser, error => {
          if (error) {
            return res.send({ error })
          }
          return res.json({
            user: passportUser.toAuthJSON()
          })
        })
      } else {
        return res.status(400).json(info)
      }
    }
  )(req, res, next)
}
function add (req, res) {
  console.log('add user')
  const saltRounds = 10

  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    User.find({ username: req.body.username }).then(user => {
      if (user.length !== 0) res.status(406).json({ error: 'Invalid username' })
      else {
        const newUser = new User({
          email: req.body.email,
          username: req.body.username,
          password: hash,
          isAdmin: false, 
        })
        newUser
          .save()
          .then(item => res.json({ item }))
          .catch(error => res.status(400).json({ error }))
      }
    })
  })
}
async function edit (req, res) {
  console.log('edit user')
  const saltRounds = 10
  const { payload } = req
  console.log('payload ' + JSON.stringify(req.payload))
  const { _id } = payload

  bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    const query = { _id: _id }
    const update = {
      email: req.body.email,
      username: req.body.username,
      password: hash
    }
    await User.findByIdAndUpdate(query, update, {
      returnOriginal: false,
      useFindAndModify: false,
      upsert: true
    }).then(user => {
      return res.status(200).json({ user: user })
    })
  })
}

function hashPassword (password) {
  return bcrypt.hashSync(password, 10)
}
async function getCurrent (req, res) {
  let { payload } = req
  const { _id } = payload

  await User.findById(_id).then(user => {
    payload = user
  })
  return res.status(200).json({ payload })
}
function logout (req, res) {
  req.logout()
  return res.status(200).json('Logged out')
}

module.exports = {
  login,
  add,
  edit,
  hashPassword,
  getCurrent,
  logout
}
