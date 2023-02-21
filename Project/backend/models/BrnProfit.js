const mongoose = require('mongoose');

const branchProfitSchema = new mongoose.Schema({
    income: {
        type: Number,
        required: true,
    },
    expenses: {
        type: Number,
        required: true,
    },
    ovrlProfit: {
        type: Number,
        required: true,
    },
    ovrlLosses: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('BranchProfit', branchProfitSchema)