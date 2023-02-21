const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const salarySchema = new Schema({
  salaryID: {
    type: String,
    required: true,
    unique: true,
  },
  empID: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  basicSalary: {
    type: Number,
    required: true,
  },
  bonus: {
    type: Number,
    required: false,
  },
  deduction: {
    type: Number,
    required: false,
  },
  totalSalary: {
    type: Number,
    required: false,
  },
});

const Salary = mongoose.model("Salary", salarySchema);

module.exports = Salary;
