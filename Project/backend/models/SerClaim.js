const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ClaimSchema = new schema({
  serialNo: {
    type: String,
    required: true,
    unique: true, //backend validation
  },
  mobileModel: {
    type: String,
    required: true,
  },
  warrantyTill: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true, //backend validation
  },
  contactNo: {
    type: String,
    required: true, //backend validation
  },
  receveDate: {
    type: String,
    required: true,
  },
  mobileIMEI: {
    type: String,
    required: true,
    unique: true, //backend validation
  },
  technician: {
    type: String,
    required: true, //backend validation
  },
  reason: {
    type: String,
    required: true, //backend validation
  },
  status: {
    type: String, //backend validation
    default: "COLLECT"
  },
});

const Claim = mongoose.model("Claim", ClaimSchema);

module.exports = Claim; //export...................
