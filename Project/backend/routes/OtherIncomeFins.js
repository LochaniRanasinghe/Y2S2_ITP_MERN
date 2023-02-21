const router = require("express").Router();
let OtherIncomeFin = require("../models/OtherImcomeFin");

router.route("/add").post((req, res) => {
  //get input details from body

  const billId = req.body.billId;
  const byear = req.body.byear;
  const bmonth = req.body.bmonth;
  const bday = req.body.bday;
  const bpayee = req.body.bpayee;
  const bprice = Number(req.body.bprice);
  const bdescription = req.body.bdescription;
  const bbranch = req.body.bbranch;

  const newOtherImcomeFin = new OtherIncomeFin({
    // creating object and asign vals

    billId,
    byear,
    bmonth,
    bday,
    bpayee,
    bprice,
    bdescription,
    bbranch,
  });

  newOtherImcomeFin
    .save()
    .then(() => {
      res.json("Other Income Details Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

// http://localhost:8070/otherIncomeFin---------------- for get details

router.route("/").get((req, res) => {
  OtherIncomeFin.find()
    .then((otherIncomeFin) => {
      res.json(otherIncomeFin);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update details
router.route("/update/:id").put(async (req, res) => {
  let userId = req.params.id;

  //destructure
  const { billId, byear, bmonth, bday, bpayee, bprice, bdescription, bbranch } =
    req.body;

  const updateOtherImcomeFin = {
    //object
    billId,
    byear,
    bmonth,
    bday,
    bpayee,
    bprice,
    bdescription,
    bbranch,
  };

  //findoneandupdate
  const update = await OtherIncomeFin.findByIdAndUpdate(
    userId,
    updateOtherImcomeFin
  )
    .then(() => {
      res.status(200).send({ status: "OtherImcomeFin Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

//delete
router.route("/delete/:id").delete(async (req, res) => {
  let userId = req.params.id;

  await OtherIncomeFin.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: "OtherIncomeFin detele" });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error with delete OtherIncomeFin",
        error: err.message,
      });
    });
});

//get single data
router.route("/get/:id").get(async (req, res) => {
  let userId = req.params.id;

  //  //const user =
  await OtherIncomeFin.findById(userId)
    .then((OtherIncomeFin) => {
      res
        .status(200)
        .send({ status: "OtherIncomeFin fetched", OtherIncomeFin });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get user", error: err.message });
    });
});

//export module..
module.exports = router;
