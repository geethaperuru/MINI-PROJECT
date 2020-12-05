const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
//const requiredLogin = require('../middleware/auth')

router.get('/allTutors',requiredLogin,(req,res)=>{
    User.find({role:'tutor'})
    .then(tutors=>{
        res.json(tutors)
    })
    .catch(err=>{
        console.log(err)
    })  
})

router.get('/allStudents',(req,res)=>{
    User.find({role:'student'})
    .then(students=>{
        res.json(students)
    })
    .catch(err=>{
        console.log(err)
    })  
})