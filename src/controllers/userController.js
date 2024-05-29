const RoomBooked = require('../models/User');
const winston = require('winston');

exports.registerUser = async (req, resp) => {
  try {
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
