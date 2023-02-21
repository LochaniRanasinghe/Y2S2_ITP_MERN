const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//PromotionReportSchema

const PromoReportSch = new Schema({
  customerId: {
    type: String,
    required: true //backend validation
  },
  billId: {
    type: String,
    required: true //backend validation
  },
  billYear: {
    type: String,
    required: true //backend validation
  },
  billMonth: {
    type: String,
    required: true //backend validation
  },
  billDate: {
    type: String,
    required: true //backend validation
  },
  promotionId: {
    type: String,
    required: true //backend validation
  },
  promotionName: {
    type: String,
    required: true //backend validation
  },
  discountAmount: {
    type: Number,
    required: true //backend validation
  }

})

const PromoReport = mongoose.model("PromotionReport", PromoReportSch);

module.exports = PromoReport;

