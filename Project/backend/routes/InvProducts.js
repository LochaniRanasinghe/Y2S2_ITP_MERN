//http requests for crud functions
//import express
const express = require('express');
//const { Model } = require('mongoose');

//access to model produtcs
const InvProduct = require('../models/InvProduct');

//to send requests to access routes
const router = express.Router();

//CREATE
//give route
router.route('/add').post((req,res) => {

    //pass properties to backend from frontend
    const ID = req.body.ID;
    const Name = req.body.Name;
    const Price = Number(req.body.Price);
    const Model = req.body.Model;
    const YearOfManufactured = Number(req.body.YearOfManufactured);
    const WarrantyPeriod = Number(req.body.WarrantyPeriod);
    const SupplierID = req.body.SupplierID;

    //create a object
    const newInvProduct = new InvProduct({

        //intialize properties
        ID,
        Name,
        Price,
        Model,
        YearOfManufactured,
        WarrantyPeriod,
        SupplierID
    });

    //send newProduct object to the DB
    newInvProduct
    .save()
    .then(() => {
        res.json('Product details added')
    })
    .catch((err) => {
        console.log(err);
    });
});

//RETRIVE
//give route
router.route('/').get((req, res) => {
    //call InvProduct variable 
    InvProduct.find()
    .then((products) => {
        res.json(products); //if success...show product details
    })
    .catch((err) => {
        console.log(err);
    });
});

//UPDATE
//give route
router.route('/update/:productid').put(async(req, res) => {
    //take the primary key of the product which we have to update
    let userId = req.params.productid;

    //pass values from frontend to backend...destructure method
    const {
        ID,
        Name,
        Price,
        Model,
        YearOfManufactured,
        WarrantyPeriod,
        SupplierID,
    } = req.body;

    //create object to update products
    const updateProducts = {
        ID,
        Name,
        Price,
        Model,
        YearOfManufactured,
        WarrantyPeriod,
        SupplierID,
    };

    //find whether there is a product with the given credentials
    const update = await InvProduct.findByIdAndUpdate(userId, updateProducts)
    .then(() => {
        res
        .status(200)
        .send({status: 'Product updated'});
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
router.route('/delete/:productid').delete(async(req, res) => {
    let userId = req.params.productid;

    //find whether there is a product with the given credentials
    await InvProduct.findByIdAndDelete(userId)
    .then(() => {
        res
        .status(200)
        .send({status: 'Product deleted'});
    })
    .catch((err) => {
        console.log(err.message);
        //or
        res
        .status(500)
        .send({status: 'Error with deleting product', error: err.message});
    });
});

//GET ONLY ONE PRODUCT DETAIL
//give route
router.route('/get/:productid').get(async(req, res) => {
    let userID = req.params.productid;

    const getIn = await InvProduct.findById(userID)
    .then((product) => {
        res
        .status(200)
        .send({status: 'Product fetched', product});
    })
    .catch(() => {
        console.log(err.message);
        //or
        res
        .status(500)
        .send({status: 'Error with fetching one product', error: err.message});
    }); 
});

//export module
module.exports = router;