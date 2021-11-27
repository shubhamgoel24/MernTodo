const express = require('express');
const router = express.Router();
const homecontrol = require('../controllers/homecontrol');

console.log("Router Loaded");
router.get('/',homecontrol.home);
router.post('/create-task',homecontrol.create_task);
router.get('/delete-task',homecontrol.delete_task);


module.exports = router;