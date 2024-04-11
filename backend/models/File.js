const mongoose = require('mongoose');
const { Schema } = mongoose;

const fileSchema = new Schema({
    user: { 
        type: String,
        ref: 'user'
    },
    filename: { type: String, required: true },
    type: {type: String},
    size: { type: Number, required: true},
    data: {type: Buffer}
});

module.exports = mongoose.model('File', fileSchema);