const express = require('express');
const router = express.Router()
//const { Student } = require('../models/student');
//const {Tutor} = require('../models/tutor')
const mongoose = require('mongoose')
const Student = mongoose.model("Student")
const Tutor = mongoose.model("Tutor")
//student personal tutors
router.get('/myTutors/:id', (req,res)=>{
    Student.findById(req.params.id)
    .then(student=>{
        const tutors = student.tutors.map(async tutorId => {await Tutor.findById(tutorId) })
        res.json(tutors)
    })
    .catch(err=>{
        console.log(err)
        res.status(400).json(err)
    })
})

//view his profile 
router.get('/profile/:studentId',(req,res)=>{
    Student.findById(req.params.studentId)
    .then(student=>{
        console.log(student)
        res.json(student)
    })
    .catch(err=>{
        res.status(400).json(err)
    })
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
    
    const student = await Student.findById(req.params.studentId)
    const tutors = student.tutors
    const tutorId = req.body.tutorId
    if(tutors.indexOf(tutorId) != -1){
        console.log(err)
    }
    else{
        const newTutors = [...tutors,tutorId]
        student.tutors = newTutors

        // const tutor = Tutor.findById(tutorId)
        // const students = tutor.students
        // const newStudents = [...students,studentId]
        // tutor.students=newStudents
        try{            
            await student.save()
            //await tutor.save()
            const tutor = Tutor.findById(tutorId)
            const students = tutor.students
            let newStudents = []
            if(students.length == 0){
                newStudents = [student]
            }
            else{
                newStudents = [...students,studentId]
            }
            tutor.students = newStudents
            await tutor.save()
            res.json("message:tutor is added")
        }
        catch(err){
            res.status(400).json(err)
        }
    }
})

//update student name and email
router.put('/updateStudent/:studentId',async (req,res)=>{
    try{
        const student = await Student.findByIdAndUpdate(req.params.studentId,{email:req.body.email , name:req.body.name,password:req.body.password})
        if(!student) 
            return res.status(404).json('student not found with this id');
        res.json('Student updated');
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

module.exports={
    studentRouter : router
}
