import React, { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import swal from "sweetalert";
import "./employee.css";

function AddSalary() {
  var [salaryID, setsalaryID] = useState("");
  var [empID, setempID] = useState("");
  var [year, setyear] = useState("");
  var [month, setmonth] = useState("");
  var [basicSalary, setbasicSalary] = useState("");
  var [bonus, setbonus] = useState("");
  var [deduction, setdeduction] = useState("");
  var [totalSalary, settotalSalary] = useState("");

  return (
    <div id="divSalaryForm">
      <br />
      <br />
      <Form
        className="formAddSalary"
        onSubmit={(e) => {
          e.preventDefault();

          const newSalary = {
            salaryID,
            empID,
            year,
            month,
            basicSalary,
            bonus,
            deduction,
            totalSalary,
          };

          axios
            .post("http://localhost:8070/empSalary/add", newSalary)
            .then(() => {
              swal("Salary Added!", "Task success!", "success");
              setTimeout(function () {
                window.location = "/salarymain";
              }, 1000);
            })
            .catch((err) => {
              alert(err);
            });
        }}
      >
        <div id="addTitleSalary">
          <h1>Add Salary</h1>
        </div>
        <Form.Group className="salary1" controlId="salaryID">
          <Form.Label>Salary ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter salary ID"
            onChange={(e) => {
              setsalaryID(e.target.value);
            }}
            required
          />
        </Form.Group>
        <br />
        <Form.Group className="salary1" controlId="empID">
          <Form.Label>Employee ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter employee ID"
            onChange={(e) => {
              setempID(e.target.value);
            }}
            required
          />
        </Form.Group>
        <br />
        <Form.Group className="salary1" controlId="basicSalary">
          <Form.Label>Basic salary</Form.Label>
          <Form.Control
            type="Number"
            placeholder="Enter Basic salary"
            onChange={(e) => {
              setbasicSalary(e.target.value);
            }}
            required
          />
        </Form.Group>
        <br />
        <Form.Group className="salary1" controlId="bonus">
          <Form.Label>Bonus</Form.Label>
          <Form.Control
            type="Number"
            placeholder="Enter bonus"
            onChange={(e) => {
              setbonus(e.target.value);
            }}
          />
        </Form.Group>
        <br />
        <Form.Group className="salary1" controlId="deduction">
          <Form.Label>Salary deduction</Form.Label>
          <Form.Control
            type="Number"
            placeholder="Enter salary deduction"
            onChange={(e) => {
              setdeduction(e.target.value);
            }}
          />
        </Form.Group>
        <br />
        <div class="container5">
          <div class="row">
            <div class="col-sm">
              <Form.Group className="salary1" controlId="year">
                <Form.Label>Year</Form.Label>
                <Form.Select
                  className="form-control"
                  id="year"
                  onChange={(e) => {
                    setyear(e.target.value);
                    settotalSalary(+basicSalary + +bonus - +deduction);
                  }}
                  required
                >
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                </Form.Select>
              </Form.Group>
            </div>
            <br />
            <div class="col-sm">
              <Form.Group className="leave1" controlId="month">
                <Form.Label>Month</Form.Label>
                <Form.Select
                  className="form-control"
                  name="month"
                  id="month"
                  onChange={(e) => {
                    setmonth(e.target.value);
                    settotalSalary(+basicSalary + +bonus - +deduction);
                  }}
                  required
                >
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>
        </div>
        <br />
        <Form.Group className="salary1" controlId="totalSalary">
          <Form.Label>Salary Total</Form.Label>
          <Form.Control
            type="Number"
            placeholder="Total Salary"
            defaultValue={totalSalary}
            disabled
          />
        </Form.Group>
        <br /> <br />
        <div className="divBtnSubmit">
          <Button variant="success" type="submit" id="btnSubmit">
            Submit
          </Button>
        </div>
        {/* <br />
        <div id="btnViewDiv">
          <Button type="button" variant="success">
            <a id="customLink" href="/salarymain">
              View
            </a>
          </Button>
        </div> */}
      </Form>
    </div>
  );
}

export default AddSalary;
