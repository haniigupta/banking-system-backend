const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({

    FromAccount:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: [true, "Transaction must have a source account"],
        index: true,
    }
})