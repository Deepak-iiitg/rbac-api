const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/users');
const tokenVerify = require('../middleware/tokenVerify');

router.delete('/:_id',tokenVerify,userControllers.deleteUser);
module.exports = router;