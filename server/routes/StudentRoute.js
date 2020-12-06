const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const StudentTutor = mongoose.model("student-tutor")
const Tutor =mongoose.model("tutor")

//student personal tutors
router.get('/myTutors/:userId',(req,res)=>{
    StudentTutor.find({studentId:userId})
    .then(tutors=>{
        res.json(tutors)
    })
    .catch(err=>{
        console.log(err)
    })
})

//view subject of specific tutor
router.get('/viewTutor/:tutorId',(req,res)=>{
    Tutor.findOne(req.params.tutorId)
    .then(tutor=>{
        console.log(tutor)
        res.json(tutor)
    })
    .catch(err=>{
        console.log(err)
    })
})

//view his profile 
router.get('/profile/:studentId',(req,res)=>{
    User.findOne(req.params.studentId)
    .then(student=>{
        console.log(student)
        res.json(student)
    })
    .catch(err=>{
        console.log(err)
    })
})

//get tutors list based on subject
router.get('/tutor/:subject',(req,res)=>{
    Tutor.find({subject:subject})
    .then(tutors=>{
        console.log(tutors)
        res.json(tutors)
    })
    .catch(err=>{
        console.log(err)
    })
})

//select the tutor
router.put('/selectTutor/:tutorId',(req,res)=>{
    
})
