const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true
},()=>{
    console.log('connected to mongoose');
})

const { User } = require('./models/user'); 
const { Student } = require('./models/student-tutor');
const { Tutor } = require('./models/tutor');
const { Notes } = require('./models/tutor-notes');

//const { auth} = require('./middleware/auth')

app.use(bodyParser.json());
app.use(cookieParser());


const port = process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`SERVER RUNNNING`)
})