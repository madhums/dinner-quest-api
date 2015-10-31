
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var config = require('config');
var Schema = mongoose.Schema;

/**
 * Dinner Schema
 */

var DinnerSchema = new Schema({
  title: {type : String, default : '', trim : true},
  body: {type : String, default : '', trim : true},
  image: {type : String, default : '', trim : true},
  location: {type : String, default : '', trim : true},
  readyAt: {type : Date, default : Date.now},

  user: {type : Schema.ObjectId, ref : 'User'},
  createdAt  : {type : Date, default : Date.now}
});


/**
 * Statics
 */

DinnerSchema.statics = {

  /**
   * Find article by id
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */

  load: function (id, cb) {
    this.findOne({ _id : id })
      .populate('user', 'name email username')
      .exec(cb);
  },

  /**
   * List articles
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      .populate('user', 'name username')
      .sort({ 'createdAt': -1 }) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb);
  }
}

mongoose.model('Dinner', DinnerSchema);
