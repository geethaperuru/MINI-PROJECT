const express = require('express');
const student = require('../models/student');
const router = express.Router()


//student personal tutors
router.get('/myTutors/:id', (req,res)=>{
    StudentTutor.findById(req.params.id)
    .then(student=>{
        const tutors = student.tutors.map(async tutorId => {await Tutor.findById(tutorId) })
        res.json(tutors)
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/getTutorDetails/:tutorId',(req,res)=>{
    User.findById(req.params.tutorId)
    .then(tutor=>{
        res.json(tutor)
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
router.post('/selectTutor',(req,res)=>{
    res.end(JSON.stringify({
        student-tutor:student-tutor
    }));
})
