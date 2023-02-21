import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import { Button } from "react-bootstrap";

function UpdateLeave() {
  const [leaveID, setleaveID] = useState("");
  const [empID, setempID] = useState("");
  const [dateOfLeave, setdateOfLeave] = useState("");
  const [dateOfReturn, setdateOfReturn] = useState("");
  const [approvalStatus, setapprovalStatus] = useState("");

  const { id } = useParams();

  const getLeave = () => {
    axios
      .get("http://localhost:8070/empLeave/get/" + id)
      .then((res) => {
        const updateLeave = {
          leaveID: res.data.leaveID,
          empID: res.data.empID,
          dateOfLeave: res.data.dateOfLeave,
          dateOfReturn: res.data.dateOfReturn,
          approvalStatus: res.data.approvalStatus,
        };

        // console.log(res.data);
        setleaveID(updateLeave.leaveID);
        setempID(updateLeave.empID);
        setdateOfLeave(updateLeave.dateOfLeave);
        setdateOfReturn(updateLeave.dateOfReturn);
        setapprovalStatus(updateLeave.approvalStatus);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => getLeave(), []);

  return (
    <div className="App">
      <div id="updateTitleLeave">
        <h1>Update Leave - {leaveID}</h1>
      </div>

      <form
        className="formUpdateLeave"
        onSubmit={(e) => {
          e.preventDefault();

          const newLeave = {
            leaveID,
            empID,
            dateOfLeave,
            approvalStatus,
            dateOfReturn,
          };

          axios
            .put("http://localhost:8070/empLeave/update/" + id, newLeave)
            .then(() => {
              swal("Leave Updated!", "Task success!", "success");
              setTimeout(function () {
                window.location = "/leavesmain";
              }, 1000);
            })
            .catch((err) => {
              alert(err);
            });
        }}
      >
        <div className="form-group">
          <div className="leave1">
            <label htmlfor="leaveID" class="form-label">
              Leave ID
            </label>
            <input
              type="text"
              className="form-control"
              id="leaveID"
              value={leaveID}
              onChange={(e) => {
                setleaveID(e.target.value);
              }}
              disabled
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
              value={empID}
              onChange={(e) => {
                setempID(e.target.value);
              }}
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
              value={dateOfLeave}
              onChange={(e) => {
                setdateOfLeave(e.target.value);
              }}
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
              value={dateOfReturn}
              onChange={(e) => {
                setdateOfReturn(e.target.value);
              }}
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
              value={approvalStatus}
              onChange={(e) => {
                setapprovalStatus(e.target.value);
              }}
            />
          </div>
          <br />
          <div className="divBtnSubmit">
            <button type="submit" class="btn btn-primary">
              Update
            </button>
          </div>
          {/* <div id="btnViewDiv">
            <Button type="button" variant="success">
              <a id="customLink" href="/leavesmain">
                View
              </a>
            </Button>
          </div> */}
        </div>
      </form>
      <br />
    </div>
  );
}

export default UpdateLeave;
