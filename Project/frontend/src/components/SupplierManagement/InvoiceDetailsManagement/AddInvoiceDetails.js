import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

import "./InvoiceDetailStyles.css";

const AddInvoiceDetails = () => {
  const navigate = useNavigate();

//from supplier details

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

  useEffect(() => getAllDetails());


  const [invoiceID, setinvoiceID] = useState("");
  const [invcDate, setinvcDate] = useState("");
  const [supID, setsupID] = useState("");
  const [itemID, setitemID] = useState("");
  const [quantity, setquantity] = useState("");
  const [unitPrice, setunitPrice] = useState("");
  const [description, setdescription] = useState("");
  const [Amount, setAmount] = useState("");
  const [totAmount, settotAmount] = useState("");

  function sendData(e) {
    e.preventDefault();

    const newInvoiceSchema = {
      invoiceID,
      invcDate,
      supID,
      itemID,
      quantity,
      unitPrice,
      description,
      Amount,
      totAmount,
    };

    axios
      .post("http://localhost:8070/SupInvoice/add", newInvoiceSchema)

      .then(() => {    
        swal("Good job!", "Invoice added successfully!", "success");
        setTimeout(function(){
          navigate("/invoicedetails")
        },2000);
          
        
      }).catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="invoicedetailform">
      <h3>Add invoice details </h3>
      <hr />
      <div>
        <Form onSubmit={sendData}>
          <Form.Group className="mb-3" controlId="formGridinvoiceid">
            <Form.Label>Invoice ID</Form.Label>
            <Form.Control
              placeholder="Enter Invoice ID"
              required
              onChange={(e) => {
                setinvoiceID(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridDate">
            <Form.Label>Date</Form.Label>
            <Form.Control placeholder="select date" type="date" required
              onChange={(e) => {
                setinvcDate(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridbillid">
              <Form.Label>Supplier ID</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setsupID(e.target.value);
                }}
              >
                {supplierdetails.map((supplierdetailsVal) => (
                <option>{supplierdetailsVal.sipplierID}</option>
                ))}
              </Form.Select>
            </Form.Group>

           

          <Form.Group className="mb-3" controlId="formGridbillid">
              <Form.Label>Item ID</Form.Label>
              <Form.Select
                onChange={(e) => {
                  setitemID(e.target.value);
                }}
              >
                {supplierdetails.map((supplierdetailsVal) => (
                  <option>{supplierdetailsVal.itemID}</option>
                ))}
              </Form.Select>
            </Form.Group>

          

          <Form.Group className="mb-3" controlId="formGridquantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              placeholder="Enter Quantity"
              required
              onChange={(e) => {
                setquantity(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridunitprice">
            <Form.Label>Unit Price</Form.Label>
            <Form.Control
              placeholder="Enter unit price"
              required
              onChange={(e) => {
                setunitPrice(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridudescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              placeholder="Enter Description"
              required
              onChange={(e) => {
                setdescription(e.target.value);
                setAmount(unitPrice * quantity);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridamount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              placeholder="Enter Amount"
              required
              defaultValue={Amount}
              disabled
              // onChange={(e) => {
              //   setAmount(e.target.value);
              // }}
            />
          </Form.Group>
 
          <hr />
          <div className="submitbutton">
            <Button variant="outline-success" type="submit">
              SUBMIT
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddInvoiceDetails;
