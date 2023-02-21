const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    adminId: {
        type: String,
        required: true,
    },
    adUsername: {
        type: String,
        required: true,
    },
    adNic: {
        type: String,
        required: true,
    },
    adName: {
        type: String,
        required: true,
    },
    adEmail: {
        type: String,
        required: true,
    },
    adContactNo: {
        type: String,
        required: true,
    },
    adPassword: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Admin', adminSchema)