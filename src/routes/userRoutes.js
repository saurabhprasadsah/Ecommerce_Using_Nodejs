const express = require('express');
const { registerUser, getRoomData } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.get('/getroomdata', getRoomData);

module.exports = router;
