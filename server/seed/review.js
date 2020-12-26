"use strict";

const Review = require("../models/review");

function mockData() {
  return [
    new Review({
        title: "Porto will win for sure.",
        description: "Porto is better than Benfica",
        date: Date.now(),
        userId: "5fe1c91603adee46959f023d",
        eventId: "5fe4b4d4c6dd2a9cb83b5bef"
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
          console.error(`Error seeding review: ${err}`);
        }
      });
    });
    console.log(reviews);
  return {reviews};
}

module.exports = { seedReview };