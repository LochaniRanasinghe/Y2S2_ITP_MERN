//import mongoose
const mongoose = require("mongoose");
 

const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    invoiceID : {
        type : String,
        required : true ,   //backend validation
        unique : true
    },

    invcDate : {
        type : Date,
        required : true
    },


    supID : {
        type : String,
        required : true  

    },

    itemID : {
        type : String,
        required : true
    },

    quantity : {
        type : Number,
        required : true
    },

    unitPrice : {
        type : Number,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    Amount : {
        type : Number,
        required : true
    },

    totAmount : {
        type : Number,
        required : false
    },


    
});

const SupInvoice = mongoose.model("SupInvoice",invoiceSchema);

module.exports = SupInvoice; //export the module