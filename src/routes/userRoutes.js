const express = require('express');
const { registerUser, getRoomData } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.get('/get-room-data', getRoomData);

module.exports = router;
