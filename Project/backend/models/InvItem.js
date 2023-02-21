//import mongoose
const mongoose = require('mongoose');

//declare a variable to store attributes
const schema = mongoose.Schema;

//create a object to store attributes
const invItemSchema = new schema({
    
    //attributes
    ItemID : {
        type : String,
        required : true, //backend validation
    },
    ItemName : {
        type : String,
        required : true, //backend validation
    },
    Quantity : {
        type : Number,
        required : true, //backend validation
    },
    ShelfID : {
        type : String,
        required : true,  //backend validation
    },
    Location : {
        type : String,
        required : true,  //backend validation
    },
    SupplierID : {
        type : String,
        required : true, //backend validation
    },
});

const InvItem = mongoose.model('InvItem', invItemSchema);

//export to routes
module.exports = InvItem;