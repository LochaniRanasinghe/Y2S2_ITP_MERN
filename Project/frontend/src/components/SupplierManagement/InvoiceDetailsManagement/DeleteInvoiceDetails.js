import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert';

import "./InvoiceDetailStyles.css";

const DeleteInvoiceDetails = () => {

  const [invoiceID, setinvoiceID] = useState("");
  const [invcDate, setinvcDate] = useState("");
  const [supID, setsupID] = useState("");
  const [itemID, setitemID] = useState("");
  const [quantity, setquantity] = useState("");
  const [unitPrice, setunitPrice] = useState("");
  const [description, setdescription] = useState("");
  const [Amount, setAmount] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const getinvoicedetails = () => {
    axios
      .get("http://localhost:8070/SupInvoice/get/" + id)
      .then((res) => {
        const updateDetails = {
          invoiceID: res.data.invoice.invoiceID,
          invcDate: res.data.invoice.invcDate,
          supID: res.data.invoice.supID,
          itemID: res.data.invoice.itemID,
          quantity: res.data.invoice.quantity,
          unitPrice: res.data.invoice.unitPrice,
          description: res.data.invoice.description,
          Amount: res.data.invoice.Amount,


        };

        setinvoiceID(updateDetails.invoiceID);
        setinvcDate(updateDetails.invcDate);
        setsupID(updateDetails.supID);
        setitemID(updateDetails.itemID);
        setquantity(updateDetails.quantity);
        setunitPrice(updateDetails.unitPrice);
        setdescription(updateDetails.description);
        setAmount(updateDetails.Amount);


      })
      .catch((err) => {
        alert(err.message);
      });
  };

  function deleteDetails(id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        //true
        axios
        .delete("http://localhost:8070/SupInvoice/delete/" + id)
        .then((res) => {
          swal("Poof! Your data has been deleted!", {
            icon: "success",
          });
          setTimeout(function(){
            navigate("/invoicedetails")
          },2000);
          
        })
        .catch((err) => {
          alert(err.message);
        })
        
      } else {
        swal("Your data is safe!");
        setTimeout(function(){
          navigate("/invoicedetails")
        },1000);
      }
    });
  }

  useEffect(() => getinvoicedetails(), []);


  return (
    <div className="deleteinvoicedetailform">
      <h3>Delete invoice details </h3>
      <hr />
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="formGridinvoiceid">
            <Form.Label>Invoice ID</Form.Label>
            <Form.Control placeholder="Enter Invoice ID"
              defaultValue={invoiceID} disabled
              onChange={(e) =>
                setinvoiceID(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridDate">
            <Form.Label>Date</Form.Label>
            <Form.Control placeholder="Year/Month/Date"
              defaultValue={invcDate} disabled
              onChange={(e) =>
                setinvcDate(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridsupplierid">
            <Form.Label>Supplier ID</Form.Label>
            <Form.Control placeholder="Enter supplier ID"
              defaultValue={supID} disabled
              onChange={(e) =>
                setsupID(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGriditemid">
            <Form.Label>Item ID</Form.Label>
            <Form.Control placeholder="Enter item ID"
              defaultValue={itemID} disabled
              onChange={(e) =>
                setitemID(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridquantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control placeholder="Enter Quantity"
              defaultValue={quantity} disabled
              onChange={(e) =>
                setquantity(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formGridunitprice">
            <Form.Label>Unit Price</Form.Label>
            <Form.Control placeholder="Enter unit price"
              defaultValue={unitPrice} disabled
              onChange={(e) =>
                setunitPrice(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formGridamount">
            <Form.Label>Amount</Form.Label>
            <Form.Control placeholder="Enter Amount"
              defaultValue={Amount} disabled
              onChange={(e) =>
                setAmount(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formGridudescription">
            <Form.Label>Description</Form.Label>
            <Form.Control placeholder="Enter Description"
              defaultValue={description} disabled
              onChange={(e) =>
                setdescription(e.target.value)} />
          </Form.Group>


          <hr />
          <div className="submitbutton">
            <Button variant="outline-danger"
              onClick={() =>
                deleteDetails(id)}>
              DELETE
            </Button></div>

        </Form>
      </div>
    </div>
  );
};

export default DeleteInvoiceDetails; 