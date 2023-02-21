const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    branchId: {
        type: String,
        required: true,
    },
    brLocation: {
        type: String,
        required: true,
    },
    brManagerId: {
        type: String,
        required: true,
    },
    brEmail: {
        type: String,
        required: true,
    },
    brContactNo: {
        type: String,
        required: true,
    },
    brCreatedDate: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Branch', branchSchema)