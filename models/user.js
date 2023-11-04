// Dependencies
const mongoose = require('mongoose');

// User schema
let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "normal"
    }
});

// Export User model
let User = mongoose.model('User', userSchema);

module.exports = User;