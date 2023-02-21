const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//OfferSchema

const OfferSchema = new Schema({
  promotionId: {
    type: String,
    required: true //backend validation
  },
  promotionName: {
    type: String,
    required: true //backend validation
  },
  promoDescription: {
    type: String,
    required: true //backend validation
  },
  discountPercentage: {
    type: Number,
    required: true //backend validation
  },
  issuedYear: {
    type: String,
    required: true //backend validation
  },
  issuedMonth: {
    type: String,
    required: true //backend validation
  },
  issuedDate: {
    type: String,
    required: true //backend validation
  },
  dueYear: {
    type: String,
    required: true //backend validation
  },
  dueMonth: {
    type: String,
    required: true //backend validation
  },
  dueDate: {
    type: String,
    required: true //backend validation
  },
  promoConditions: {
    type: String,
    required: true //backend validation
  }
})

const PromotionInfo = mongoose.model("Promotion", OfferSchema);

module.exports = PromotionInfo;

