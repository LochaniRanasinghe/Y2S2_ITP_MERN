import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {} from "react-router-dom";

import "./customerbills.css";
import swal from 'sweetalert';

const GetAllCustomerBil = () => {
  // const d = new Date();


  //get details form Pormotional mangement
  const [AllPromotions, setAllPromotions] = useState([]);
  function getAllPromotions() {
    axios
      .get("http://localhost:8070/OfferInfo/")
      .then((res) => {
        setAllPromotions(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  useEffect(() => getAllPromotions(),[]);

  const [BillID, setBillID] = useState("");
  const [Name, setName] = useState("");
  const [NIC, setNIC] = useState("");
  const [price, setPrice] = useState("");
  const [BilYear, setBilYear] = useState("");
  const [BilMonth, setBilMonth] = useState("");
  const [BilDate, setBilDate] = useState("");
  const [Branch, setBranch] = useState("");
  const [PromoCode, setPromoCode] = useState("");
  const [SerialNo, setSerialNo] = useState("");
  const [ProductID, setProductID] = useState("");

  function sendData(e) {
    e.preventDefault();

    const CusBillSchema = {
      BillID,
      Name,
      NIC,
      price,
      BilYear,
      BilMonth,
      BilDate,
      Branch,
      PromoCode,
      SerialNo,
      ProductID,
    };

    axios
      .post("http://localhost:8070/CusBill/add", CusBillSchema)
      .then(() => {
        swal("inserted!", "Data Inserted!", "success");
        
        window.location.reload(false);
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <Container>
      <div className="OtherExpenAddForm">
        <h3>Add Bill Details </h3>
        <hr />
        <div>
          <Form onSubmit={sendData}>
            <Form.Group className="mb-3" controlId="formGridbillid">
              <Form.Label>Bill ID</Form.Label>
              <Form.Control
                placeholder="Enter Bill ID"
                required
                onChange={(e) => {
                  setBillID(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="Enter Name"
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridYear">
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Year"
                  required
                  // defaultValue={d.getFullYear()}
                  onChange={(e) => {
                    setBilYear(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridMonth">
                <Form.Label>Month</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Month"
                  min={1}
                  max={12}
                  required
                  // defaultValue={d.getMonth()}
                  onChange={(e) => {
                    setBilMonth(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridDay">
                <Form.Label>Day</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Day"
                  min={1}
                  max={31}
                  required
                  // defaultValue={d.getDate()}
                  onChange={(e) => {
                    setBilDate(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="formGridNIC">
              <Form.Label>NIC</Form.Label>
              <Form.Control
                placeholder="Enter NIC"
                required
                onChange={(e) => {
                  setNIC(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                placeholder="Enter price"
                required
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </Form.Group>
           
           {/* // have to change to get promocodes from lochi branch */}
            <Form.Group className="mb-3" controlId="formGridPromocode">
              <Form.Label>PromoCode</Form.Label>
              <Form.Select
              required
              onChange={(e) => {
                setPromoCode(e.target.value);
              }}
            >
              <option>None</option>
              {AllPromotions.map((AllPromotionsVal) => (
                
                <option>{AllPromotionsVal.promotionId}</option>
                ))}
              
              
            </Form.Select>
            
            {/* <Form.Control
                placeholder="Enter Promocode"
                onChange={(e) => {
                  setPromoCode(e.target.value);
                }}
              /> */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridSN">
              <Form.Label>Serial Number</Form.Label>
              <Form.Control
                placeholder="Enter Serial Number"
                required
                onChange={(e) => {
                  setSerialNo(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridProID">
              <Form.Label>ProductID</Form.Label>
              <Form.Control
                placeholder="Enter price"
                required
                onChange={(e) => {
                  setProductID(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridBranch">
              <Form.Label>Branch</Form.Label>
              <Form.Control
                placeholder="Enter Branch"
                required
                onChange={(e) => {
                  setBranch(e.target.value);
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

export default GetAllCustomerBil;
