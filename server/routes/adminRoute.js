const express = require('express');
const router = express.Router()
const Student = require('../models/student')
const Tutor = require('../models/tutor')

router.get('/allTutors',(req,res)=>{
    Tutor.find()
    .then(tutors=>{
        res.json(tutors)
    })
    .catch(err=>{
        res.status(400).json(err)
    })  
})

router.get('/allStudents',(req,res)=>{
    Student.find()
    .then(students=>{
        res.json(students)
    })
    .catch(err=>{
        res.status(400).json(err)
    })  
})


router.delete('/deleteStudent/:id',(req,res)=>{
    Student.findByIdAndDelete(req.params.id,function(err,student){
        if(err){
            res.status(400).json(err)
        }
        else{
            res.json(student)
        }
    })
})

router.delete('/deleteTutor/:id',(req,res)=>{
    Tutor.findByIdAndDelete(req.params.id,function(err,tutor){
        if(err){
            res.status(400).json(err)
        }
        else{
            res.json(tutor)
        }
    })
})

module.exports={
    adminRouter : router
}
