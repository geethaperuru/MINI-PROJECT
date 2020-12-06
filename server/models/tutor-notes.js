const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const notesSchema = mongoose.Schema({
    
    tutorId:{
        type:ObjectId,
        ref:"user"
    },
    notesName:{
        type:String,
        maxlength:100
    },
    notes_url:{
        type:String,
        maxlength:100
    }  
})

const Notes = mongoose.model('Tutor-Notes',notesSchema)

module.exports = { Notes }