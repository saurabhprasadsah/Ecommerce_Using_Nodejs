const mongoose = require('mongoose');
const winston = require('winston');

mongoose.connect('mongodb://127.0.0.1:27017/hotel_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    winston.error('MongoDB connection error', err);
  });

module.exports = mongoose;
