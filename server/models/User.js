const mongoose= require('mongoose');
const bcrypt= require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required : true,
        unique: true,
        lowecase: true ,
        trim: true
    },
    password:{
        type: String,
        required : true,
        minlength: 6,
    },
    name: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp:{
        type: String
    }

});