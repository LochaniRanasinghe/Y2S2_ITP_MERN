import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import {} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import "./ProductStyle.css";

const AddProduct = () => {
  const [ID, setID] = useState("");
  const [Name, setName] = useState("");
  const [Price, setPrice] = useState("");
  const [Model, setModel] = useState("");
  const [YearOfManufactured, setYearOfManufactured] = useState("");
  const [WarrantyPeriod, setWarrantyPeriod] = useState("");
  const [SupplierID, setSupplierID] = useState("");

  //get data from wuwani
  const [supplierdetails, setSupplierdetails] = useState([]);

  function getAllDetails() {
    axios
      .get("http://localhost:8070/SupSupplier/")
      .then((res) => {
        setSupplierdetails(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  useEffect(() => getAllDetails(), []);

  function sendData(e) {
    e.preventDefault();

    const invProductSchema = {
      ID,
      Name,
      Price,
      Model,
      YearOfManufactured,
      WarrantyPeriod,
      SupplierID,
    };

    axios
      .post("http://localhost:8070/InvProduct/add", invProductSchema)
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

  return (
    <Container>
      <div className="ProductAddForm">
        <h3>Add Product Details</h3>
        <hr />
        <div>
          <Form onSubmit={sendData}>
            <Form.Group className="mb-3" controlId="formGridbillid">
              <Form.Label>Product ID</Form.Label>
              <Form.Control
                required
                placeholder="Enter Product ID"
                onChange={(e) => {
                  setID(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridbillid">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                required
                placeholder="Enter Product Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridbillid">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Enter Price"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridbillid">
              <Form.Label>Product Model</Form.Label>
              <Form.Control
                required
                placeholder="Enter Product Model"
                onChange={(e) => {
                  setModel(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridbillid">
              <Form.Label>Year of Manufactured</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Enter Year of Manufactured"
                onChange={(e) => {
                  setYearOfManufactured(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridbillid">
              <Form.Label>Warranty Period</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Enter Warranty Period"
                onChange={(e) => {
                  setWarrantyPeriod(e.target.value);
                }}
              />
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
            {/* <Link to={"/productdetails/view"}> */}
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

export default AddProduct;
