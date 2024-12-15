const mongoose = require('mongoose');
const { PassThrough } = require('stream');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        lowercase: true,
    },
    password: {
        type : String,
        require : true,
    },
    socketId: {
        type : String,
        default : true,
    }
})