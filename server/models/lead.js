const mongoose = require('mongoose');
const { isEmail, isMobilePhone } = require('validator');


const leadSchema = new mongoose.Schema({
    firstName: {
        type:  String,
        trim:true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: [isEmail, "Please fill a valid email address"]
    },
    phoneNumber: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        validate: [isMobilePhone, "Enter a valid phone number"]
    }
});

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;