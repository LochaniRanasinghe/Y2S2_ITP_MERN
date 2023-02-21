const router = require("express").Router();
const Claim = require("../models/SerClaim");

//add new Claim
router.post("/addclaim", async (req, res) => {
  try {
    //add new Claim
    const newClaim = new Claim({
      serialNo: req.body.serialNo,
      mobileModel: req.body.mobileModel,
      warrantyTill: req.body.warrantyTill,
      customerName: req.body.customerName,
      contactNo: req.body.contactNo,
      receveDate: req.body.receveDate,
      mobileIMEI: req.body.mobileIMEI,
      technician: req.body.technician,
      reason: req.body.reason,
      status: req.body.status,
    });

    //save
    const savedClaim = await newClaim.save();
    res.status(200).json(savedClaim);
  } catch (e) {
    console.log(e);
    return res.status(501).json(e.message);
  }
});

//GET all claims details
router.get("/getAll", async (req, res) => {
  Claim.find({})
    .then((Claim) => {
      res.status(200).json({ Claim });
    })
    .catch((error) => {
      res.status(401).json(error.message);
    });
});

//GET all specific value
router.get("/getSpecific", async (req, res) => {
  Claim.find({}, "mobileModel")
    .then((Claim) => {
      res.status(200).json({ Claim });
    })
    .catch((error) => {
      res.status(401).json(error.message);
    });
});

//UPDATE details
router.put("/update/:id", async (req, res) => {
  Claim.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  })
    .then((Claim) => {
      res.status(200).json({ Claim });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

//DELETE details
router.delete("/delete/:id", async (req, res) => {
  Claim.findByIdAndDelete(req.params.id)
    .then((Claim) => {
      res.status(200).json({ Claim });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

//Update Status
router.patch("/update/:id", async (req, res) => {
  Claim.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  })
    .then((Claim) => {
      res.status(200).json({ Claim });
    })
    .catch((error) => {
      res.status(501).json(error.message);
    });
});

//FIND specific detail
router.route("/get/:id").get(async (req, res) => {
  let ClaimId = req.params.id;
  const user = await Claim.findById(ClaimId)
    .then((Claim) => {
      res.status(200).send({ Claim });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ error: err.message });
    });
});

//get count
router.route("/service/get-count",).get(async (req, res) => {
  await Claim.aggregate()
    .group({
      _id: "$mobileModel",
      Count: {
        $count: {}
      }
    })
    .sort({ _id: 'asc' })

    //res.json(data.J)
    .then(data => res.json(data));
})


router.route("/service/Claimed-count",).get(async (req, res) => {
  await Claim.aggregate()
    .group({
      _id: { "mobileModel": "$mobileModel", "status": "CLAIMED", },
      Count: {
        $count: {}
      }
    })
    .sort({ _id: 'asc' })

    //res.json(data.J)
    .then(data => res.json(data));
})

router.route("/service/Collect-count",).get(async (req, res) => {
  await Claim.aggregate()
    .group({
      _id: { "mobileModel": "$mobileModel", "status": "COLLECT", },
      Count: {
        $count: {}
      }
    })
    .sort({ _id: 'asc' })

    //res.json(data.J)
    .then(data => res.json(data));
})

router.route("/service/Fixing-count",).get(async (req, res) => {
  await Claim.aggregate()
    // .match({
    //   mobileModel: 'Apple', status: "COLLECT"
    // })
    .group({
      _id: { "mobileModel": "$mobileModel", "status": "$status" },

      Count: {
        $sum: 1
      }
    })
    .sort({ _id: 'asc' })

    //res.json(data.J)
    .then(data => res.json(data));
})

//export module..
module.exports = router;
