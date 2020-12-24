"use strict";

const Category = require("../models/category");

function mockData() {
  return [
    new Category({
        description: "Sports"
    }),
    new Category({
      description: "Music"
    }),
    new Category({
        description: "Cultural"
      }),
      new Category({
        description: "Food"
      }),
      new Category({
        description: "Adventure"
      }),
      new Category({
        description: "Tour"
      }),

  ];
}

function seedCategory() {
  const categories = mockData();
  Category.find({})
    .deleteMany()
    .then(() => {
      Category.create(categories, (err) => {
        if (err) {
          console.error(`Error seeding category: ${err}`);
        }
      });
    });
    console.log(categories);
    
  return {categories};
}

module.exports = { seedCategory };