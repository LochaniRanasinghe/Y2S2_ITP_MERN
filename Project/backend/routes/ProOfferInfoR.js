const router = require("express").Router();
const { response } = require("express");
let promotionInfo = require("../models/ProOfferInfo");

//Insert Function-------------------------------------------------------------------------------------------------------------------------
router.route("/add").post((req, res) => {

  //get input details from body
  const promotionId = req.body.promotionId;
  const promotionName = req.body.promotionName;
  const promoDescription = req.body.promoDescription;
  const discountPercentage = Number(req.body.discountPercentage);
  const issuedYear = req.body.issuedYear;
  const issuedMonth = req.body.issuedMonth;
  const issuedDate = req.body.issuedDate;
  const dueYear = req.body.dueYear;
  const dueMonth = req.body.dueMonth;
  const dueDate = req.body.dueDate;
  const promoConditions = req.body.promoConditions;

  const newOfferInfo = new promotionInfo({
    
    // creating object and asign vals
    promotionId,
    promotionName,
    promoDescription,
    discountPercentage,
    issuedYear,
    issuedMonth,
    issuedDate,
    dueYear,
    dueMonth,
    dueDate,
    promoConditions

  })

  newOfferInfo
    .save()
    .then(() => {
      res.json("Offer Information Added");
    })
    .catch((err) => {
      console.log(err);
    })
})

//Retrieving All Inserted Offers-----------------------------------------------------------------------------------------------------------
router.route("/").get((req,res)=>{

promotionInfo
    .find()
    .then((offers)=>{
      res.json(offers)
  })
    .catch((err) => {
      console.log(err);
  })
})

//Update Offer Info------------------------------------------------------------------------------------------------------------------------

router.route("/update/:id")
  .put(async(req,res)=>{

  //to identify the primary key
  let offerID=req.params.id;

  //destructure  
  const { 
          promotionId,
          promotionName,
          promoDescription,
          discountPercentage,
          issuedYear,
          issuedMonth,
          issuedDate,
          dueYear,
          dueMonth,
          dueDate,
          promoConditions}=req.body;

   //new object to store newly updated values       
   const updateOffer={
          promotionId,
          promotionName,
          promoDescription,
          discountPercentage,
          issuedYear,
          issuedMonth,
          issuedDate,
          dueYear,
          dueMonth,
          dueDate,
          promoConditions

    } 
    
    const update = await promotionInfo.findByIdAndUpdate(offerID,updateOffer)
    .then(()=>{
        res.status(200).send({status:"Offer Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data"});
    })

    
})
//Delete offers--------------------------------------------------------------------------------------------------------------------------

router.route("/delete/:id")
  .delete(async(req,res)=>{

  //to identify the primary key
  let offerID=req.params.id;

  await promotionInfo.findByIdAndDelete(offerID) 
  .then(()=>{
    res.status(200).send({status:"Offer Deleted"})
  }).catch((err)=>{
    console.log(err.message);
    res.status(500).send({status:"Error with offer Deletion"});
  })

  })

//Retrieving one Inserted Offer from all the insertions-----------------------------------------------------------------------------------

router.route("/get/:id").get(async(req,res)=>{

  let offerId=req.params.id;
  const offer=await promotionInfo.findById(offerId)
     .then((promotionInfo)=>{
       res.status(200).send({status:"Offer is fetched",promotionInfo})
   })
     .catch((err) => {
      console.log(err.message);
      res.status(500).send({status:"Error with get offer"})
   })
 })  

//export module..
module.exports = router;
