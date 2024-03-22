const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    filename: { type: String, required: true },
    date: { type: Date, default: Date.now},
    size: { type: String, required: true},
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('File', fileSchema);