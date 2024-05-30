const RoomBooked = require('../models/User');
const winston = require('winston');
const parseDate = require('../utils/date');

exports.registerUser = async (req, resp) => {
    try {
      const { roomNo, date } = req.body;
  
      // Check if the room is already booked for the specified date
      const existingBooking = await RoomBooked.findOne({ roomNo, date: new Date(date).setHours(0, 0, 0, 0) });
      if (existingBooking) {
        console.log('Room is already booked for this date');
        return resp.status(409).send('Room is already booked for this date');
      }
  
      // Proceed with booking if room is not already booked
      const user = new RoomBooked(req.body);
      let result = await user.save();
      result = result.toObject();
      if (result) {
        delete result.password; // Assuming password was included by mistake
        resp.send(req.body);
        console.log(result);
      } else {
        console.log('User already registered');
        resp.status(409).send('User already registered');
      }
    } catch (e) {
      console.error(e);
      winston.error('Error during registration', e);
      resp.status(500).send('Something Went Wrong');
    }
  };
  
  
exports.getRoomData = async (req, resp) => {
  try {
    const details = await RoomBooked.find({});
    resp.send(details);
  } catch (error) {
    console.error(error);
    winston.error('Error fetching room data', error);
    resp.status(500).send('Error fetching room data');
  }
};
