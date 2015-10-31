
/*!
 * Module dependencies.
 */

// Note: We can require users, dinners and other cotrollers because we have
// set the NODE_PATH to be ./app/controllers (package.json # scripts # start)

var users = require('users');
var dinners = require('dinners');
// var comments = require('comments');
// var tags = require('tags');
// var auth = require('./middlewares/authorization');

/**
 * Route middlewares
 */

/**
 * Expose routes
 */

module.exports = function (app, passport) {

  // users routes
  app.param('userId', users.load);
  app.param('id', users.load);
  // app.get('/users', users.index);
  app.post('/users', users.create);
  app.get('/users/:id', users.show);
  // app.put('/users/:id', users.update);
  // app.delete('/users/:id', users.destroy);


  // dinner routes
  app.param('id', dinners.load);
  app.get('/dinners', dinners.index);
  app.post('/dinners', dinners.create);
  app.get('/dinners/:id', dinners.show);
  app.put('/dinners/:id', dinners.update);
  app.delete('/dinners/:id', dinners.destroy);

  /**
   * Error handling
   */

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).json({ error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).json({
      url: req.originalUrl,
      error: 'Not found'
    });
  });
}
