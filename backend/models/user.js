const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	email: { 
        type: String,
        unique: true,
        required: true
    },
	password: { 
        type: String, 
        minlength: 6,
        required: true,
    },
    code_verify: { 
        type: String, 
        required: false,
    }
})
module.exports = mongoose.model('User', userSchema)