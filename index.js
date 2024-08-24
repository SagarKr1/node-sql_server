const express = require("express");
const router = require('./routes/routes');
const notification = require('./routes/notificationRoute');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

console.log(process.env.USER);
app.get('/',(req,res)=>{
    res.send("<h1>Hello ,how are you</h1>")
})
app.use('/',router);
app.use('/notification',notification);


app.listen(8000,()=>console.log("Server Started at http://localhost:8000"));