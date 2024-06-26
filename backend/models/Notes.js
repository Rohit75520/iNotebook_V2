const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        type: String,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    tag:{
        type: String,
    },
    fileId: {
        type: String,
        ref: 'File'
    },
    date:{
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('notes', NotesSchema);