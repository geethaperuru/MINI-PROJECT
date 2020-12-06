const mongoose = require('mongoose');
const notesSchema = mongoose.Schema({
    
    notesName:{
        type:String,
        maxlength:100
    },
    notes_url:{
        type:String,
        maxlength:100
    }  
})

const Notes = mongoose.model('Notes',notesSchema)

module.exports = { Notes }