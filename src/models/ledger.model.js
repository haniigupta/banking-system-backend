const mongoose = require('mongoose');

const ledgerSchema = new mongoose.Schema({
    account:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: [true, "Ledger entry must belong to an account"],
        index: true,
        immutable: true,
    },
    amount:{
        type: Number,
        required: [true, "Ledger entry must have an amount"],
        immutable: true,
        
    },
    transaction:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required: [true, "Ledger entry must be associated with a transaction"],
        index: true,
        immutable: true,
    },
    type:{
        type: String,
        enum:{
            values: ['debit', 'credit'],
            message: 'Ledger entry type must be either debit or credit',
        },
        required: [true, "Ledger entry must have a type"],
        immutable: true,
    },
},{timestamps: true 

})
// Prevent updates and deletions of ledger entries
function preventLedgerModification(){
    throw new Error("Ledger entries cannot be modified or deleted");
}

ledgerSchema.pre('findOneAndUpdate', preventLedgerModification);
ledgerSchema.pre('updateOne', preventLedgerModification);
ledgerSchema.pre('deleteOne', preventLedgerModification);
ledgerSchema.pre('remove', preventLedgerModification);
ledgerSchema.pre('deleteMany', preventLedgerModification);