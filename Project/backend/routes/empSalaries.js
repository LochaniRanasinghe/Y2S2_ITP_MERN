const router = require("express").Router();

let Salary = require("../models/empSalary");

/**** Route for CREATE/INSERT ****/
http: router.route("/add").post(async (req, res) => {
  const salaryID = req.body.salaryID;
  const empID = req.body.empID;
  const year = req.body.year;
  const month = req.body.month;
  const basicSalary = Number(req.body.basicSalary);
  const bonus = Number(req.body.bonus);
  const deduction = Number(req.body.deduction);
  const totalSalary = Number(req.body.totalSalary);

  const newSalary = new Salary({
    salaryID,
    empID,
    year,
    month,
    basicSalary,
    bonus,
    deduction,
    totalSalary,
  });

  newSalary
    .save()
    .then(() => {
      res.json("Salary added");
    })
    .catch((err) => {
      console.log(err);
    });
});

/**** Route for RETRIEVE/GET ****/

http: router.route("/").get(async (req, res) => {
  await Salary.find()
    .then((salaries) => {
      res.json(salaries);
    })
    .catch((err) => {
      console.log(err);
    });
});

/**** Route for UPDATE ****/

router.route("/update/:salaryid").put(async (req, res) => {
  let salaryId = req.params.salaryid;

  const {
    salaryID,
    empID,
    year,
    month,
    basicSalary,
    bonus,
    deduction,
    totalSalary,
  } = req.body;

  const updateSalary = {
    salaryID,
    empID,
    year,
    month,
    basicSalary,
    bonus,
    deduction,
    totalSalary,
  };

  const update = await Salary.findByIdAndUpdate(salaryId, updateSalary)
    .then(() => {
      res.status(200).send({ Status: "Salary updated" });
    })
    .catch((err) => {
      console.log(err);
      // or
      res
        .status(500)
        .send({ status: "Error with updating salary", error: err.message }); // 500 is the server error status
    });
});

/**** Route for DELETE ****/

router.route("/delete/:salaryid").delete(async (req, res) => {
  let salaryId = req.params.salaryid;

  await Salary.findByIdAndDelete(salaryId)
    .then(() => {
      res.status(200).send({ status: "Salary deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with deleting user", error: err.message });
    });
});

/**** Get only one salary detail ****/

router.route("/get/:id").get(async (req, res) => {
  let salaryId = req.params.id;
  const user = await Salary.findById(salaryId)
    .then((salary) => {
      res.json(salary);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ stts: "Error with fetching one salary", error: err.message });
    });
});

module.exports = router;
