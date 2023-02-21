const router = require("express").Router();
let Customer = require("../models/Customer");

//http://localhost:8070/Customer/add

// Route for create INSERT  NEW
router.route("/add").post((req, res) => {
  const CID = req.body.CID;
  const FirstName = req.body.FirstName;
  const LastName = req.body.LastName;
  const phoneNumber = req.body.phoneNumber;
  const NIC = req.body.NIC;
  const Email = req.body.Email;

  const newCustomer = new Customer({
    CID,
    FirstName,
    LastName,
    phoneNumber,
    NIC,
    Email,
  });

  newCustomer
    .save()
    .then(() => {
      res.json("Customer added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//http://localhost:8070/Customer/

//View customer details
router.route("/").get((req, res) => {
  Customer.find()
    .then((Customers) => {
      res.json(Customers);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update customer details

router.route("/update/:cid").put(async (req, res) => {
  let userId = req.params.cid;

  //destructure
  const { CID, FirstName, LastName, phoneNumber, NIC, Email } = req.body;

  const updateCustomer = {
    CID,
    FirstName,
    LastName,
    phoneNumber,
    NIC,
    Email,
  };

  const update = await Customer.findByIdAndUpdate(userId, updateCustomer)
    .then(() => {
      res.status(200).send({ status: "Customer updated" });
    })
    .catch((err) => {
      console.log(err);
      //or
      res.status(500).send({
        status: "Error with updating customer data",
        error: err.massage,
      });
    });
});

//creating delete
router.route("/delete/:cid").delete(async (req, res) => {
  let userId = req.params.cid;

  await Customer.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: "Customer Deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        status: "Error with deleting customer data",
        error: err,
        massage,
      });
    });
});

router.route("/get/:cid").get(async (req, res) => {
  let userId = req.params.cid;

  const user = await Customer.findById(userId)
    .then((customer) => {
      res.status(200).send({ status: "Customer fetched", customer });
    })
    .catch((err) => {
      console.log(err);
      //or
      res.status(500).send({
        status: "Error with updating customer data",
        error: err.massage,
      });
    });
});

module.exports = router;
