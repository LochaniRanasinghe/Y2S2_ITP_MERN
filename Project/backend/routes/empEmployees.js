const router = require("express").Router();

let Employee = require("../models/empEmployee");

/**** Route for CREATE/INSERT ****/

http: router.route("/add").post(async (req, res) => {
  const empID = req.body.empID;
  const name = req.body.name;
  const designation = req.body.designation;
  const branch = req.body.branch;
  const nic = req.body.nic;
  const gender = req.body.gender;
  const dob = req.body.dob;
  const phone = req.body.phone;
  const email = req.body.email;
  const dateOfEmployment = req.body.dateOfEmployment;

  const newEmployee = new Employee({
    empID,
    name,
    designation,
    branch,
    nic,
    gender,
    dob,
    phone,
    email,
    dateOfEmployment,
  });

  newEmployee
    .save()
    .then(() => {
      res.json("Employee added");
    })
    .catch((err) => {
      console.log(err);
    });
});

/**** Route for RETRIEVE/GET ****/

http: router.route("/").get(async (req, res) => {
  await Employee.find()
    .then((employees) => {
      res.json(employees);
    })
    .catch((err) => {
      console.log(err);
    });
});

/**** Route for UPDATE ****/

router.route("/update/:employeeid").put(async (req, res) => {
  let userId = req.params.employeeid;

  const {
    empID,
    name,
    designation,
    branch,
    nic,
    gender,
    dob,
    phone,
    email,
    dateOfEmployment,
  } = req.body;

  const updateEmployee = {
    empID,
    name,
    designation,
    branch,
    nic,
    gender,
    dob,
    phone,
    email,
    dateOfEmployment,
  };

  const update = await Employee.findByIdAndUpdate(userId, updateEmployee)
    .then(() => {
      res.status(200).send({ Status: "Employee updated" });
    })
    .catch((err) => {
      console.log(err);
      // or
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

/**** Route for DELETE ****/

router.route("/delete/:employeeid").delete(async (req, res) => {
  let userId = req.params.employeeid;

  await Employee.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: "Employee deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with deleting employee", error: err.message });
    });
});

/**** Get only one employee detail ****/

router.route("/get/:id").get(async (req, res) => {
  let userID = req.params.id;

  const user = await Employee.findById(userID)
    .then((employee) => {
      res.json(employee);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ stts: "Error with fetching one employee", error: err.message });
    });
});

module.exports = router;
