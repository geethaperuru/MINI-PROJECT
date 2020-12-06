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

router.get('/login',(req,res)=>{
    Admin.findOne({'email':req.body.email},(err,admin)=>{
        if(!admin) return res.json({isAuth:false,message:"Authenetication failed"})
        if(admin.password!==req.body.password)
            return res.json({isAuth:false,message:"Incorrect Id or Password"})
        return res.json({isAuth:true,message:"Logged In Succesfully",admin})
    })
})

module.exports={
    adminRouter : router
}
