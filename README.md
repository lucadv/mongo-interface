## Overview

This is meant to be an interface to mongodb native drivers for nodejs. Connects to mongo and, for each collection that you specify, offer an interface to basic mongo operations. 

## Install

npm install mongo-interface

## Usage

```
var Mongo = require('mongo-interface');

var options = {
  uri: 'mongodb://localhost:27017/test',
  collections: [ 'test' ]
};

Mongo.create(options, function (err, collections) {
  collections.test.find({}, function (err, docs) {
    // in docs all documents of collection test
  });
});
```

## Supported operations

Supported operations are:

  * find (query, callback) - callback with an array of docs
  * findOne (query, callback)
  * findOneAndUpdate (filter, update, options, callback)
  * updateOne (filter, update, options, callback)
  * updateMany (filter, update, options, callback)
  * insert (document, callback)
  * insertMany (docs, callback)
  * remove (query, callback)
