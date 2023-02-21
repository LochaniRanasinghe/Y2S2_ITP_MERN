import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import {} from "react-router-dom";
import axios from "axios";

import "./OtherIncomeStyle.css";

import swal from "sweetalert";

const AddOtherIncome = () => {
  const d = new Date();

  const [billId, setbillId] = useState("");
  const [byear, setByear] = useState("");
  const [bmonth, setBmonth] = useState("");
  const [bday, setBday] = useState("");
  const [bpayee, setBpayee] = useState("");
  const [bprice, setBprice] = useState("");
  const [bdescription, setBdescription] = useState("");
  const [bbranch, setBbranch] = useState("");

  function setAutomatics() {
    setBbranch(document.getElementById("oifbranch").value);
    setByear(document.getElementById("oifyear").value);
    setBmonth(document.getElementById("oifmonth").value);
    setBday(document.getElementById("oifday").value);
  }

  function sendData(e) {
    e.preventDefault();

    const newOtherIncomeFinScheema = {
      billId,
      byear,
      bmonth,
      bday,
      bpayee,
      bprice,
      bdescription,
      bbranch,
    };

    axios
      .post(
        "http://localhost:8070/OtherIncomeFin/add",
        newOtherIncomeFinScheema
      )
      .then(() => {
        swal("Good job!", "Data Inserted !", "success");
        setTimeout(function () {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        alert(err);
      });
  }

  useEffect(() => setAutomatics(), []);

  return (
    <div className="OtherIncomeAddForm">
      <h3>Add Other Income Details </h3>
      <hr />
      <div>
        <Form onSubmit={sendData}>
          <Form.Group className="mb-3" controlId="formGridbillid">
            <Form.Label>Bill ID</Form.Label>
            <Form.Control
              required
              placeholder="Enter Bill ID"
              onChange={(e) => {
                setbillId(e.target.value);
              }}
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridYear">
              <Form.Label>Year</Form.Label>
              <Form.Control
                id="oifyear"
                type="text"
                placeholder="Year"
                value={d.getFullYear()}
                disabled
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridMonth">
              <Form.Label>Month</Form.Label>
              <Form.Control
                id="oifmonth"
                type="text"
                placeholder="Month"
                value={d.getMonth() + 1}
                disabled
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridDay">
              <Form.Label>Day</Form.Label>
              <Form.Control
                required
                min={1}
                max={31}
                id="oifday"
                type="number"
                placeholder="Day"
                onChange={(e) => {
                  setBday(e.target.value);
                }}
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="formGridPayee">
            <Form.Label>Payee</Form.Label>
            <Form.Control
              required
              placeholder="Enter Payee"
              onChange={(e) => {
                setBpayee(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              required
              placeholder="Enter price"
              onChange={(e) => {
                setBprice(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridDes">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              placeholder="Enter Description"
              onChange={(e) => {
                setBdescription(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridBranch">
            <Form.Label>Branch</Form.Label>
            <Form.Select id="oifbranch" defaultValue="MB01">
              <option>Panadura</option>
              <option>...</option>
            </Form.Select>
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

export default AddOtherIncome;
