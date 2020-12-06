const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const tutorSchema = mongoose.Schema({
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
    subject:{
        type:String,
        maxlength:100
    },
    notes:[
        {
            type:ObjectId,
            ref:Notes
        }
    ],
    students:[
        {
            type:ObjectId,
            ref:Student
        }
    ]
})

const Tutor = mongoose.model('Tutor',tutorSchema)

module.exports = { Tutor }