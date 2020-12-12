const express = require('express')
const router = express.Router();
const { pickController } = require('../controller');

router.get('/pick',pickController.pick)
module.exports = router;
