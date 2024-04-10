const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    filename: { type: String, required: true },
    type: {type: String},
    size: { type: Number, required: true},
    data: {type: Buffer}
});

module.exports = mongoose.model('File', fileSchema);