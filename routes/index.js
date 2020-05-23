var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Dishes = require('../models/dishes');
const Promotions = require('../models/promotions');
const leaders = require('../models/leaders');
const constants = require('../constants');

const url = constants.MONGO_URL;


mongoose.connect(url, { useNewUrlParser: true,useUnifiedTopology: true ,'useCreateIndex': true})
.then((db) => {
  console.log("connected successfully");
})
.catch((err) => {
  console.log(err);
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
