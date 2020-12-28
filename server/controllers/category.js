'use strict';
const Category = require('../models/category')

async function getAllCategories(req, res) {

    console.log("get all categories");
      Category.find()
      .then(categories => res.json({ categories }))
      .catch(error => res.status(400).json({ error }))
    }
module.exports = {
    getAllCategories
}