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
var issueSchema = require('../issues');
var mongoose = require('mongoose');

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true});

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res, next){
      var project = req.params.project;
      
    })
    
    .post(function (req, res, next){
      var project = req.params.project;
      let Issues = mongoose.model(project, issueSchema, project)
      Issues.create(req.body)
      .then(issue => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(issue);
      })
      .catch(err => next(err))
    })
    
    .put(function (req, res, next){
      var project = req.params.project;
      Object.keys(req.body).forEach(item => {
        if(req.body[item] === ""){
          delete req.body[item]
        }
      })
      let id = req.body._id
      delete req.body._id
      if(Object.keys(req.body).length == 0){
        res.send("No updated field sent")
      }
      let Issues = mongoose.model(project, issueSchema, project)
      Issues.findById(id)
      .then(issue => {
        if(issue != null){
          Issues.findByIdAndUpdate(id, {
            $set: req.body
          }, {new: true})
          .then(issue => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/text');
            res.send("Successfully updated.");
          })
          .catch(err => res.send('Could not update: ' + id))
        }else{
          res.send('Could not update: ' + id);
        }
      })
      .catch(err => {
        res.send('Could not update: ' + id);
      })
    })    
  
    .delete(function (req, res, next){
      var project = req.params.project;
      if(req.body._id == ""){
        res.send('_id error');
      }
      let Issues = mongoose.model(project, issueSchema, project)
      Issues.findById(req.body._id)
      .then(issue => {
        if(issue != null){
          Issues.findByIdAndRemove(req.body._id)
          .then(issue => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/text');
            res.send("Deleted " + req.body._id);
          })
          .catch(err => {
            res.send('Could not delete ' + req.body._id)
          })
        }else{
          res.send('Could not delete ' + req.body._id)
        }
      })
      .catch(err => {
        res.send('Could not delete ' + req.body._id)
      })
    });
};