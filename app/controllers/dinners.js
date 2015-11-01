
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
var Dinner = mongoose.model('Dinner')
var utils = require('../../lib/utils')
var extend = require('util')._extend

/**
 * Load
 */

exports.load = function (req, res, next, id){
  var User = mongoose.model('User');

  Dinner.load(id, function (err, dinner) {
    if (err) return next(err);
    if (!dinner) return next(new Error('not found'));
    req.dinner = dinner;
    next();
  });
};

/**
 * List
 */

exports.index = function (req, res){
  var page = (req.params.page > 0 ? req.params.page : 1) - 1;
  var perPage = 30;
  var options = {
    perPage: perPage,
    page: page,
    lean: true
  };

  Dinner.list(options, function (err, dinners) {
    if (err) return res.status(400).send();
    dinners = dinners.map(function (dinner) {
      dinner.distance = Math.floor(Math.random() * 6) + 1;
      return dinner;
    });

    res.json(dinners);
  });
};

/**
 * Create a dinner
 */

exports.create = function (req, res) {
  var dinner = new Dinner(req.body);
  if (!dinner.location) dinner.location = {};
  dinner.location.type = req.body.location;
  dinner.user = req.user;
  dinner.save(function (err) {
    if (err) return res.status(400).send();
    res.json(dinner);
  });
};

/**
 * Update article
 */

exports.update = function (req, res){
  var dinner = req.dinner;
  dinner = extend(dinner, req.body);

  dinner.save(images, function (err) {
    if (err) return res.status(400).send();
    res.json(dinner);
  });
};

/**
 * Show
 */

exports.show = function (req, res){
  res.json(req.dinner);
};

/**
 * Delete an article
 */

exports.destroy = function (req, res){
  var dinner = req.dinner;
  dinner.remove(function (err) {
    if (err) return res.status(400).send();
    res.status(204).send();
  });
};
