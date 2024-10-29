const express = require('express');
const router = express.Router();
const taskControllers = require('../controllers/tasks');

const tokenVerify = require('../middleware/tokenVerify');
router.get('/',tokenVerify,taskControllers.fetchTask);
router.post('/',tokenVerify,taskControllers.createTast);
router.patch('/:_id',tokenVerify,taskControllers.updateTask);

module.exports = router;