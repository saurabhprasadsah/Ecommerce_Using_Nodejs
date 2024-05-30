const express = require('express');
const { registerUser, getRoomData } = require('../controllers/userController');
const router = express.Router();
// const axios = require('axios');


router.post('/register', registerUser);
router.get('/getroomdata', getRoomData);





// router.get('/getRoomData', (req, res) => {
//     axios.get('/getRoomData', {
//       params: {
//         date: '2024-05-30'
//       }
//     })
//     .then(response => {
//       console.log('Response data:', response.data);
//       res.send(response.data);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       res.status(500).send('An error occurred while fetching room data.');
//     });
//   });
  
  
  

module.exports = router;
