const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const tutorSchema = mongoose.Schema({
    
    userId:{
        type:ObjectId,
        ref:"user"
    },
    subject:{
        type:String,
        maxlength:100
    }  
})

const Tutor = mongoose.model('Tutor',tutorSchema)

module.exports = { Tutor }