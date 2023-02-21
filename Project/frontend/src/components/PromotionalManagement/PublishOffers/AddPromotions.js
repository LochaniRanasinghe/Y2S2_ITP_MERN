import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./PublishOffers.css";
import axios from "axios";
import swal from "sweetalert";


const AddPromotions = () => {
  // declaring variables(1)
  const [promotionId, setpromotionId] = useState("");
  const [promotionName, setpromotionName] = useState("");
  const [promoDescription, setpromoDescription] = useState("");
  const [discountPercentage, setdiscountPercentage] = useState("");
  const [issuedYear, setissuedYear] = useState("");
  const [issuedMonth, setissuedMonth] = useState("");
  const [issuedDate, setissuedDate] = useState("");
  const [dueYear, setdueYear] = useState("");
  const [dueMonth, setdueMonth] = useState("");
  const [dueDate, setdueDate] = useState("");
  const [promoConditions, setpromoConditions] = useState("");

  // creating a function to send data to the backend(3)
  function sendData(e) {
    e.preventDefault();
    console.log("Test");

    // creating an object inside the function(4)
    const newProOfferInfo = {
      promotionId,
      promotionName,
      promoDescription,
      discountPercentage,
      issuedYear,
      issuedMonth,
      issuedDate,
      dueYear,
      dueMonth,
      dueDate,
      promoConditions,
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this record?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    axios
      .post(
        // parameter1-which URL of the backend(5),parameter2-passing the object(6)
        "http://localhost:8070/OfferInfo/add",
        newProOfferInfo
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
    <div className="promotionForm">
      <h3>Publish Offers </h3>
      <hr />
      <div>
        <Form onSubmit={sendData}>
          <Form.Group className="mb-3" controlId="formGridpromotionid">
            <Form.Label>Promotion ID</Form.Label>
            <Form.Control
              placeholder="Enter Promotion ID"
              required
              // declaring values to the variable by triggering on change(2)
              onChange={(e) => {
                setpromotionId(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridpromotionname">
            <Form.Label>Promotion Type</Form.Label>
            <Form.Select
              required
              onChange={(e) => {
                setpromotionName(e.target.value);
              }}
            >
              <option>Seasonal Offers</option>
              <option>Student Discounts</option>
              <option>Joint promotions</option>
              <option>Cashback Promotions</option>
              <option>Loyalty Rewards</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridpromotiondes">
            <Form.Label>Promotion Description</Form.Label>
            <Form.Control
              placeholder="Enter Promotion Description"
              required
              onChange={(e) => {
                setpromoDescription(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGriddiscount">
            <Form.Label>Promotion Discount</Form.Label>
            <Form.Control
              placeholder="Enter Discount"
              type="number"
              required
              onChange={(e) => {
                setdiscountPercentage(e.target.value);
              }}
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridYear">
              <Form.Label>Issued Year</Form.Label>
              <Form.Control
                type="number"
                pattern="[0-9]{4}"
                placeholder="Year"
                required
                onChange={(e) => {
                  setissuedYear(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridMonth">
              <Form.Label>Issued Month</Form.Label>
              <Form.Select
                required
                onChange={(e) => {
                  setissuedMonth(e.target.value);
                }}
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

            <Form.Group as={Col} controlId="formGridDay">
              <Form.Label>Issued Day</Form.Label>
              <Form.Control
                type="number"
                placeholder="Day"
                min={1}
                max={31}
                required
                onChange={(e) => {
                  setissuedDate(e.target.value);
                }}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridDueYear">
              <Form.Label>Due Year</Form.Label>
              <Form.Control
                placeholder="Year"
                type="number"
                pattern="[0-9]{4}"
                required
                onChange={(e) => {
                  setdueYear(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridDueMonth">
              <Form.Label>Due Month</Form.Label>
              <Form.Select
                required
                onChange={(e) => {
                  setdueMonth(e.target.value);
                }}
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

            <Form.Group as={Col} controlId="formGridDueDay">
              <Form.Label>Due Day</Form.Label>
              <Form.Control
                type="number"
                placeholder="Day"
                min={1}
                max={31}
                required
                onChange={(e) => {
                  setdueDate(e.target.value);
                }}
              />
            </Form.Group>
          </Row>

          <Form.Group as={Col} controlId="formGridConditions">
            <Form.Label>Promotion Conditions</Form.Label>
            <Form.Control
              placeholder="Enter Promotion Conditions"
              required
              onChange={(e) => {
                setpromoConditions(e.target.value);
              }}
            />
          </Form.Group>

          <hr />
          <Button variant="success" type="submit">
            Submit
          </Button>
          <Link to={"/mainpromotionpage/viewpromo"}>
            <p></p>
            <Button variant="primary" type="submit">
              View All Promotions
            </Button>
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default AddPromotions;
