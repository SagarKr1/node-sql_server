const express = require("express");
const route = express.Router();
const sendNotification = require('../controller/Notification/sendNotification');

route.get('/',(req,res)=>{
    res.send('<h1>Get Notification</h1>');
})
route.post('/send',sendNotification);

module.exports = route;