
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
  location: {
    type: [Number],
    index: '2d'
  },
  attendees: {type : Number, default : 2},
  fee: {type : Number, default : 0},
  recepie: {},
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
      .populate('user', 'facebook')
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

    var list = this.find(criteria)
      .populate('user', 'name username')
      .sort({ 'createdAt': -1 }) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)

    if (options.lean) list.lean().exec(cb)
    else list.exec(cb)
  }
}

mongoose.model('Dinner', DinnerSchema);
