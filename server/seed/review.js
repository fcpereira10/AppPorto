"use strict";

const Review = require("../models/review");

function mockData() {
  return [
    new Review({
        title: "Porto will win for sure.",
        description: "Porto is better than Benfica",
        date: Date.now(),
        userId: "5fe1c91603adee46959f023d",
        eventId: "5fe1ced0cee19d48c804b8fb"
    }),

  ];
}

function seedReview() {
  const reviews = mockData();
  Review.find({})
    .deleteMany()
    .then(() => {
      Review.create(reviews, (err) => {
        if (err) {
          console.error(`Error seeding category: ${err}`);
        }
      });
    });
    console.log(reviews);
  return {reviews};
}

module.exports = { seedReview };