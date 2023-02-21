import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import {} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import "./ItemStyle.css";

const AddItem = () => {
  const [ItemID, setItemID] = useState("");
  const [ItemName, setItemName] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [ShelfID, setShelfID] = useState("");
  const [Location, setLocation] = useState("");
  const [SupplierID, setSupplierID] = useState("");

  //get data from wuwani
  const [supplierdetails, setSupplierdetails] = useState([]);

  function getAllDetails() {
    axios
      .get("http://localhost:8070/SupSupplier/")
      .then((res) => {
        setSupplierdetails(res.data);
        console.log(supplierdetails);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  useEffect(() => getAllDetails(), []);

  function sendData(e) {
    e.preventDefault();

    const invItemSchema = {
      ItemID,
      ItemName,
      Quantity,
      ShelfID,
      Location,
      SupplierID,
    };

    axios
      .post("http://localhost:8070/InvItem/add", invItemSchema)
      .then(() => {
        // alert("Data Inserted!");
        // window.location.reload(false);
        swal("Good job!", "Data Inserted !", "success");
        setTimeout(function () {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        alert(err);
      });
  }

  function setAuto() {
    setLocation(document.getElementById("InvLocation").value);
  }

  useEffect(() => setAuto(), []);

  return (
    <Container>
      <div className="ItemAddForm">
        <h3>Add Item Details</h3>
        <hr />
        <div>
          <Form onSubmit={sendData}>
            {/* <Form.Group className="mb-3" controlId="formGridbillid">
              <Form.Label>Item ID</Form.Label>
              <Form.Control
                required
                placeholder="Enter Item ID"
                onChange={(e) => {
                  setItemID(e.target.value);
                }}
              />
            </Form.Group> */}

            <Form.Group className="mb-3" controlId="formGridbillid">
              <Form.Label>Item ID</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setItemID(e.target.value);
                }}
              >
                {supplierdetails.map((supplierdetailsVal) => (
                  <option>{supplierdetailsVal.itemID}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridbillid">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                required
                placeholder="Enter Item Name"
                onChange={(e) => {
                  setItemName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridbillid">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Enter Quantity"
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridbillid">
              <Form.Label>Shelf ID</Form.Label>
              <Form.Control
                required
                placeholder="Enter Shelf ID"
                onChange={(e) => {
                  setShelfID(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridbillid">
              <Form.Label>Location</Form.Label>
              <Form.Select
                id="InvLocation"
                defaultValue="Stocks"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              >
                <option>Stocks</option>
                <option>Showroom</option>
              </Form.Select>
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formGridbillid">
              <Form.Label>Supplier ID</Form.Label>
              <Form.Control
                required
                placeholder="Enter Supplier ID"
                onChange={(e) => {
                  setSupplierID(e.target.value);
                }}
              />
            </Form.Group> */}

            <Form.Group className="mb-3" controlId="formGridbillid">
              <Form.Label>Supplier ID</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setSupplierID(e.target.value);
                }}
              >
                {supplierdetails.map((supplierdetailsVal) => (
                  <option>{supplierdetailsVal.sipplierID}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <hr />
            {/* <Link to={"/itemdetails/view"}> */}
            <Button variant="outline-success" type="submit">
              Submit
            </Button>
            {/* </Link> */}
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default AddItem;
