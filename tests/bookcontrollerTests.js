require('should');
const sinon = require('sinon');
const bookController = require('../controller/booksController');

describe('Book Controller Tests:', () => {
  describe('Post', () => {
    it('should not allow an empty title on post', () => {
      class Book {
        constructor() {
          this.save = () => {};
        }
      }

      const req = {
        body: {
          author: 'Keoma',
        },
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      };

      const controller = bookController(Book);
      controller.post(req, res);

      res.status
        .calledWith(400)
        .should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('Title is required').should.equal(true);
    });
  });
});
