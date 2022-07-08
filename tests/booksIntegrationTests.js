require('should');
const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV = 'Test';

const app = require('../app');

const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book Crud Test', () => {
  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });

  after((done) => {
    mongoose.connection.close();
    app.server.close(done());
  });

  it('should allow a book to be posted and return read and _id', (done) => {
    const bookPost = { title: 'My Book', author: 'Keoma', genre: 'Fiction' };

    agent
      .post('/api/books')
      .send(bookPost)
      .expect(201)
      .then((results) => {
        results.body.read.should.equal(false);
        results.body.should.have.property('_id');
        done();
      });
  });
});
