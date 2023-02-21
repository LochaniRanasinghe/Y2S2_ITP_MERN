const router = require("express").Router();

let SupInvoice = require("../models/SupInvoice");


//--------------Create Function---------------------

router.route("/add").post((req, res)=>{
    const invoiceID = req.body.invoiceID;
    const invcDate = req.body.invcDate;
    const supID = req.body.supID;
    const itemID = req.body.itemID;
    const quantity = req.body.quantity;
    const unitPrice = req.body.unitPrice;
    const description = req.body.description;
    const Amount = req.body.Amount;
    const totAmount = req.body.totAmount;

    const newInvoice = new SupInvoice({
         invoiceID,
         invcDate ,
         supID,  
         itemID,  
         quantity,  
         unitPrice,  
         description,  
         Amount , 
         totAmount , 
    });

    newInvoice.save().then(()=>{
        res.json("Invoice Added")
    
    }).catch((err)=>{
        console.log(err);
    });

});


//------------------Read Function--------------------

router.route("/").get((req,res)=>{
    SupInvoice.find().then((SupInvoices)=>{
        res.json(SupInvoices)
    }).catch((err)=>{
        console.log(err)
    })
});


//-------------------Update Function----------------------

router.route("/update/:invoiceID").put(async(req,res)=>{
    let invoiceID = req.params.invoiceID;
    
    const {invcDate, supID, itemID, quantity, unitPrice, description, Amount, totAmount} = req.body;  //use d structure method

    const updateInvoice ={
         invcDate ,
         supID,  
         itemID,  
         quantity,  
         unitPrice,  
         description,  
         Amount , 
         totAmount , 
    }

    const update = await SupInvoice.findByIdAndUpdate(invoiceID,updateInvoice)
    .then(()=>{
        res.status(200).send({status: "Invoice Updated"})

    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })    
});


//---------------------------Delete Function-----------------------

router.route("/delete/:invoiceID").delete(async(req,res)=>{
    let invoiceID =  req.params.invoiceID;
    
    await SupInvoice.findByIdAndDelete(invoiceID)
    .then(() => {
        res.status(200).send({status: "Invoice Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete invoice", error: err.message});
    })
    
    });



//----------------------Get only one Invoice detail-------------------

router.route('/get/:invoiceID').get(async(req, res) => {
    let invoiceID = req.params.invoiceID;
    const getIn = await SupInvoice.findById(invoiceID)
    .then((invoice) => {
        res
        .status(200)
        .send({status: 'Invoice fetched', invoice});
    })
    .catch(() => {
        console.log(err.message);  
        res
        .status(500)
        .send({status: 'Error with fetching one Invoice', error: err.message});
    });
});


module.exports = router;      //module export 