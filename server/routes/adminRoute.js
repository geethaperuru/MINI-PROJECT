const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const Student = mongoose.model("Student")
const Tutor = mongoose.model("Tutor")
const Admin = mongoose.model("Admin")

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

router.post('/checkCred/:id',async (req,res)=>{
    try{
        const admin = await Admin.findById(req.params.id)
        if(admin.email === req.body.email && admin.password === req.body.password){
            return res.status(200).json("valid admin")
        }
        res.status(400).json("Invalid user")
    }
    catch(err){
        res.status(400).json(err)
    }
})

module.exports={
    adminRouter : router
}
