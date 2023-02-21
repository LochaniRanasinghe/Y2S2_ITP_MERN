const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  empID: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  dateOfEmployment: {
    type: String,
    required: true,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
