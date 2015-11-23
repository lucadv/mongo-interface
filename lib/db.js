var MongoClient = require('mongodb').MongoClient;
var Hoek = require('hoek');

var Db = function (uri, dbConfig) {
  this.uri = uri;
  this.dbConfig = dbConfig;
};

Db.prototype.connect = function (callback) {
  MongoClient.connect(this.uri, this.dbConfig, callback);
};

module.exports = exports = Db;
