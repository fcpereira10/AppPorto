'use strict';
const router = require('express').Router();
const categoryController = require('../controllers/category');

router.get('/', categoryController.getAllCategories);
module.exports = router;