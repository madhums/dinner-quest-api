
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

/**
 * User Schema
 */

var UserSchema = new Schema({
  facebook: {
    profileImageURL: String,
    displayName: String,
    accessToken: String,
    id: String
  }
});

/**
 * Statics
 */

UserSchema.statics = {

  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  load: function (options, cb) {
    options.select = options.select || 'name username';
    this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  }
}

mongoose.model('User', UserSchema);
