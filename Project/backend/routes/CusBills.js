const router = require("express").Router();
let CusBill = require("../models/CusBill");

//http://localhost:8070/CusCusBill/add

// Route for create INSERT  NEW Customer bills
router.route("/add").post((req, res) => {
  const BillID = req.body.BillID;
  const Name = req.body.Name;
  const NIC = req.body.NIC;
  const price = Number(req.body.price);
  const BilYear = req.body.BilYear;
  const BilMonth = req.body.BilMonth;
  const BilDate = req.body.BilDate;
  const Branch = req.body.Branch;
  const PromoCode = req.body.PromoCode;
  const SerialNo = req.body.SerialNo;
  const ProductID = req.body.ProductID;

  const newCusBill = new CusBill({
    BillID,
    Name,
    NIC,
    price,
    BilYear,
    BilMonth,
    BilDate,
    Branch,
    PromoCode,
    SerialNo,
    ProductID,
  });

  newCusBill
    .save()
    .then(() => {
      res.json("Customer Bill added");
    })
    .catch((err) => {
      console.log(err);
    });
});

// view customer bill  details
router.route("/").get((req, res) => {
  CusBill.find()
    .then((CusBill) => {
      res.json(CusBill);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update customer Bill details

router.route("/update/:bid").put(async (req, res) => {
  let userId = req.params.bid;

  //destructure
  const {
    BillID,
    Name,
    NIC,
    price,
    BilYear,
    BilMonth,
    BilDate,
    Branch,
    PromoCode,
    SerialNo,
    ProductID,
  } = req.body;

  const updateCusBill = {
    BillID,
    Name,
    NIC,
    price,
    BilYear,
    BilMonth,
    BilDate,
    Branch,
    PromoCode,
    SerialNo,
    ProductID,
  };

  const update = await CusBill.findByIdAndUpdate(userId, updateCusBill)
    .then(() => {
      res.status(200).send({ status: "Customer bill updated" });
    })
    .catch((err) => {
      console.log(err);
      //or
      res.status(500).send({
        status: "Error with updating customer bill data",
        error: err.massage,
      });
    });
});

//creating delete
router.route("/delete/:bid").delete(async (req, res) => {
  let userId = req.params.bid;

  await CusBill.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: "Customer Bill Deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        status: "Error with deleting customer billing data",
        error: err,
        massage,
      });
    });
});

router.route("/get/:bid").get(async (req, res) => {
  let userId = req.params.bid;

  const user = await CusBill.findById(userId)
    .then((cusBill) => {
      res.status(200).send({ status: "Customer Bill fetched", cusBill });
    })
    .catch((err) => {
      console.log(err);
      //or
      res.status(500).send({
        status: "Error with  customer Bill data",
        error: err.massage,
      });
    });
});

module.exports = router;
