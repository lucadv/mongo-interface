const Db = require('./db');
const Operations = require('./operations');
const Async = require('async');
const Hoek = require('hoek');
const _ = require('lodash');

const create = function (options, callback) {
  Hoek.assert(options.uri, 'Mongo Interface requires an uri for the mongodb connections');
  Hoek.assert(options.collections, 'Mongo Interface requires an array of collection names');

  const collections = {};

  Async.waterfall([
    function (callback) {
      const db = new Db(options.uri);
      db.connect(callback);
    },
    function (db, callback) {
      _.each(options.collections, collectionName => {
        collections[collectionName] = new Operations(db, collectionName);
      });
      callback();
    }
  ], err => {
    callback(err, collections);
  });
};

module.exports = exports = {
  create
};
