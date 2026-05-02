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
        type: String,
    },
    otpExpiry:{
        type:Date
    }

});

//Hash password before saving
userSchema.pre(save,async function(next){
    if(!this.isModified('password')){
        return next();
    }
    const salt= await bcrpyt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//compare pasword for login
userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}

const User = mongoose.model('User',userSchema);
module.exports= User;