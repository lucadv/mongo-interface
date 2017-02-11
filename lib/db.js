const MongoClient = require('mongodb').MongoClient;

const Db = function (uri, dbConfig) {
  this.uri = uri;
  this.dbConfig = dbConfig;
};

Db.prototype.connect = function (callback) {
  MongoClient.connect(this.uri, this.dbConfig, callback);
};

module.exports = exports = Db;
