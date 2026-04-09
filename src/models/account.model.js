const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Account must belong to a user"]
    },
    status: {
        enum: {
            values: ['active', 'frozen', 'inactive'],
            message: 'Status must be either active, frozen or inactive'
        },
    },
    currency: {
        type: String,
        required: [true, 'Currency is required'],
        default: "INR"
    },


},{    timestamps: true
    })

    

const accountModel = mongoose.model('Account', accountSchema);
module.exports = accountModel;