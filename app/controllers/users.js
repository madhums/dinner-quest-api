
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var User = mongoose.model('User');
var utils = require('../../lib/utils');
var extend = require('util')._extend;

/**
 * Load
 */

exports.load = function (req, res, next, id) {
  var options = {
    criteria: {}
  };

  if (req.headers['x-auth-token']) {
    options.criteria['facebook.id'] = req.headers['x-auth-token']
  } else {
    options.criteria = { _id: id };
  }

  User.load(options, function (err, user) {
    if (err) return next(err);
    if (!user) return next(new Error('Failed to load User ' + id));
    req.profile = user;
    next();
  });
};

/**
 * Create user
 */

exports.create = function (req, res) {
  var user = new User();
  user.facebook = req.body;

  User.load({ criteria: { 'facebook.id' : req.body.id } }, function (err, _user) {
    if (err) return res.status(400).json({ error: err });

    if (!_user) _user = new User({ facebook: req.body });
    else  _user = extend(_user, { facebook: req.body });
    _user.save(function (err) {
      if (err) return res.status(400).json({ error: err });
      res.json(_user);
    });
  });
};

/**
 *  Show profile
 */

exports.show = function (req, res) {
  var user = req.profile;
  res.json(user);
};

