const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const leaveSchema = new Schema({
  leaveID: {
    type: String,
    required: true,
    unique: true,
  },
  empID: {
    type: String,
    required: true,
  },
  dateOfLeave: {
    type: String,
    required: true,
  },
  dateOfReturn: {
    type: String,
    required: true,
  },
  approvalStatus: {
    type: String,
    required: false,
  },
});

const Leave = mongoose.model("Leave", leaveSchema);

module.exports = Leave;
