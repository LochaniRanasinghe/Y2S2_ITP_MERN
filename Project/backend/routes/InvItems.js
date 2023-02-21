//http requests for crud functions
//import express
const express = require('express');
//const { Model } = require('mongoose');

//access to model produtcs
const InvItem = require('../models/InvItem');

//to send requests to access routes
const router = express.Router();

//CREATE
//give route
router.route('/add').post((req,res) => {

    //pass properties to backend from frontend
    const ItemID = req.body.ItemID;
    const ItemName = req.body.ItemName;
    const Quantity = Number(req.body.Quantity);
    const ShelfID = req.body.ShelfID;
    const Location = req.body.Location;
    const SupplierID = req.body.SupplierID;

    //create a object
    const newInvItem = new InvItem({

        //intialize properties
        ItemID,
        ItemName,
        Quantity,
        ShelfID,
        Location,
        SupplierID
    });

    //send newProduct object to the DB
    newInvItem
    .save()
    .then(() => {
        res.json('Item details added')
    })
    .catch((err) => {
        console.log(err);
    });
});

//RETRIVE
//give route
router.route('/').get((req, res) => {
    //call InvItem variable 
    InvItem.find()
    .then((items) => {
        res.json(items); //if success...show product details
    })
    .catch((err) => {
        console.log(err);
    });
});

//UPDATE
//give route
router.route('/update/:itemid').put(async(req, res) => {
    //take the primary key of the product which we have to update
    let userId = req.params.itemid;

    //pass values from frontend to backend...destructure method
    const {
        ItemID,
        ItemName,
        Quantity,
        ShelfID,
        Location,
        SupplierID,
    } = req.body;

    //create object to update products
    const updateItems = {
        ItemID,
        ItemName,
        Quantity,
        ShelfID,
        Location,
        SupplierID,
    };

    //find whether there is a product with the given credentials
    const update = await InvItem.findByIdAndUpdate(userId, updateItems)
    .then(() => {
        res
        .status(200)
        .send({status: 'Item updated'});
    })
    .catch((err) => {
        console.log(err);
        //or
        res
        .status(500)
        .send({status: 'Error with updating data', error: err.message});
    });
});

//DELETE
//give route
router.route('/delete/:itemid').delete(async(req, res) => {
    let userId = req.params.itemid;

    //find whether there is a product with the given credentials
    await InvItem.findByIdAndDelete(userId)
    .then(() => {
        res
        .status(200)
        .send({status: 'Item deleted'});
    })
    .catch((err) => {
        console.log(err.message);
        //or
        res
        .status(500)
        .send({status: 'Error with deleting item', error: err.message});
    });
});

//GET ONLY ONE PRODUCT DETAIL
//give route
router.route('/get/:itemid').get(async(req, res) => {
    let userID = req.params.itemid;

    const getIn = await InvItem.findById(userID)
    .then((item) => {
        res
        .status(200)
        .send({status: 'Item fetched', item});
    })
    .catch(() => {
        console.log(err.message);
        //or
        res
        .status(500)
        .send({status: 'Error with fetching one item', error: err.message});
    }); 
});

//export module
module.exports = router;