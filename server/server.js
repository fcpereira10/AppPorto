const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const mongoose = require("mongoose");
const passport = require("passport");
const userRouter = require("./routes/user");
const eventRoute = require("./routes/event");
const categoryRoute = require("./routes/category");
const bookingRoute = require("./routes/booking");
//const seed = require("./seed/booking");
//const seedReview = require("./seed/review");

const init = require('./config/passport/init');

mongoose.connect("mongodb+srv://admin:admin@cluster0.dssqf.mongodb.net/development?retryWrites=true&w=majority")

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => {
    console.log('connected to database')
    //seed.seedBookings();
    //seedReview.seedReview();
    
})

app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 2000 }))

app.use(passport.initialize());
app.use(passport.session());
init(passport);
app.use("/uploads",express.static(__dirname + '/uploads'));
app.use("/event", eventRoute);
app.use("/category", categoryRoute);
app.use("/user", userRouter);
app.use("/bookings", bookingRoute);
app.listen(4000, () => console.log("server started"));

