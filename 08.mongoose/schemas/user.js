const mongoose = require('mongoose');
const {Schema} = mongoose;
// 있으면 안만듬
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,

    },
    comment: String,
    createAt: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('User', userSchema);