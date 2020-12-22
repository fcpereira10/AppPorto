const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
//const seed = require("./seed/review");



mongoose.connect("mongodb+srv://admin:admin@cluster0.dssqf.mongodb.net/development?retryWrites=true&w=majority")

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => {
    console.log('connected to database')
    //seed.seedReview();
})

app.use(bodyParser.json({ limit: "2mb" }))
app.use(bodyParser.urlencoded({ limit: "2mb", extended: true, parameterLimit: 2000 }))

