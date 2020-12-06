const express = require('express');
const router = express.Router()
//const { Student } = require('../models/student');
//const {Tutor} = require('../models/tutor')
const mongoose = require('mongoose')
const Student = mongoose.model("Student")
const Tutor = mongoose.model("Tutor")

//student personal tutors
router.get('/myTutors/:id',async (req,res)=>{
    try{
        const student = await Student.findById(req.params.id)
        console.log(student)
        const tutorIds = student.tutors
        console.log(tutorIds)
        let tutors = []
        for(id of tutorIds){
            let tutor = await Tutor.findById(id)
            tutors.push(tutor);
        }
        console.log(tutors)
        res.json(tutors)
    }
    catch(err){
        console.log(err)
        res.json("Error")
    }
})

//view his profile 
router.get('/profile/:studentId',async (req,res)=>{

    const student = await Student.findById(req.params.studentId)
    if(!student)
        return res.status(404).json("student not found")
    res.json(student)
})

//get tutors list based on subject
router.get('/tutor/:subject',(req,res)=>{
    Tutor.find({subject:req.params.subject})
    .then(tutors=>{
        console.log(tutors)
        res.json(tutors)
    })
    .catch(err=>{
        console.log(err)
    })
})



//select the tutor
router.post('/selectTutor/:studentId',async (req,res)=>{
    
    try{
    const student = await Student.findById(req.params.studentId)
    const tutors = student.tutors
    const tutorId = req.body.tutorId
    if(tutors.indexOf(tutorId) != -1){
        console.log(err)
    }
    else{
        const newTutors = [...tutors,tutorId]
        student.tutors = newTutors          
            await student.save()
            //await tutor.save()
            const tutor = await Tutor.findById(tutorId)
            const students = tutor.students
            let newStudents = []
            
            if(students.length == 0){
                newStudents.push(req.params.studentId)
            }
            else{
                newStudents = [...students,studentId]
            }
            console.log(newStudents)
            tutor.students = newStudents
            await tutor.save()
            res.json("student and tutor is added")
    }
    }
    catch(err){
        console.log(err)
        res.status(400).json(err)
    }
})

//update student name and email
router.put('/updateStudent/:studentId',async (req,res)=>{
    try{
        const student = await Student.findByIdAndUpdate(req.params.studentId,{name:req.body.name,password:req.body.password})
        if(!student) 
            return res.status(404).json('student not found with this id');
            res.status(200).json({
                student:student,
                message:"student updated"
            });
    }
    catch(err){
        res.status(400).json(err);
    }
})

router.post('/addStudent',async (req,res)=>{
    try{
        const student = new Student({email:req.body.email , name : req.body.name , password : req.body.password,tutors:[]})
        await student.save();
        res.json("user added")
    }
    catch(err){
        console.log(err)
        res.status(400).json(err);
    }
})

router.post('/checkCred/:id',async (req,res)=>{
    try{
        const student = await Student.findById(req.params.id)
        if(student.email === req.body.email && student.password === req.body.password){
            return res.json("valid student")
        }
        return res.status(400).json("Invalid user")
    }
    catch(err){
        res.status(400).json(err)
    }
})

module.exports={
    studentRouter : router
}
