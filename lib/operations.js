var Operations = function (db, collectionName) {
  this.db = db;
  this.collectionName = collectionName;
};

Operations.prototype.find = function (query, callback) {
  this.db.collection(this.collectionName).find(query).toArray(function (err, docs) {
    callback(err, docs);
  });
};

Operations.prototype.findOne = function (query, callback) {
  this.db.collection(this.collectionName).findOne(query, callback);
};

Operations.prototype.findOneAndUpdate = function (filter, update, options, callback) {
  this.db.collection(this.collectionName).findOneAndUpdate(filter, update, options, callback);
};

Operations.prototype.insert = function (document, callback) {
  this.db.collection(this.collectionName).insert(document, callback);
};

Operations.prototype.insertMany = function (docs, callback) {
  this.db.collection(this.collectionName).insertMany(docs, callback);
};

Operations.prototype.remove = function (query, callback) {
  this.db.collection(this.collectionName).remove(query, callback);
};

module.exports = exports = Operations;
