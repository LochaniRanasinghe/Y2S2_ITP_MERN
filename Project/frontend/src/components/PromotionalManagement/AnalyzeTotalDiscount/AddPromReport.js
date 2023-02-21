import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./PromReport.css";
import axios from "axios";
import swal from "sweetalert";


const AddPromReport = () => {
  // declaring variables
  const [customerId, setcustomerId] = useState("");
  const [billId, setbillId] = useState("");
  const [billYear, setbillYear] = useState("");
  const [billMonth, setbillMonth] = useState("");
  const [billDate, setbillDate] = useState("");
  const [promotionId, setpromotionId] = useState("");
  const [promotionName, setpromotionName] = useState("");
  const [discountAmount, setdiscountAmount] = useState("");

  // creating a function to send data to the backend(3)
  function sendData(e) {
    e.preventDefault();
    console.log("Test");

    // creating an object inside the function(4)
    const newProReportInfo = {
      customerId,
      billId,
      billYear,
      billMonth,
      billDate,
      promotionId,
      promotionName,
      discountAmount,
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this record?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
    
    axios
      .post(
        // parameter1-which URL of the backend(5),parameter2-passing the object(6)
        "http://localhost:8070/ProReport/add",
        newProReportInfo
      )
      .then(() => {
        swal("Data Insert!", "Your record has been Inserted!", {
          icon: "success",
         //  window.location.reload(false);
        });
        setTimeout(function () {
          window.location.reload();
        }, 1200);
      })
      .catch((err) => {
        alert(err);
      });
  }


  return (
    <div className="promReportForm">
      <h3>Add Offfer-Rewarded Customer Details </h3>
      <hr />
      <div>
        <Form onSubmit={sendData}>
          <Form.Group className="mb-3" controlId="formGridcusid">
            <Form.Label>Customer ID</Form.Label>
            <Form.Control
              placeholder="Enter Customer ID"
              required
              onChange={(e) => {
                setcustomerId(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridBillid">
            <Form.Label>Bill ID</Form.Label>
            <Form.Control
              placeholder="Enter Bill ID"
              required
              onChange={(e) => {
                setbillId(e.target.value);
              }}
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formYear">
              <Form.Label>Bill Year</Form.Label>
              <Form.Control
                type="number"
                placeholder="Year"
                pattern="[0-9]{4}"
                required
                onChange={(e) => {
                  setbillYear(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formMonth">
              <Form.Label>Bill Month</Form.Label>
              <Form.Select
                required
                onChange={(e) => {
                  setbillMonth(e.target.value);
                }}
            
                defaultValue=""
              >
                <option>01</option>
                <option>02</option>
                <option>03</option>
                <option>04</option>
                <option>05</option>
                <option>06</option>
                <option>07</option>
                <option>08</option>
                <option>09</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formDay">
              <Form.Label>Bill Day</Form.Label>
              <Form.Control
                type="number"
                placeholder="Day"
                min={1}
                max={31}
                required
                onChange={(e) => {
                  setbillDate(e.target.value);
                }}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formPid">
            <Form.Label>Promotion ID</Form.Label>
            <Form.Control
              placeholder="Enter Promotion ID"
              required
              onChange={(e) => {
                setpromotionId(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPtype">
            <Form.Label>Promotion Type</Form.Label>
            <Form.Select
              required
              onChange={(e) => {
                setpromotionName(e.target.value);
              }}
              defaultValue=""
            >
              <option>Seasonal Offers</option>
              <option>Student Discounts</option>
              <option>Joint promotions</option>
              <option>Cashback Promotions</option>
              <option>Loyalty Rewards</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAmount">
            <Form.Label>Discount Amount</Form.Label>
            <Form.Control
              placeholder="Enter Discount Amount"
              required
              onChange={(e) => {
                setdiscountAmount(e.target.value);
              }}
            />
          </Form.Group>

          <hr />

          <Button class="button2" variant="success" type="submit">
            Submit
          </Button>

          <p></p>
          <Link to={"/mainpromreport/viewpReport"}>
            <Button variant="primary" type="submit">
              View All Rewards
            </Button>
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default AddPromReport;
