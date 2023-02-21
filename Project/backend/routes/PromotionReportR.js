const router = require("express").Router();

let ProReports = require("../models/PromotionReport");

//Insert Function-------------------------------------------------------------------------------------------------------------------------
router.route("/add").post((req, res) => {

  //get input details from body
  const customerId = req.body.customerId;
  const billId = req.body.billId;
  const billYear = req.body.billYear;
  const billMonth = req.body.billMonth;
  const billDate = req.body.billDate;
  const promotionId = req.body.promotionId;
  const promotionName = req.body.promotionName;
  const discountAmount = Number(req.body.discountAmount);
  

  //object creation from PromoReport model
  const newPromoReport = new ProReports({
    
    //passing values to the object
    customerId,
    billId,
    billYear,
    billMonth,
    billDate,
    promotionId,
    promotionName,
    discountAmount
  })

  newPromoReport
    .save()
    .then(() => {
      res.json("Data Added");
    })
    .catch((err) => {
      console.log(err);
    })
})

//Retrieving All Inserted Offers-----------------------------------------------------------------------------------------------------------
router.route("/").get((req,res)=>{

  ProReports
    .find()
    .then((promoreport)=>{
      res.json(promoreport)
  })
    .catch((err) => {
      console.log(err);
  })
})
  
//Retrieving one Inserted data from all the insertions-----------------------------------------------------------------------------------

router.route("/get/:id").get(async(req,res)=>{

  let reportId = req.params.id;

  await ProReports.findById(reportId)
     .then((ProReports)=>{
       res.status(200).send({status:"Data is fetched",ProReports})
   })
     .catch((err) => {
      console.log(err.message);
      res.status(500).send({status:"Error with get data"})
   })
 })  

//Update Promotion Report Info------------------------------------------------------------------------------------------------------------------------

router.route("/update/:id")
  .put(async(req,res)=>{

  //to identify the primary key
  let reportID=req.params.id;

  //destructure  
  const { 
          customerId,
          billId,
          billYear,
          billMonth,
          billDate,
          promotionId,
          promotionName,
          discountAmount}=req.body;

  //new object to store newly updated values       
  const updateReport={
          customerId,
          billId,
          billYear,
          billMonth,
          billDate,
          promotionId,
          promotionName,
          discountAmount
    } 
    
    const update = await ProReports.findByIdAndUpdate(reportID,updateReport)
    .then(()=>{
        res.status(200).send({status:"Data Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data"});
    })

    
})

//Delete data--------------------------------------------------------------------------------------------------------------------------

router.route("/delete/:id")
  .delete(async(req,res)=>{

  //to identify the primary key
  let reportID=req.params.id;

  await ProReports.findByIdAndDelete(reportID) 
  .then(()=>{
    res.status(200).send({status:"Data Deleted"})
  }).catch((err)=>{
    console.log(err.message);
    res.status(500).send({status:"Error with data Deletion"});
  })

})


//export module..
module.exports = router;
