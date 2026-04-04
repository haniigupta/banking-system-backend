const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
        unique: [true, 'Email already exists']
    },
    name:{
        type: String,
        required: [true, 'Name is required'],

    },
    password:{
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false
    },
},{
    timestamps: true
})

userSchema.pre('save', async function(next){

})