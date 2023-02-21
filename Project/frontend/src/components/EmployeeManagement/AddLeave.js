import React, { useState } from "react";
import axios from "axios";
import "./employee.css";
import { Button } from "react-bootstrap";
import swal from "sweetalert";

function AddLeave() {
  var [leaveID, setleaveID] = useState("");
  var [empID, setempID] = useState("");
  var [dateOfLeave, setdateOfLeave] = useState("");
  var [dateOfReturn, setdateOfReturn] = useState("");
  var [approvalStatus, setapprovalStatus] = useState("");

  return (
    <div id="divLeaveForm">
      <br />
      <form
        className="formAddLeave"
        onSubmit={(e) => {
          e.preventDefault();

          const newLeave = {
            leaveID,
            empID,
            dateOfLeave,
            dateOfReturn,
            approvalStatus,
          };

          axios
            .post("http://localhost:8070/empLeave/add", newLeave)
            .then(() => {
              // alert("Leave added");
              swal("Leave Added!", "Task success!", "success");
              setTimeout(function () {
                window.location = "/leavesmain";
              }, 1000);
            })
            .catch((err) => {
              alert(err);
            });
        }}
      >
        <div className="leave1">
          <div id="addTitleLeave">
            <h1>Add Leave</h1>
          </div>
          <label htmlfor="leaveID" class="form-label">
            Leave ID
          </label>
          <input
            type="text"
            className="form-control"
            id="leaveID"
            placeholder="Enter leave ID"
            onChange={(e) => {
              setleaveID(e.target.value);
            }}
            required
          />
        </div>
        <br />

        <div className="leave1">
          <label htmlfor="empID" class="form-label">
            Employee ID
          </label>
          <input
            type="text"
            className="form-control"
            id="empID"
            placeholder="Enter employee ID"
            onChange={(e) => {
              setempID(e.target.value);
            }}
            required
          />
        </div>
        <br />

        <div className="leave1">
          <label htmlfor="dateOfLeave" class="form-label">
            Date of leave
          </label>
          <input
            type="date"
            className="form-control"
            id="dateOfLeave"
            placeholder="Enter date of leave"
            onChange={(e) => {
              setdateOfLeave(e.target.value);
            }}
            required
          />
        </div>
        <br />

        <div className="leave1">
          <label htmlfor="dateOfReturn" class="form-label">
            Date Of Return
          </label>
          <input
            type="date"
            className="form-control"
            id="dateOfReturn"
            placeholder="Enter date of return"
            onChange={(e) => {
              setdateOfReturn(e.target.value);
            }}
            required
          />
        </div>
        <br />

        <div className="leave1">
          <label htmlfor="approvalStatus" class="form-label">
            Approval Status
          </label>
          <input
            type="text"
            className="form-control"
            id="approvalStatus"
            placeholder="Enter Approval Status"
            onChange={(e) => {
              setapprovalStatus(e.target.value);
            }}
            required
          />
        </div>
        <br />

        <div className="divBtnSubmit">
          <Button
            variant="success"
            type="success"
            class="btn btn-primary"
            id="btnSubmit"
          >
            Submit
          </Button>
        </div>
        {/* <div id="btnViewDiv">
          <Button type="button" variant="success">
            <a id="customLink" href="/leavesmain">
              View
            </a>
          </Button>
        </div> */}
      </form>
    </div>
  );
}

export default AddLeave;
