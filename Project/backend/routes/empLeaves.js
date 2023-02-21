const router = require("express").Router();

let Leave = require("../models/empLeave");

/**** Route for CREATE/INSERT ****/
http: router.route("/add").post(async (req, res) => {
  const leaveID = req.body.leaveID;
  const empID = req.body.empID;
  const dateOfLeave = req.body.dateOfLeave;
  const dateOfReturn = req.body.dateOfReturn;
  const approvalStatus = req.body.approvalStatus;

  const newLeave = new Leave({
    leaveID,
    empID,
    dateOfLeave,
    dateOfReturn,
    approvalStatus,
  });

  newLeave
    .save()
    .then(() => {
      res.json("Leave added");
    })
    .catch((err) => {
      console.log(err);
    });
});

/**** Route for RETRIEVE/GET ****/

http: router.route("/").get(async (req, res) => {
  await Leave.find()
    .then((leaves) => {
      res.json(leaves);
    })
    .catch((err) => {
      console.log(err);
    });
});

/**** Route for UPDATE ****/

router.route("/update/:leaveid").put(async (req, res) => {
  let leaveId = req.params.leaveid;

  const { leaveID, empID, dateOfLeave, dateOfReturn, approvalStatus } =
    req.body;

  const updateLeave = {
    leaveID,
    empID,
    dateOfLeave,
    dateOfReturn,
    approvalStatus,
  };

  const update = await Leave.findByIdAndUpdate(leaveId, updateLeave)
    .then(() => {
      res.status(200).send({ Status: "Leave updated" });
    })
    .catch((err) => {
      console.log(err);
      // or
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message }); // 500 is the server error status
    });
});

/**** Route for DELETE ****/

router.route("/delete/:leaveid").delete(async (req, res) => {
  let leaveId = req.params.leaveid;

  await Leave.findByIdAndDelete(leaveId)
    .then(() => {
      res.status(200).send({ status: "leave deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with deleting user", error: err.message });
    });
});

/**** Get only one leave detail ****/

router.route("/get/:id").get(async (req, res) => {
  let leaveId = req.params.id;
  const user = await Leave.findById(leaveId)
    .then((leave) => {
      res.json(leave);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ stts: "Error with fetching the leave", error: err.message });
    });
});

module.exports = router;
