const express = require('express');
const bodyPasrer = require('body-parser');
const leaderRouter = express.Router();
const Leaders = require('../models/leaders');

leaderRouter.use(bodyPasrer.json());

leaderRouter.route('/')
.get((req,res,next) => {
    Leaders.find({})
        .then((leaders)=> {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leaders)
        }, (err) => next(err))
        .catch((err) => next(err));
})
.post((req, res, next) => {
   Leaders.create(req.body)
    .then((leader)=>{
        console.log('leader created: ', leader);
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader)
    }, (err) => next(err))
    .catch((err) => next(err));

})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete((req, res, next) => {
    Leaders.deleteMany({})
        .then((response) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
        }, (err) => next(err))
        .catch((err) => next(err));
});

leaderRouter.route('/:leaderId')
.get((req,res,next) => {
    Leaders.findById(req.params.leaderId)
        .then((leader) =>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader)
        }, (err) => next(err))
        .catch((err) => next(err));
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /leaders/'+ req.params.leaderId);
})
.put((req, res, next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, {
        new: true
    })
    .then((leader) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }, (err) => next(err))
    .catch((err) => next(err));
});

  
module.exports = leaderRouter;
