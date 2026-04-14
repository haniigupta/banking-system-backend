const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({

    FromAccount:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: [true, "Transaction must have a source account"],
        index: true,
    },
    toAccount:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: [true, "Transaction must have a destination account"],
        index: true,
    },
    status:{
        type: String,
        enum:{
            values: ['pending', 'completed', 'failed', 'reversed'],
            message: 'Status must be either pending, completed, failed or reversed',
        },
        default: 'pending'
    },
    amount:{
        type: Number,
        required: [true, "Transaction must have an amount"],
        min: [0, "Amount must be a positive number"]
    },
    // Unique key for idempotent requests to prevent duplicate transactions
    // generate on client side
    idempotencyKey:{
        type: String,
        required: [true, "Transaction must have an idempotency key"],
        unique: true,
        index: true,
    },
},{timestamps: true})

const transactionModel = mongoose.model('Transaction', transactionSchema);
module.exports = transactionModel;