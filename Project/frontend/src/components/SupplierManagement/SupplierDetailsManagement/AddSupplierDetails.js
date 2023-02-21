import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import "./SupplierDetailStyles.css";

const AddSupplierDetails = () => {
  const navigate = useNavigate();

  const [sipplierID, setSupplierID] = useState("");
  const [itemID, setItemID] = useState("");
  const [F_name, setF_name] = useState("");
  const [L_name, setL_name] = useState("");
  const [phone, setPhone] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [Gender, setGender] = useState("Male");
  const [Address, setAddress] = useState("");
  const [Email, setEmail] = useState("");

  function sendData(e) {
    e.preventDefault();

    const newSupplierSchema = {
      sipplierID,
      itemID,
      F_name,
      L_name,
      phone,
      CompanyName,
      Gender,
      Address,
      Email,
    };

    axios
      .post("http://localhost:8070/SupSupplier/add", newSupplierSchema)

      .then(() => {
        swal("Good job!", "Supplier added successfully!", "success");
        setTimeout(function () {
          navigate("/supplierdetails");
        }, 2000);
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="supplierdetailform">
      <h3>Add new supplier details </h3>
      <hr />
      <div>
        <Form onSubmit={sendData}>
          <Form.Group className="mb-3" controlId="formGridsupplierid">
            <Form.Label>Supplier ID</Form.Label>
            <Form.Control
              placeholder="Enter Supplier ID"
              required
              onChange={(e) => {
                setSupplierID(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGriditemid">
            <Form.Label>Item ID</Form.Label>
            <Form.Control
              placeholder="Enter item ID"
              required
              onChange={(e) => {
                setItemID(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridfirstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              placeholder="Enter first name"
              required
              onChange={(e) => {
                setF_name(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridlastname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              placeholder="Enter last name"
              required
              onChange={(e) => {
                setL_name(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridphone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              pattern="[0-9]{10}"
              placeholder="Enter Phone number"
              required
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridcompanyname">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              placeholder="Enter company name"
              required
              onChange={(e) => {
                setCompanyName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridbillid">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              defaultValue="Male"
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              <option>Male</option>
              <option>Female</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridaddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              placeholder="Enter Address"
              required
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridemail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder="Enter Email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>

          <hr />
          <Button variant="outline-success" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddSupplierDetails;
