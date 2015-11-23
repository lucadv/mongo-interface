var Db = require('./db');
var Operations = require('./operations');
var Async = require('async');
var Hoek = require('hoek');
var _ = require('lodash');

var create = function (options, callback) {
  Hoek.assert(options.uri, 'Mongo Interface requires an uri for the mongodb connections');
  Hoek.assert(options.collections, 'Mongo Interface requires an array of collection names');

  var collections = {};

  Async.waterfall([
    function (callback) {
      var db = new Db(options.uri);
      db.connect(callback);
    },
    function (db, callback) {
      _.each(options.collections, function (collectionName) {
        collections[collectionName] = new Operations(db, collectionName);
      });
      callback();
    }
  ], function (err) {
    callback(err, collections);
  });
};

module.exports = exports = {
  create: create
};
