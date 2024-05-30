const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  roomNo: {
    type: String,
    required: true,
  },
    date: {
    type: Date,
    required: true,
  },
});

const RoomBooked = mongoose.model('users', UserSchema);
module.exports = RoomBooked;
