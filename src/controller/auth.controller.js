const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

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

}

module.exports = {
    userRegisterController
}