const router = require("express").Router();

let SupSupplier = require("../models/SupSupplier");


//--------------Create Function---------------------

router.route("/add").post((req, res)=>{
    const sipplierID = req.body.sipplierID;
    const itemID = req.body.itemID;
    const F_name = req.body.F_name;
    const L_name = req.body.L_name;
    const phone = req.body.phone;
    const CompanyName = req.body.CompanyName;
    const Gender = req.body.Gender;
    const Address = req.body.Address;
    const Email = req.body.Email;

    const newSupplier = new SupSupplier({
        sipplierID,
        itemID,
        F_name,
        L_name,
        phone,
        CompanyName,
        Gender,
        Address,
        Email,
    });

    newSupplier.save().then(()=>{
        res.json("Supplier Added")
    
    }).catch((err)=>{
        console.log(err);
    });

});


//------------------Read Function--------------------

router.route("/").get((req,res)=>{
    SupSupplier.find().then((SupSuppliers)=>{
        res.json(SupSuppliers)
    }).catch((err)=>{
        console.log(err)
    })
});


//-------------------Update Function----------------------

router.route("/update/:sipplierID").put(async(req,res)=>{
    let sipplierID = req.params.sipplierID;
    
    const {itemID,F_name, L_name, phone, CompanyName, Gender, Address, Email} = req.body;  //use d structure method

    const updateSupplier ={
        itemID,
        F_name,
        L_name,
        phone,
        CompanyName,
        Gender,
        Address,
        Email
    }

    const update = await SupSupplier.findByIdAndUpdate(sipplierID,updateSupplier)
    .then(()=>{
        res.status(200).send({status: "User Updated"})

    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })    
});


//---------------------------Delete Function-----------------------

router.route("/delete/:sipplierID").delete(async(req,res)=>{
    let sipplierID =  req.params.sipplierID;
    
    await SupSupplier.findByIdAndDelete(sipplierID)
    .then(() => {
        res.status(200).send({status: "Supplier Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete supplier", error: err.message});
    })
    
    });


    //----------------------Get only one Supplier detail-------------------

router.route('/get/:sipplierID').get(async(req, res) => {
    let sipplierID = req.params.sipplierID;
    const getIn = await SupSupplier.findById(sipplierID)
    .then((supplier) => {
        res
        .status(200)
        .send({status: 'supplier fetched', supplier});
    })
    .catch(() => {
        console.log(err.message);  
        res
        .status(500)
        .send({status: 'Error with fetching one Supplier', error: err.message});
    });
});


 




module.exports = router;      //module export        