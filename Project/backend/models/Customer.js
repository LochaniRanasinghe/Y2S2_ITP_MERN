const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  CID: {
    type: String,
    required: true,
  },
  FirstName: {
    type: String,
    require: true,
  },
  LastName: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  NIC: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
});

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;
