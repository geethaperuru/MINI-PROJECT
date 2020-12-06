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

const { Admin } = require('./models/admin'); 
const { Notes } = require('./models/notes');
const { Student } = require('./models/student');
const { Tutor } = require('./models/tutor');

//const { Server } = require('mongodb');
//const { auth} = require('./middleware/auth')

app.use(express.json())
app.use(bodyParser.json());
app.use(cookieParser());

const adminRoute = require('./routes/adminRoute').adminRouter
const studentRoute = require('./routes/StudentRoute').studentRouter
const tutorRoute = require('./routes/tutorRoute').tutorRouter

app.use('/admin',adminRoute)
app.use('/student',studentRoute)
app.use('/tutor',tutorRoute)



const port = process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`SERVER RUNNNING`+port)
})