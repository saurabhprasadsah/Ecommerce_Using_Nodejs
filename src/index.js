const app = require('./app');
const winston = require('winston');

// Logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});


// Database connection
require('./config/db');

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
