const router = require("express").Router();
let OtherExpenFin = require("../models/OtherExpenFin");

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

  const newOtherExpenFin = new OtherExpenFin({
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

  newOtherExpenFin
    .save()
    .then(() => {
      res.json("Other Expen Details Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

// http://localhost:8070/OtherExpenFin---------------- for get details

router.route("/").get((req, res) => {
  OtherExpenFin.find()
    .then((otherExpenFin) => {
      res.json(otherExpenFin);
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

  const updateOtherExpenFin = {
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
  const update = await OtherExpenFin.findByIdAndUpdate(
    userId,
    updateOtherExpenFin
  )
    .then(() => {
      res.status(200).send({ status: "OtherExpenFin Updated" });
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

  await OtherExpenFin.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: "OtherExpenFin detele" });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error with delete OtherExpenFin",
        error: err.message,
      });
    });
});

//get single data
router.route("/get/:id").get(async (req, res) => {
  let userId = req.params.id;
  //const user =
  await OtherExpenFin.findById(userId)
    .then((OtherExpenFin) => {
      res.status(200).send({ status: "OtherExpenFin fetched", OtherExpenFin });
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
