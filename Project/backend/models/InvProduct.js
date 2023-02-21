//import mongoose
const mongoose = require('mongoose');

//declare a variable to store attributes
const schema = mongoose.Schema;

//create a object to store attributes
const invProductSchema = new schema({
    
    //attributes
    ID : {
        type : String,
        required : true, //backend validation
    },
    Name : {
        type : String,
        required : true, //backend validation
    },
    Price : {
        type : Number,
        required : true, //backend validation
    },
    Model : {
        type : String,
        required : true,  //backend validation
    },
    YearOfManufactured : {
        type : Number,
        required : true, //backend validation
    },
    WarrantyPeriod : {
        type : Number,
        required : true, //backend validation
    },
    SupplierID : {
        type : String,
        required : true, //backend validation
    },

});

const InvProduct = mongoose.model('InvProduct', invProductSchema);

//export to routes
module.exports = InvProduct;