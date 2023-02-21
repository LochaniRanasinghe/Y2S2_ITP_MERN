import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import swal from "sweetalert";
import { useParams } from "react-router-dom";

function UpdateSalary() {
  const [salaryID, setsalaryID] = useState("");
  const [empID, setempID] = useState("");
  const [year, setyear] = useState("");
  const [month, setmonth] = useState("");
  const [basicSalary, setbasicSalary] = useState("");
  const [bonus, setbonus] = useState("");
  const [deduction, setdeduction] = useState("");
  const [totalSalary, settotalSalary] = useState("");

  const { id } = useParams();

  const getSalary = () => {
    axios
      .get("http://localhost:8070/empSalary/get/" + id)
      .then((res) => {
        const updateSalary = {
          salaryID: res.data.salaryID,
          empID: res.data.empID,
          year: res.data.year,
          month: res.data.month,
          basicSalary: res.data.basicSalary,
          bonus: res.data.bonus,
          deduction: res.data.deduction,
          totalSalary: res.data.totalSalary,
        };

        setsalaryID(updateSalary.salaryID);
        setempID(updateSalary.empID);
        setyear(updateSalary.year);
        setmonth(updateSalary.month);
        setbasicSalary(updateSalary.basicSalary);
        setbonus(updateSalary.bonus);
        setdeduction(updateSalary.deduction);
        settotalSalary(updateSalary.totalSalary);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => getSalary(), []);

  return (
    <div id="empForm">
      <div id="updateTitleSalary">
        <h1>Update Salary - {salaryID}</h1>
      </div>
      <Form
        className="formUpdateSalary"
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
            .put("http://localhost:8070/empSalary/update/" + id, newSalary)
            .then(() => {
              swal("Salary Updated!", "Task success!", "success");
              setTimeout(function () {
                window.location = "/salarymain";
              }, 1000);
            })
            .catch((err) => {
              alert(err);
            });
        }}
      >
        <Form.Group className="salary1" controlId="salaryID">
          <Form.Label>Salary ID</Form.Label>
          <Form.Control
            type="text"
            id="salaryID"
            value={salaryID}
            onChange={(e) => {
              setsalaryID(e.target.value);
            }}
            disabled
          />
        </Form.Group>
        <br />
        <Form.Group className="salary1" controlId="empID">
          <Form.Label>Employee ID</Form.Label>
          <Form.Control
            type="text"
            id="empID"
            value={empID}
            onChange={(e) => {
              setempID(e.target.value);
            }}
          />
          <br />
        </Form.Group>
        <br />
        <Form.Group className="salary1" controlId="basicSalary">
          <Form.Label>Basic salary</Form.Label>
          <Form.Control
            type="Number"
            id="basicSalary"
            value={basicSalary}
            onChange={(e) => {
              setbasicSalary(e.target.value);
            }}
          />
        </Form.Group>
        <br />
        <Form.Group className="salary1" controlId="bonus">
          <Form.Label>Bonus</Form.Label>
          <Form.Control
            type="Number"
            id="bonus"
            value={bonus}
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
            id="deduction"
            value={deduction}
            onChange={(e) => {
              setdeduction(e.target.value);
            }}
          />
          <div class="container5">
            <div class="row">
              <div class="col-sm">
                <label htmlfor="year" class="form-label">
                  Year
                </label>
                <select
                  className="form-control"
                  name="year"
                  id="year"
                  value={year}
                  onChange={(e) => {
                    setyear(e.target.year);
                  }}
                  required
                >
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                </select>
              </div>

              <div class="col-sm">
                <label htmlfor="month" class="form-label">
                  Month
                </label>
                <select
                  className="form-control"
                  name="month"
                  id="month"
                  value={month}
                  onChange={(e) => {
                    setmonth(e.target.month);
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
                </select>
              </div>
            </div>
          </div>
        </Form.Group>
        <br />
        {/* <Form.Group className="salary1" controlId="totalSalary">
          <Form.Label>Salary Total</Form.Label>
          <Form.Control
            type="Number"
            id="totalSalary"
            //value={totalSalary}
            defaultValue={totalSalary}
            disabled
          />
        </Form.Group> */}
        <br /> <br />
        <div className="divBtnSubmit">
          <Button
            variant="primary"
            type="submit"
            id="btnSubmit"
            onClick={(e) => {
              settotalSalary(+basicSalary + +bonus - +deduction);
            }}
          >
            Update
          </Button>
        </div>
        <br />
        {/* <div id="btnViewDiv">
          <Button type="button" variant="success">
            <a id="customLink" href="/salarymain">
              View
            </a>
          </Button>
        </div> */}
        <br />
      </Form>
      <br />
    </div>
  );
}

export default UpdateSalary;
