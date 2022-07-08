const express = require('express');
const mongoose = require('mongoose');

const app = express();

if (process.env.ENV === 'Test') {
  // eslint-disable-next-line no-unused-vars
  const db = mongoose.connect('mongodb://localhost/bookAPI_Test');
} else {
  // eslint-disable-next-line no-unused-vars
  const db = mongoose.connect('mongodb://localhost/bookAPI');
}

const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
