const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const Student = mongoose.model("Student")
const Tutor = mongoose.model("Tutor")
const Note = mongoose.model("Note")

router.post('/addTutor',async (req,res)=>{
    try{
        const tutor = new Tutor({email:req.body.email , name : req.body.name , password : req.body.password,subject:req.body.subject,notes:[],students:[]})
        await tutor.save();
        res.json("tutor added")
    }
    catch(err){
        console.log(err)
        res.status(400).json(err);
    }
})

router.put('/updateTutor/:tutorId',async (req,res)=>{
    try{
        const tutor = await Tutor.findByIdAndUpdate(req.params.tutorId,{name:req.body.name,password:req.body.password})
        console.log(tutor)
        if(!tutor)  return res.status(404).json('tutor not found with this id')
        res.status(200).json({
            tutor:tutor,
            message:"tutor updated"
        });
    }
    catch(err){
        res.status(400).json(err);
    }
})

router.get('/getStudents/:tutorId',async (req,res)=>{
    try{
        const tutor = await Tutor.findById(req.params.tutorId)
        if(!tutor) 
            return res.status(404).json('tutor not found with this id');
        const students = tutor.students
        if(students.length == 0) 
            return res.status(404).json('No students exist');

        let allStudents=[]
        for(id of students){
            let stud = await Student.findById(id)
            console.log(stud)
            allStudents.push(stud)
        }
        res.json(allStudents)
    }
    catch(err){
        res.status(400).json(err)
    }
})


router.post('/addNotes/:tutorId',async (req,res)=>{
    try{
        let note = new Note({notesName:req.body.name,notesUrl:req.body.url})
        note = await note.save();
        const tutor = Tutor.findById(tutorId)
        const newNotes = [...tutor.notes,note._id]
        tutor.notes = newNotes;
        await tutor.save();
        res.json(note)
    }
    catch(err){
        res.status(400).json(err)
    }
})

module.exports={
    tutorRouter : router
}
