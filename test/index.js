const Lab = require('lab');
const Code = require('code');
const Mongo = require('../lib');

const lab = exports.lab = Lab.script();
const before = lab.before;
const beforeEach = lab.beforeEach;
const afterEach = lab.afterEach;
const after = lab.after;
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

const options = {
  uri: 'mongodb://localhost:27017/startup',
  collections: ['test']
};

const db = {};

before(done => {
  Mongo.create(options, (err, collections) => {
    expect(err).to.not.exist();
    db.collections = collections;
    done();
  });
});

after(done => {
  db.collections.test.remove({}, err => {
    expect(err).to.not.exist();
    done();
  });
});

describe('Mongo Interface Operations', () => {

  beforeEach(done => {
    const manyDocs = [
      { name: 'doc1' },
      { name: 'doc2' },
      { name: 'doc3' },
      { name: 'doc4' }
    ];

    db.collections.test.insertMany(manyDocs, (err, result) => {
      expect(err).to.not.exist();
      expect(result.insertedCount).to.equal(4);
      done();
    });
  });

  afterEach(done => {
    db.collections.test.remove({ name: { $in: ['doc1', 'doc2', 'doc3', 'doc4'] } }, done);
  });

  describe('Insert operations', () => {

    it('should insert document', done => {
      db.collections.test.insert({ name: 'a doc' }, (err, result) => {
        expect(err).to.not.exist();
        expect(result.insertedCount).to.equal(1);
        done();
      });
    });
  });

  describe('Update operations', () => {

    it('should find one and update it', done => {
      db.collections.test.findOneAndUpdate({ name: 'doc1' }, { name: 'doc1b' }, null, (err, result) => {
        expect(err).to.not.exist();
        expect(result.ok).to.equal(1);
        expect(result.lastErrorObject).to.equal({ updatedExisting: true, n: 1 });
        done();
      });
    });

    it('should update one', done => {
      db.collections.test.updateOne({ name: 'doc1' }, { name: 'doc1b' }, null, (err, res) => {
        expect(err).to.not.exist();
        expect(res.result.ok).to.equal(1);
        expect(res.matchedCount).to.equal(1);
        expect(res.modifiedCount).to.equal(1);
        expect(res.upsertedCount).to.equal(0);
        done();
      });
    });

    it('should update many', done => {
      db.collections.test.updateMany({ name: { $in: ['doc1', 'doc2'] } }, { $set: { name: 'doc1b' } }, null,
        (err, res) => {
          expect(err).to.not.exist();
          expect(res.result.ok).to.equal(1);
          expect(res.matchedCount).to.equal(2);
          expect(res.modifiedCount).to.equal(2);
          expect(res.upsertedCount).to.equal(0);
          done();
        });
    });

  });

  describe('Find operations', () => {

    it('should find inserted documents', done => {
      db.collections.test.find({ name: 'a doc' }, (err, docs) => {
        expect(err).to.not.exist();
        expect(docs).to.exist();
        expect(docs).to.have.length(1);
        expect(docs[0]._id).to.exist();
        expect(docs[0].name).to.equal('a doc');
        done();
      });
    });

    it('should find one document', done => {
      db.collections.test.findOne({ name: 'doc1' }, (err, doc) => {
        expect(err).to.not.exist();
        expect(doc).to.exist();
        expect(doc._id).to.exist();
        expect(doc.name).to.equal('doc1');
        done();
      });
    });
  });

});
