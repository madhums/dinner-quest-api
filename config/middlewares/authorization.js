'use strict';

var mongoose = require('mongoose')
var User = mongoose.model('User');

/*
 *  Generic require login routing middleware
 */

exports.requiresLogin = function (req, res, next) {
  if (req.isAuthenticated()) return next()
  res.status(401).send();
}

exports.authenticate = function (req, res, next) {
  var fbid = req.headers['x-auth-token'];

  if (!fbid) return res.status(401).send();

  User.findOne({ 'facebook.id' : fbid }).exec(function (err, user) {
    if (err) return res.status(400).send();
    else if (!user) return res.status(401).send();
    else {
      req.user = user;
      next();
    }
  });
};
