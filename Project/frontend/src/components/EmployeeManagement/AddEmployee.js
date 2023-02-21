import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import "./employee.css";

function AddEmployee() {
  var [empID, setempID] = useState("");
  var [name, setname] = useState("");
  var [designation, setdesignation] = useState("");
  var [branch, setbranch] = useState("");
  var [nic, setnic] = useState("");
  var [gender, setgender] = useState("");
  var [dob, setdob] = useState("");
  var [phone, setphone] = useState("");
  var [email, setemail] = useState("");
  var [dateOfEmployment, setdateOfEmployment] = useState("");

  return (
    <div id="divEmpForm">
      <Form
        className="formAddEmployee"
        onSubmit={(e) => {
          e.preventDefault();

          const newEmployee = {
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

          axios
            .post("http://localhost:8070/empEmployee/add", newEmployee)
            .then(() => {
              swal("Employee Added!", "Task success!", "success");
              setTimeout(function () {
                window.location = "/employeemain";
              }, 1000);
            })
            .catch((err) => {
              alert(err);
            });
        }}
      >
        <div id="addTitle">
          <h1>Add Employee</h1>
        </div>
        <Form.Group className="emp1" controlId="empID">
          <Form.Label>Employee ID</Form.Label>
          <Form.Control
            id="empID"
            type="text"
            placeholder="Enter employee ID"
            onChange={(e) => {
              setempID(e.target.value);
            }}
            required
          />
        </Form.Group>
        <br />
        <Form.Group className="emp1" controlId="name">
          <Form.Label>Full name</Form.Label>
          <Form.Control
            id="name"
            type="text"
            placeholder="Enter name"
            onChange={(e) => {
              setname(e.target.value);
            }}
            required
          />
        </Form.Group>
        <br />
        <Form.Group className="emp1" controlId="designation">
          <Form.Label>Designation</Form.Label>
          <Form.Select
            id="inputSelect"
            onChange={(e) => {
              setdesignation(e.target.value);
            }}
            aria-label="Default select example"
            required
          >
            <option>Select designation</option>
            <option value="Manager">Manager</option>
            <option value="Worker">Worker</option>
          </Form.Select>
        </Form.Group>
        <br />
        <Form.Group className="emp1" controlId="branch">
          <Form.Label>Branch</Form.Label>
          <Form.Select
            id="inputSelect"
            onChange={(e) => {
              setbranch(e.target.value);
            }}
            aria-label="Default select example"
            required
          >
            <option>Select Branch</option>
            <option value="Panadura">Panadura</option>
            <option value="Kalutara">Kalutara</option>
            <option value="Colombo">Colombo</option>
          </Form.Select>
        </Form.Group>
        <br />
        <Form.Group className="emp1" controlId="nic">
          <Form.Label>NIC</Form.Label>
          <Form.Control
            id="nic"
            type="text"
            //pattern="[0-9]{9},[x|X|v|V]|[0-9]{12}"
            // oninvalid="this.setCustomValidity('Invalid NIC formate')"
            placeholder="Enter NIC number"
            onChange={(e) => {
              setnic(e.target.value);
            }}
            required
          />
        </Form.Group>
        <br />
        <Form.Group className="emp1" controlId="gender">
          <Form.Label>Gender</Form.Label>
          <InputGroup value={gender}>
            <div id="divRadio1">
              <InputGroup.Radio
                value="Male"
                name="gender"
                aria-label="Radio 1"
                onChange={(e) => {
                  setgender(e.target.value);
                }}
              />
              <div id="divText1">Male</div>
            </div>
            <div id="divRadio2">
              <InputGroup.Radio
                value="Female"
                name="gender"
                aria-label="Radio 2"
                onChange={(e) => {
                  setgender(e.target.value);
                }}
              />
              <div id="divText2">Female</div>
            </div>
          </InputGroup>
        </Form.Group>
        <br />
        <Form.Group className="emp1" controlId="dob">
          <Form.Label>Date of birth</Form.Label>
          <Form.Control
            id="dob"
            type="date"
            placeholder="Enter date of birth"
            onChange={(e) => {
              setdob(e.target.value);
            }}
            required
          />
        </Form.Group>
        <br />
        <Form.Group className="emp1" controlId="phone">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            id="phone"
            type="tel"
            pattern="[0-9]{10}"
            placeholder="Enter phone number"
            onChange={(e) => {
              setphone(e.target.value);
            }}
            required
          />
        </Form.Group>
        <br />
        <Form.Group className="emp1" controlId="email">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            id="email"
            type="email"
            placeholder="Enter e-mail"
            onChange={(e) => {
              setemail(e.target.value);
            }}
            required
          />
        </Form.Group>
        <br />
        <Form.Group className="emp1" controlId="dateOfEmployment">
          <Form.Label>Date of employment</Form.Label>
          <Form.Control
            id="dateOfEmployment"
            type="date"
            placeholder="Enter date of employment"
            onChange={(e) => {
              setdateOfEmployment(e.target.value);
            }}
            required
          />
        </Form.Group>
        <br /> <br />
        <div className="divBtnSubmit">
          <Button variant="success" type="submit" id="btnSubmit">
            Submit
          </Button>
        </div>
        {/* <div id="btnViewDiv">
          <Button type="button" variant="success">
            <a id="customLink" href="/employeemain">
              View
            </a>
          </Button>
        </div> */}
      </Form>
    </div>
  );
}

export default AddEmployee;
