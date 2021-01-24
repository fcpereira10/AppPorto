'use strict';
const router = require('express').Router();
const eventController = require('../controllers/event');
const auth = require('../middleware/validator/auth');
const multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      
        cb(null, file.originalname+ '.png');
    }
  });
const upload = multer({storage: storage , limits: { fieldSize: 25 * 1024 * 1024 }})

router.get('/', eventController.getAllEvents);
router.get('/get/:id', eventController.getEvent);
router.get('/search/:query', eventController.searchEvents);
router.get('/filter', eventController.filterEventsByCategory);
router.post('/', upload.single("image"), eventController.addEvent);
router.put('/edit/:id', eventController.editEvent);
router.delete('/',eventController.deleteEvent);
router.post('/checkout',auth.check.required, eventController.checkout);
module.exports = router;