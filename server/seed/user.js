"use strict";

const User = require("../models/user");

function mockData() {
  return [
    new User({
      username: "janedoe",
      email: "janeDoe@gmail.com",
      password: "12345678",
    }),
    new User({
      username: "johndoe",
      email: "johnDoe@gmail.com",
      password: "12345678",
    }),
  ];
}

function seedUser() {
  const users = mockData();
  User.find({})
    .deleteMany()
    .then(() => {
      User.create(users, (err) => {
        if (err) {
          console.error(`Error seeding user: ${err}`);
        }
      });
    });
    console.log(users);
  return {users};
}

module.exports = { seedUser };