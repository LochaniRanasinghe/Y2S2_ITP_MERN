const router = require('express').Router();
const BrnBranch = require('../models/BrnBranch');
//const Branch = require('../models/BrnBranch');


router.route("/add").post((req, res) => {
  //get input details from body

  const branchId = req.body.branchId;
  const brLocation = req.body.brLocation;
  const brManagerId = req.body.brManagerId;
  const brEmail = req.body.brEmail;
  const brContactNo = req.body.brContactNo;
  const brCreatedDate = req.body.brCreatedDate;

  const newBranch = new BrnBranch({
    // creating object and asign values

    branchId,
    brLocation,
    brManagerId,
    brEmail,
    brContactNo,
    brCreatedDate,
  });

  newBranch
    .save()
    .then(() => {
      res.json("Branch Details Added");
    })
    .catch((err) => {
      console.log(err);
    });
});


//get details

router.route("/").get((req, res) => {
  BrnBranch.find()
    .then((BrnBranch) => {
      res.json(BrnBranch);
    })
    .catch((err) => {
      console.log(err);
    });
});


//update

router.route("/update/:Bid").put(async (req, res) => {
  let branchid = req.params.Bid;

  //destructure
  const { branchId, brLocation, brManagerId, brEmail, brContactNo, brCreatedDate } = req.body;

  const updateBranch = {
    //object
    branchId,
    brLocation,
    brManagerId,
    brEmail,
    brContactNo,
    brCreatedDate,
  };

  //findoneandupdate
  const update = await BrnBranch.findByIdAndUpdate(
    branchid,
    updateBranch
  )
    .then(() => {
      res.status(200).send({ status: "Branch Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating branch", error: err.message });
    });
});


//delete

router.route("/delete/:Bid").delete(async (req, res) => {
  let branchid = req.params.Bid;

  await BrnBranch.findByIdAndDelete(branchid)
    .then(() => {
      res.status(200).send({ status: "Branch Deleted" });
    }).catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with deleting banch", error: err.message });
    })
});

//get single data
router.route("/get/:Bid").get(async (req, res) => {
  let branchid = req.params.Bid;

  //  //const user =
  await BrnBranch.findById(branchid)
    .then((BrnBranch) => {
      res
        .status(200)
        .send({ status: "Branch fetched", BrnBranch });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get branch", error: err.message });
    });
});

module.exports = router;
