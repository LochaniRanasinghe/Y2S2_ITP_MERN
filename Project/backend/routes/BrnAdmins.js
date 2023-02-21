const router = require("express").Router();
const BrnAdmin = require("../models/BrnAdmin");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

router.route("/reg").post(async (req, res) => {
  //get input details from body

  const adminId = req.body.adminId;
  const adUsername = req.body.adUsername;
  const adNic = req.body.adNic;
  const adName = req.body.adName;
  const adEmail = req.body.adEmail;
  const adContactNo = req.body.adContactNo;
  const adPassword = req.body.adPassword;

  const hashedPassword = await bcrypt.hash(adPassword, 12);

  const newAdmin = new BrnAdmin({
    // creating object and asign values

    adminId,
    adUsername,
    adNic,
    adName,
    adEmail,
    adContactNo,
    adPassword: hashedPassword,
  });

  newAdmin
    .save()
    .then(() => {
      res.json("Admin Registration Details Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//get details

router.route("/").get((req, res) => {
  BrnAdmin.find()
    .then((BrnAdmin) => {
      res.json(BrnAdmin);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update

router.route("/update/:aid").put(async (req, res) => {
  let adminid = req.params.aid;

  //destructure
  const {
    adminId,
    adUsername,
    adNic,
    adName,
    adEmail,
    adContactNo,
    adPassword,
  } = req.body;

  const hashedPassword = await bcrypt.hash(adPassword, 12);

  const updateAdmin = {
    //object
    adminId,
    adUsername,
    adNic,
    adName,
    adEmail,
    adContactNo,
    adPassword: hashedPassword,
  };

  //findoneandupdate
  const update = await BrnAdmin.findByIdAndUpdate(adminid, updateAdmin)
    .then(() => {
      res.status(200).send({ status: "Admin Details Updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        status: "Error with updating admin details",
        error: err.message,
      });
    });
});

//delete

router.route("/delete/:aid").delete(async (req, res) => {
  let adminid = req.params.aid;

  await BrnAdmin.findByIdAndDelete(adminid)
    .then(() => {
      res.status(200).send({ status: "Admin Deleted" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with deleting admin", error: err.message });
    });
});

//get single data
router.route("/get/:aid").get(async (req, res) => {
  let adminid = req.params.aid;

  //  //const user =
  await BrnAdmin.findById(adminid)
    .then((BrnAdmin) => {
      res.status(200).send({ status: "Admin fetched", BrnAdmin });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get admin", error: err.message });
    });
});

//get single data by Email

router.route("/login").post(async (req, res) => {
  //get input details from body

  const adEmail = req.body.adEmail;
  const adPassword = req.body.adPassword;

  const user = await BrnAdmin.findOne({ adEmail });

  if (user != null) {
    bcrypt.compare(adPassword, user.adPassword, function (err, result) {
      if (result) {
        // password is valid
        res.json({
          _id: user._id,
          adminId: user.adminId,
          adUsername: user.adUsername,
          adNic: user.adNic,
          adName: user.adName,
          adEmail: user.adEmail,
          adContactNo: user.adContactNo,
          token: generateToken(user._id),
        });
      } else {
        // console.log("password not match");
        res.status(500).send({ status: "password not match" });
      }
    });
  } else {
    // console.log("User Does not exist");
    res.status(500).send({ status: "User Does not exist" });
  }
});

module.exports = router;
