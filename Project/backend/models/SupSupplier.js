//import mongoose
const mongoose = require("mongoose");
 

const Schema = mongoose.Schema;

const supplierSchema = new Schema({
    sipplierID : {
        type : String,
        required : true ,   //backend validation
        unique : true
    },

    itemID :{
        type:String,
        required : true,
    },

    F_name : {
        type : String,
        required : true  

    },

    L_name : {
        type : String,
        required : true
    },

    phone : {
        type : String,
        required : true
    },

    CompanyName : {
        type : String,
        required : true
    },

    Gender : {
        type : String,
        required : true
    },

    Address : {
        type : String,
        required : true
    },

    Email : {
        type : String,
        required : true
    },

});

const SupSupplier = mongoose.model("SupSupplier",supplierSchema);

module.exports = SupSupplier; //export the module