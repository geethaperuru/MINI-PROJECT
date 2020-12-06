const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');
const tutor = require('./tutor');

const StudentSchema={
    email:{
        type:String,
        required:true,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    name:{
        type:String,
        maxlength:100
    },
    tutors:[
        {
            tutorId:{
                type:ObjectID,
                ref:tutor
            }
        }
    ]   
}

const Student = mongoose.model('Student',StudentSchema)

module.exports = { Student }