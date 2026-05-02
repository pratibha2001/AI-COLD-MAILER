const User = require("../models/User");
const sendEmail = require("../utils/sendEmail.js");

exports.registerUser = async(req , res) => {

    try{
        const {username, email, password}= req.body;
        if(!username||!email||!password){
            return res.status(400).json({message:'All fields are required'});
        }
        if(password.length<6){
            return res.status(400).json({message:'Password must be atleast 6 characters'});
        }
        if(!/\S+@\S+\.\S+/.test(email)){
             return res.status(400).json({message:'Invalid email format'});
        }

        const exitsingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:'Email Already in use'});
        }

        const otp = Math.floor(100000 + Math.random()*900000).toString();
        const otpExpiry= new Date(Date.now()+10*60*1000); //otp valid for 10 mins

        const user = new User({username,email,password,otp,otpExpiry});
        res.status(201).json({message: 'User registered succcessfully', user});

        //OTP SENDING LOGIC
        try{
            await sendEmail({
                to: email,
                subject:'Your OTP for AI COLD MAIL GENERATOR',
                text:`Your OTP code is ${otp}. It is valid for 10 minutes only.`
            })
        }
        catch(error){
            console.log({mesaage:'Error Sending OTP',error:error.message});
        }


    }
    catch(error ){
        res.status(500).json({message:'Error registering user', error: error.message});
    }
}