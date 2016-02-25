var Lab = require('lab');
var Code = require('code');
var Mongo = require('../lib');

var lab = exports.lab = Lab.script();
var before = lab.before;
var beforeEach = lab.beforeEach;
var afterEach = lab.afterEach;
var after = lab.after;
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

var options = {
  uri: 'mongodb://localhost:27017/startup',
  collections: [ 'test' ]
};

var db = {};

before(function (done) {
  Mongo.create(options, function(err, collections) {
    expect(err).to.not.exist();
    db.collections = collections;
    done();
  });
});

after(function (done) {
  db.collections.test.remove({}, function (err) {
    expect(err).to.not.exist();
    done();
  });
});

describe('Mongo Interface Operations', function () {

  beforeEach(function (done) {
    var manyDocs = [
      { name: 'doc1' },
      { name: 'doc2' },
      { name: 'doc3' },
      { name: 'doc4' }
    ];

    db.collections.test.insertMany(manyDocs, function (err, result) {
      expect(err).to.not.exist();
      expect(result.insertedCount).to.equal(4);
      done();
    });
  });

  afterEach(function (done) {
    db.collections.test.remove({ name: {$in: ['doc1', 'doc2', 'doc3', 'doc4']}}, done);
  });

  describe('Insert operations', function () {

    it('should insert document', function (done) {
      db.collections.test.insert({ name: 'a doc'}, function (err, result) {
        expect(err).to.not.exist();
        expect(result.insertedCount).to.equal(1);
        done();
      });
    });
  });

  describe('Update operations', function () {

    it('should find one and update it', function (done) {
      db.collections.test.findOneAndUpdate({ name: 'doc1'}, { name: 'doc1b' }, null, function (err, result) {
        expect(err).to.not.exist();
        expect(result.ok).to.equal(1);
        expect(result.lastErrorObject).to.deep.equal({ updatedExisting: true, n: 1 });
        done();
      });
    });

    it('should update one', function (done) {
      db.collections.test.updateOne({ name: 'doc1'}, { name: 'doc1b' }, null, function (err, res) {
        expect(err).to.not.exist();
        expect(res.result.ok).to.equal(1);
        expect(res.matchedCount).to.equal(1);
        expect(res.modifiedCount).to.equal(1);
        expect(res.upsertedCount).to.equal(0);
        done();
      });
    });

    it('should update many', function (done) {
      db.collections.test.updateMany({ name: {$in: ['doc1', 'doc2']}}, { $set: { name: 'doc1b'} }, null,
        function (err, res) {
          expect(err).to.not.exist();
          expect(res.result.ok).to.equal(1);
          expect(res.matchedCount).to.equal(2);
          expect(res.modifiedCount).to.equal(2);
          expect(res.upsertedCount).to.equal(0);
          done();
      });
    });

  });

  describe('Find operations', function () {

    it('should find inserted documents', function (done) {
      db.collections.test.find({ name: 'a doc' }, function (err, docs) {
        expect(err).to.not.exist();
        expect(docs).to.exist();
        expect(docs).to.have.length(1);
        expect(docs[0]._id).to.exist();
        expect(docs[0].name).to.equal('a doc');
        done();
      });
    });

    it('should find one document', function (done) {
      db.collections.test.findOne({ name: 'doc1' }, function (err, doc) {
        expect(err).to.not.exist();
        expect(doc).to.exist();
        expect(doc._id).to.exist();
        expect(doc.name).to.equal('doc1');
        done();
      });
    });
  });

});
