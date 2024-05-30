// utils/date.js
const parseDate = (dateString) => {
    console.log('Parsing date:', dateString); // Log the input
  
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    date.setHours(0, 0, 0, 0); // Normalize the date to start of the day
  
    console.log('Parsed date:', date); // Log the parsed date
    return date;
  };
  
  module.exports = parseDate;
  