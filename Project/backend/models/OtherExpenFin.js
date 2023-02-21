const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//OtherExpenFin Scheema

const otherExpenFinScheema = new Schema({
  billId: {
    type: String,
    required: true, //backend validation
  },
  byear: {
    type: String,
    required: true, //backend validation
  },
  bmonth: {
    type: String,
    required: true, //backend validation
  },
  bday: {
    type: String,
    required: true, //backend validation
  },
  bpayee: {
    type: String,
    required: true, //backend validation
  },
  bprice: {
    type: Number,
    required: true, //backend validation
  },
  bdescription: {
    type: String,
    required: true, //backend validation
  },
  bbranch: {
    type: String,
    required: true, //backend validation
  },
});

const OtherExpenFin = mongoose.model("OtherExpenFin", otherExpenFinScheema);

module.exports = OtherExpenFin; //export...................
