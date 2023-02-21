import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import "./CustomerMangement.css";
import swal from 'sweetalert';


const UpdateDeleteCustomer = () => {
  const history = useNavigate();

  const [CID, setCID] = useState("");
  const [Email, setEmail] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [NIC, setNIC] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { id } = useParams();

  const getallcustomerdetails = () => {
    axios
      .get("http://localhost:8070/Customer/get/" + id)
      .then((res) => {
        const UpdateCustomerDetails = {
          CID: res.data.customer.CID,
          Email: res.data.customer.Email,
          FirstName: res.data.customer.FirstName,
          LastName: res.data.customer.LastName,
          NIC: res.data.customer.NIC,
          phoneNumber: res.data.customer.phoneNumber,
        };

        console.log(res);

        setCID(UpdateCustomerDetails.CID);
        setFirstName(UpdateCustomerDetails.FirstName);
        setLastName(UpdateCustomerDetails.LastName);
        setPhoneNumber(UpdateCustomerDetails.phoneNumber);
        setNIC(UpdateCustomerDetails.NIC);
        setEmail(UpdateCustomerDetails.Email);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => getallcustomerdetails(), []);

  return (
    <Container>
      <div className="OtherExpenAddForm">
        <h3>Update Customer Details </h3>
        <hr />
        <div>
          <Form>
            <Form.Group className="mb-3" controlId="formGridCID">
              <Form.Label>CID</Form.Label>
              <Form.Control
                placeholder="Enter Customer ID"
                defaultValue={CID}
                disabled
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formFname">
                <Form.Label>FirstName</Form.Label>
                <Form.Control
                  placeholder="Enter FirstName"
                  defaultValue={FirstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formLname">
                <Form.Label>LastName</Form.Label>
                <Form.Control
                  placeholder="Enter LastName"
                  defaultValue={LastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridPNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                defaultValue={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>NIC</Form.Label>
              <Form.Control
                placeholder="Enter NIC"
                defaultValue={NIC}
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
                defaultValue={Email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>

            <hr />
            <Button
              variant="outline-success"
              type="submit"
              onClick={(e) => {
                e.preventDefault();

                const CustomerSchema = {
                  CID,
                  Email,
                  FirstName,
                  LastName,
                  NIC,
                  phoneNumber,
                };

                axios
                  .put(
                    "http://localhost:8070/Customer/update/" + id,
                    CustomerSchema
                  )
                  .then(() => {
                    swal("Updated!!!", "Data updated ", "success");
                    history(-1);
                  })
                  .catch((err) => {
                    alert(err);
                  });
              }}
            >
              Update
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default UpdateDeleteCustomer;
