import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {} from "react-router-dom";
import axios from "axios";

import "./CustomerMangement.css";
import swal from 'sweetalert';

const GetAllCustomerDetails = () => {
  const [CID, setCID] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [NIC, setNIC] = useState("");
  const [Email, setEmail] = useState("");

  function sendData(e) {
    e.preventDefault();

    const CustomerSchema = {
      CID,
      FirstName,
      LastName,
      phoneNumber,
      NIC,
      Email,
    };

    axios
      .post("http://localhost:8070/Customer/add", CustomerSchema)
      .then(() => {
        swal("inserted!", "Data Inserted!", "success");
        window.location.reload(false);
      })
      .catch((err) => {
        alert(err);
      });
  }

  // add a new customer form ui
  return (
    <Container>
      <div className="OtherExpenAddForm">
        <h3>Add Customer Details </h3>
        <hr />
        <div>
          <Form onSubmit={sendData}>
            <Form.Group className="mb-3" controlId="formGridCID">
              <Form.Label>CID</Form.Label>
              <Form.Control
                placeholder="Enter Customer ID"
                required
                onChange={(e) => {
                  setCID(e.target.value);
                }}
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formFname">
                <Form.Label>FirstName</Form.Label>
                <Form.Control
                  placeholder="Enter FirstName"
                  required
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formLname">
                <Form.Label>LastName</Form.Label>
                <Form.Control
                  placeholder="Enter LastName"
                  required
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridPNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter phone number"
                pattern="[0-9]{10}"
                required
                onChange={(e) => {
                  setphoneNumber(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>NIC</Form.Label>
              <Form.Control
                placeholder="Enter NIC"
                required
                onChange={(e) => {
                  setNIC(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
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
    </Container>
  );
};

export default GetAllCustomerDetails;
