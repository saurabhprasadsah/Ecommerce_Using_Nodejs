const RoomBooked = require('../models/User');
const winston = require('winston');
require('winston-daily-rotate-file');

// Define Winston transports
const transport = new winston.transports.DailyRotateFile({
    filename: 'logs/error.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        transport
    ]
});

exports.registerUser = async (req, resp) => {
    try {
        const { roomNo, date, email } = req.body;

        // Check if the user with the email already exists
        const existingUser = await RoomBooked.findOne({ email });
        if (existingUser) {
            console.log('Email is already registered');
            return resp.status(409).send('Email is already registered try another email id');
        }

        // Parse and validate the date
        const bookingDate = new Date(date);
        if (isNaN(bookingDate.getTime())) {
            console.log('Invalid date format');
            return resp.status(400).send('Invalid date format');
        }
        bookingDate.setHours(0, 0, 0, 0);

        // Check if the room is already booked for the specified date
        const existingBooking = await RoomBooked.findOne({ roomNo, date: bookingDate });
        if (existingBooking) {
            console.log('Room is already booked for this date');
            return resp.status(409).send('Room is already booked for this date');
        }

        // Proceed with booking if room is not already booked
        const user = new RoomBooked({ ...req.body, date: bookingDate });
        let result = await user.save();
        result = result.toObject();
        if (result) {
            delete result.password; // Assuming password was included by mistake
            resp.send(result);
            console.log(result);
        } else {
            console.log('User already registered');
            resp.status(409).send('User already registered');
        }
    } catch (error) {
        console.error(error);
        logger.error('Error during registration', error); // Log the error using Winston
        resp.status(500).send('Something Went Wrong');
    }
};

exports.getRoomData = async (req, resp) => {
    try {
        const details = await RoomBooked.find({});
        resp.send(details);
    } catch (error) {
        console.error(error);
        logger.error('Error fetching room data', error);
        resp.status(500).send('Error fetching room data');
    }
};
