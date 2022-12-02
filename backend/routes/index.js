const express = require('express');
const router = express.Router();

const user = require('./user');
const tasks = require('./tasks');
const equipment = require('./equipment');
const reports = require('./reports');

router.use('/user', user);
router.use('/tasks', tasks);
router.use('/equipment', equipment);
router.use('/reports', reports);

module.exports = router;