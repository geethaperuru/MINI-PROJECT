const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const Student = mongoose.model("Student")
const Tutor = mongoose.model("Tutor")

router.get('/allTutors',async (req,res)=>{
    const tutors = await Tutor.find()
    res.json(tutors)
})

router.get('/allStudents',async (req,res)=>{
    const students = await Student.find()
    res.json(students)
})

router.delete('/deleteStudent/:id',async (req,res)=>{
    try{
        const student = await Student.findByIdAndDelete(req.params.id)
        res.status(200).json("Student Deleted")
    }
    catch(err){
        res.status(400).json("Student not Deleted")
    }
})

router.delete('/deleteTutor/:id',async (req,res)=>{
    
    try{
        const tutor = await Tutor.findByIdAndDelete(req.params.id)
        res.status(200).json("Tutor Deleted")
    }
    catch(err){
        res.status(400).json("Tutor not Deleted")
    }

})

module.exports={
    adminRouter : router
}
