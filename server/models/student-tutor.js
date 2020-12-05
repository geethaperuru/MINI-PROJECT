const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const relationSchema = mongoose.Schema({
    
    studentId:{
        type:ObjectId,
        ref:"user"
    },
    tutorId:{
        type:ObjectId,
        ref:"user"
    }  
})

const Student = mongoose.model('Student-Tutor',relationSchema)
console.log("s-t created")
module.exports = { Student }