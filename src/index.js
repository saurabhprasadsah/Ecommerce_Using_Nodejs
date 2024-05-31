const app = require('./app');

// Database connection
require('./config/db');

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
