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

//app.use('/admin',adminRoute)
app.use('/student',studentRoute)
app.use('/tutor',tutorRoute)


app.get('/api/admin/login',(req,res)=>{
    console.log(req.body);
    Admin.findOne({'email':req.body.email},(err,admin)=>{
        if(!admin) return res.json({isAuth:false,message:"Authenetication failed"})
        if(admin.password!==req.body.password)
            return res.status(200).json({isAuth:false,message:"Incorrect Id or Password"})
        return res.status(200).json({isAuth:true,message:"Logged In Succesfully",admin})
    })
})


const port = process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`SERVER RUNNNING`+port)
})