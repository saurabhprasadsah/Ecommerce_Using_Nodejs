const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, resp) => {
  resp.send('App is Working');
});


app.use('/oyo', userRoutes);

module.exports = app;
