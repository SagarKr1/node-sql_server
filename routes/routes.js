const express = require("express");
const route = express.Router();
const Student = require("../controller/student");
const Signup = require('../controller/Signup');
const Login = require('../controller/Login');
const CodeVerification = require('../controller/codeVerification');
const ResendVerificationCode = require('../controller/resendVerificationCode');

route.get('/details',Student);
route.post('/signup',Signup);
route.post('/login',Login);
route.post('/verification',CodeVerification);
route.put('/resend',ResendVerificationCode);



module.exports = route;