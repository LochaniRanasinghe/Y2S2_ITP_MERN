const router = require('express').Router();
const BrnProfit = require('../models/BrnProfit');
//const Branch = require('../models/BrnBranch');


router.route("/add").post((req, res) => {
  //get input details from body

  const income = Number(req.body.income);
  const expenses = Number(req.body.expenses);
  const ovrlProfit = Number(req.body.ovrlProfit);
  const ovrlLosses = Number(req.body.ovrlLosses);

  const newProfit = new BrnProfit({
    // creating object and asign values

    income,
    expenses,
    ovrlProfit,
    ovrlLosses,
  });

  newProfit
    .save()
    .then(() => {
      res.json("Profit Details Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//get details

router.route("/").get((req, res) => {
  BrnProfit.find()
    .then((BrnProfit) => {
      res.json(BrnProfit);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update

router.route("/update/:pid").put(async (req, res) => {
  let profitid = req.params.pid;

  //destructure
  const { income, expenses, ovrlProfit, ovrlLosses } = req.body;

  const updateBProfit = {
    //object
    income,
    expenses,
    ovrlProfit,
    ovrlLosses,
  };

  //findoneandupdate
  const update = await BrnProfit.findByIdAndUpdate(
    profitid,
    updateBProfit
  )
    .then(() => {
      res.status(200).send({ status: "Branch profit Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating branch profit", error: err.message });
    });
});

//delete

router.route("/delete/:pid").delete(async (req, res) => {
  let profitid = req.params.pid;

  await BrnProfit.findByIdAndDelete(profitid)
    .then(() => {
      res.status(200).send({ status: "Branch profit Deleted" });
    }).catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with deleting banch profit", error: err.message });
    })
});

//get single data
router.route("/get/:pid").get(async (req, res) => {
  let profitid = req.params.pid;

  //  //const user =
  await BrnProfit.findById(profitid)
    .then((BrnProfit) => {
      res
        .status(200)
        .send({ status: "Profit fetched", BrnProfit });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with getting profit", error: err.message });
    });
});


module.exports = router;