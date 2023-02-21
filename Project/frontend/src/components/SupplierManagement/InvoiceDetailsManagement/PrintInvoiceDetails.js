import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import "./InvoiceDetailStyles.css";

const PrintInvoiceDetails = () => {
  const d = new Date();

  const history = useNavigate();

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Supplier Invoice",
    onAfterPrint: () => history(-1),
  });

  const [invoiceID, setinvoiceID] = useState("");
  const [invcDate, setinvcDate] = useState("");
  const [supID, setsupID] = useState("");
  const [itemID, setitemID] = useState("");
  const [quantity, setquantity] = useState("");
  const [unitPrice, setunitPrice] = useState("");
  const [Amount, setAmount] = useState("");
  const [description, setdescription] = useState("");
  

  const { id } = useParams();

  const getPromReport = () => {
    // calling data in the backend from frontend
    axios
      .get("http://localhost:8070/SupInvoice/get/" + id)
      .then((res) => {
        const updateReport = {
            invoiceID: res.data.invoice.invoiceID,
            invcDate: res.data.invoice.invcDate,
            supID: res.data.invoice.supID,
            itemID: res.data.invoice.itemID,
            quantity: res.data.invoice.quantity,
            unitPrice: res.data.invoice.unitPrice,
            Amount: res.data.invoice.Amount,
            description: res.data.invoice.description,
        };

        setinvoiceID(updateReport.invoiceID);
        setinvcDate(updateReport.invcDate);
        setsupID(updateReport.supID);
        setitemID(updateReport.itemID);
        setquantity(updateReport.quantity);
        setunitPrice(updateReport.unitPrice);
        setdescription(updateReport.description);
        setAmount(updateReport.Amount);
        setdescription(updateReport.description);

      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => getPromReport(), []);
  return (
    <Container className="printmainCon">
      <div className="printoutbox" ref={componentRef}>
        <div>
          <p>
            Wireless Waves <br></br>
            011-2955152<br></br>
            wirelesswaves@gmail.com<br></br>
            123,Adresss,adress
          </p>
        </div>

        <div>
          <h3>
            Invoice  Info <br></br>
          </h3>
          <p>Invoice ID : {invoiceID}</p>
        </div>

        <div className="tablePrint">
          <Table responsive="xl" bordered>
            <thead>
              <tr>
              <th>InvoiceID</th>
                <th>Date</th>
                <th>SupID</th>
                                <th>ItemID</th>
                                <th>Quantity</th>
                                <th>UnitPrice</th>
                                <th>Amount</th>
                                <th>Description</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{invoiceID}</td>
                <td>{invcDate}</td>
                <td>
                  {supID} 
                </td>
                <td>{itemID}</td>
                <td>{quantity}</td>
                <td>{unitPrice}</td>
                <td>{Amount}</td>
                <td>{description}</td>
              </tr>
            </tbody>
          </Table>
        </div>

        <div>
          <p>
            Print Date : {d.getFullYear()}/{d.getMonth()}/{d.getDate()}
            <br></br>
            Print Time :{d.getHours()} : {d.getMinutes()} : {d.getSeconds()}
            <br></br>
          </p>
        </div>
      </div>

      <Row style={{ margin: "10px" }}>
        <Button variant="outline-success" onClick={handlePrint}>
          Print
        </Button>
      </Row>
    </Container>
  );
};

export default PrintInvoiceDetails;