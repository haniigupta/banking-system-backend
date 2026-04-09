const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const emailService = require('../services/email.service');

// User Registration Controller --API: /api/auth/register
async function userRegisterController(req, res){
    const {email, name, password} = req.body;

    const isExist = await userModel.findOne({email});
    if(isExist){
        return res.status(422).json({
            success: false,
            message: 'Email already exists'
        })
    }

    const user = await userModel.create({
        email, name, password
    })

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
    res.cookie('token', token)
    res.status(201).json({
        user:{
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    })

    // Send registration email
    await emailService.sendRegisterationEmail(user.email, user.name);

}

// User Login Controller --API: /api/auth/login
async function userLoginController(req,res){
    const {email, password} = req.body;

    const user = await userModel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({
            message: 'User not found'
        })
    }
   const isValidPassword = await user.comparePassword(password)

   if(!isValidPassword){
    return res.status(401).json({
        message: 'Invalid password'
    })
   }
   const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
    res.cookie('token', token)
    res.status(200).json({
        user:{
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    })
}

module.exports = {
    userRegisterController,
    userLoginController
}