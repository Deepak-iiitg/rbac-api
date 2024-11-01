const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth');

router.post('/login',authControllers.userLogin);
router.post('/signup',authControllers.userSignup);

module.exports = router;