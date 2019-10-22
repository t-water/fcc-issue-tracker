/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
var Issues = require('../issues');
var mongoose = require('mongoose');

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true});

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res, next){
      var project = req.params.project;
      
    })
    
    .post(function (req, res, next){
      Issues.create(req.body)
      .then(issue => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(issue);
      })
      .catch(err => next(err))
    })
    
    .put(function (req, res, next){
      Object.keys(req.body).forEach(item => {
        if(req.body[item] === ""){
          delete req.body[item]
        }
      })
      let id = req.body._id
      delete req.body._id
      if(Object.keys(req.body).length == 0){
        res.send()
      }
      // Issues.findById(req.body._id)
      // .then(issue => {
      //   if(issue != null){
      //     Issues.findByIdAndUpdate(req.body._id, {
      //       $set: req.body
      //     }, {new: true})
      //     .then(issue => {
      //       res.statusCode = 200;
      //       res.setHeader('Content-Type', 'application/json');
      //       res.json("Successfully updated.")
      //     })
      //     .catch(err => next(err))
      //   }else{
      //     res.statusCode = 404;
      //     let err = new Error('Could not update: ' + req.body._id)
      //     res.json(err);
      //   }
      // })
      // .catch(err => {
      //   res.send('Could not update: ' + req.body._id);
      // })
    })
    
    .delete(function (req, res, next){
      var project = req.params.project;
      
    });
    
};
