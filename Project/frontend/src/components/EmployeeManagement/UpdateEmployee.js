import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, InputGroup } from "react-bootstrap";
import swal from "sweetalert";
import { useParams } from "react-router-dom";

function UpdateEmployee() {
  const [empID, setempID] = useState("");
  const [name, setname] = useState("");
  const [designation, setdesignation] = useState("");
  const [branch, setbranch] = useState("");
  const [nic, setnic] = useState("");
  const [gender, setgender] = useState("");
  const [dob, setdob] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [dateOfEmployment, setdateOfEmployment] = useState("");

  const { id } = useParams();

  const getEmployee = () => {
    axios
      .get("http://localhost:8070/empEmployee/get/" + id)
      .then((res) => {
        const updateEmployee = {
          empID: res.data.empID,
          name: res.data.name,
          designation: res.data.designation,
          branch: res.data.branch,
          nic: res.data.nic,
          gender: res.data.gender,
          dob: res.data.dob,
          phone: res.data.phone,
          email: res.data.email,
          dateOfEmployment: res.data.dateOfEmployment,
        };

        setempID(updateEmployee.empID);
        setname(updateEmployee.name);
        setdesignation(updateEmployee.designation);
        setbranch(updateEmployee.branch);
        setnic(updateEmployee.nic);
        setgender(updateEmployee.gender);
        setdob(updateEmployee.dob);
        setphone(updateEmployee.phone);
        setemail(updateEmployee.email);
        setdateOfEmployment(updateEmployee.dateOfEmployment);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => getEmployee(), []);

  return (
    <div id="divEmpForm">
      <br />
      <div id="updateTitleEmp">
        <h1>Update Employee - {empID}</h1>
      </div>
      <Form
        className="formUpdateEmployee"
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
            .put("http://localhost:8070/empEmployee/update/" + id, newEmployee)
            .then(() => {
              swal("Employee Updated!", "Task success!", "success");
              setTimeout(function () {
                window.location = "/employeemain";
              }, 1000);
            })
            .catch((err) => {
              alert(err);
            });
        }}
      >
        <Form.Group className="emp1" controlId="empID">
          <Form.Label>Employee ID</Form.Label>
          <Form.Control
            type="text"
            id="empID"
            value={empID}
            onChange={(e) => {
              setempID(e.target.value);
            }}
            disabled
          />
        </Form.Group>
        <br />
        <Form.Group className="emp1" controlId="name">
          <Form.Label>Full name</Form.Label>
          <Form.Control
            id="name"
            type="text"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
        </Form.Group>
        <br />
        <Form.Group className="emp1" controlId="designation">
          <Form.Label>Designation</Form.Label>
          <Form.Select
            aria-label="Default select example"
            id="designation"
            value={designation}
            onChange={(e) => {
              setdesignation(e.target.value);
            }}
          >
            <option disabled>Select designation</option>
            <option value="Manager">Manager</option>
            <option value="Worker">Worker</option>
          </Form.Select>
        </Form.Group>
        <br />
        <Form.Group className="emp1" controlId="branch">
          <Form.Label>Branch</Form.Label>
          <Form.Select
            aria-label="Default select example"
            id="branch"
            value={branch}
            onChange={(e) => {
              setbranch(e.target.value);
            }}
          >
            <option disabled>Select Branch</option>
            <option value="Panadura">Panadura</option>
            <option value="Kalutara">Kalutara</option>
            <option value="Colombo">Colombo</option>
          </Form.Select>
        </Form.Group>
        <br />
        <Form.Group className="emp1" controlId="nic">
          <Form.Label>NIC</Form.Label>
          <Form.Control
            type="text"
            id="nic"
            value={nic}
            onChange={(e) => {
              setnic(e.target.value);
            }}
          />
        </Form.Group>
        <br />
        <Form.Group className="emp1" controlId="gender">
          <Form.Label>Gender</Form.Label>

          <InputGroup value={gender} className="radioGrp">
            <div id="divRadio1">
              <InputGroup.Radio
                value="Male"
                id="gender"
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
                id="gender"
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
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => {
              setdob(e.target.value);
            }}
          />
        </Form.Group>
        <br />
        <Form.Group className="emp1" controlId="phone">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type="Number"
            id="phone"
            value={phone}
            onChange={(e) => {
              setphone(e.target.value);
            }}
          />
        </Form.Group>
        <br />
        <Form.Group className="emp1" controlId="email">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
        </Form.Group>
        <br />
        <Form.Group className="emp1" controlId="dateOfEmployment">
          <Form.Label>Date of employment</Form.Label>
          <Form.Control
            type="date"
            id="dateOfEmployment"
            value={dateOfEmployment}
            onChange={(e) => {
              setdateOfEmployment(e.target.value);
            }}
          />
        </Form.Group>
        <br /> <br />
        <div className="divBtnSubmit">
          <Button variant="primary" type="submit" id="btnSubmit">
            Update
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
      <br /> <br />
    </div>
  );
}

export default UpdateEmployee;
