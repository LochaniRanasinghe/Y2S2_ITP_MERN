const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CusBillSchema = new Schema({
  BillID: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    require: true,
  },
  NIC: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    require: true,
  },
  BilYear: {
    type: String,
    required: true,
  },
  BilMonth: {
    type: String,
    required: true,
  },
  BilDate: {
    type: String,
    required: true,
  },
  Branch: {
    type: String,
    required: true,
  },
  PromoCode: {
    type: String,
    required: true,
  },
  SerialNo: {
    type: String,
    required: true,
  },
  ProductID: {
    type: String,
    required: true,
  },
});

const CusBill = mongoose.model("CusBill", CusBillSchema);

module.exports = CusBill;
