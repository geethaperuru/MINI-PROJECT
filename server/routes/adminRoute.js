const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")


router.get('/allTutors',(req,res)=>{
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

router.delete('/deleteStudent/:userId',(req,res)=>{
    User.findByIdAndDelete(req.params.userId,function(err,student){
        if(err){
            console.log(err)
        }
        else{
            console.log("student deleted",student)
        }
    })
})

router.delete('/deleteTutor/:userId',(req,res)=>{
    User.findByIdAndDelete({id:req.params.userId},function(err,tutor){
        if(err){
            console.log(err)
        }
        else{
            console.log("Tutor deleted",tutor)
        }
    })
})

