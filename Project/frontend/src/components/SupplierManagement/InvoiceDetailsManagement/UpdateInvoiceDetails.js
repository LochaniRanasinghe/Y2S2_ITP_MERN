import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert';

import "./InvoiceDetailStyles.css";

const UpdateInvoiceDetails = () => {

  const [invoiceID, setinvoiceID] = useState("");
  const [invcDate, setinvcDate] = useState("");
  const [supID, setsupID] = useState("");
  const [itemID, setitemID] = useState("");
  const [quantity, setquantity] = useState("");
  const [unitPrice, setunitPrice] = useState("");
  const [Amount, setAmount] = useState("");
  const [description, setdescription] = useState("");

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
          Amount: res.data.invoice.Amount,
          description: res.data.invoice.description,


        };

        setinvoiceID(updateDetails.invoiceID);
        setinvcDate(updateDetails.invcDate);
        setsupID(updateDetails.supID);
        setitemID(updateDetails.itemID);
        setquantity(updateDetails.quantity);
        setunitPrice(updateDetails.unitPrice);
        setAmount(updateDetails.Amount);
        setdescription(updateDetails.description);


      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => getinvoicedetails(), []);

  return (
    <div className="updateinvoicedetailform">
      <h3>Update invoice details </h3>
      <hr />
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="formGridinvoiceid">
            <Form.Label>Invoice ID</Form.Label>
            <Form.Control defaultValue={invoiceID} disabled />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridDate">
            <Form.Label>Date</Form.Label>
            <Form.Control defaultValue={invcDate.slice(0,10)} type="date"
              onChange={(e) =>
                setinvcDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridsupplierid">
            <Form.Label>Supplier ID</Form.Label>
            <Form.Control defaultValue={supID}
              onChange={(e) =>
                setsupID(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGriditemid">
            <Form.Label>Item ID</Form.Label>
            <Form.Control defaultValue={itemID}
              onChange={(e) =>
                setitemID(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridquantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control defaultValue={quantity}
              onChange={(e) =>
                setquantity(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formGridunitprice">
            <Form.Label>Unit Price</Form.Label>
            <Form.Control defaultValue={unitPrice}
              onChange={(e) =>
                setunitPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formGridamount">
            <Form.Label>Amount</Form.Label>
            <Form.Control defaultValue={Amount}
              onChange={(e) =>
                setAmount(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formGridudescription">
            <Form.Label>Description</Form.Label>
            <Form.Control defaultValue={description}
              onChange={(e) =>
                setdescription(e.target.value)}
            />
          </Form.Group>




          <hr />
          <div className="submitbutton">
            <Button variant="outline-success" type="submit"
              onClick={(e) => {
                e.preventDefault();

                const newinvoicedetailsSheema = {
                  invoiceID,
                  invcDate,
                  supID,
                  itemID,
                  quantity,
                  unitPrice,
                  Amount,
                  description,

                };

                console.log(newinvoicedetailsSheema);

                axios
                  .put("http://localhost:8070/SupInvoice/update/" + id,
                    newinvoicedetailsSheema
                  )

                  .then(() => {
                    swal("Good job!", "Invoice Data Updated!", "success");
                    setTimeout(function(){
                      navigate("/invoicedetails")
                    },2000);
                   
                  })
                  .catch((err) => {
                    alert(err);
                  });
 
              }}
            >
              UPDATE
            </Button></div>

        </Form>
      </div>
    </div>
  );
};

export default UpdateInvoiceDetails; 