import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import {
  unstable_HistoryRouter,
  useNavigate,
  useParams,
} from "react-router-dom";
import "./customerbills.css";
import { useReactToPrint } from "react-to-print";

const CustomerBillPrint = () => {
  const history = useNavigate();
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Invoce",
    onAfterPrint: () => history(-1),
  });

  const d = new Date();

  const { id } = useParams();

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

  const getAllCustomerBills = () => {
    axios
      .get("http://localhost:8070/CusBill/get/" + id)
      .then((res) => {
        const UpdateDeleteCustomerBills = {
          BillID: res.data.cusBill.BillID,
          Name: res.data.cusBill.Name,
          NIC: res.data.cusBill.NIC,
          price: res.data.cusBill.price,
          BilYear: res.data.cusBill.BilYear,
          BilMonth: res.data.cusBill.BilMonth,
          BilDate: res.data.cusBill.BilDate,
          Branch: res.data.cusBill.Branch,
          PromoCode: res.data.cusBill.PromoCode,
          SerialNo: res.data.cusBill.SerialNo,
          ProductID: res.data.cusBill.ProductID,
        };

        console.log(res);

        setBillID(UpdateDeleteCustomerBills.BillID);
        setName(UpdateDeleteCustomerBills.Name);
        setNIC(UpdateDeleteCustomerBills.NIC);
        setPrice(UpdateDeleteCustomerBills.price);
        setBilYear(UpdateDeleteCustomerBills.BilYear);
        setBilMonth(UpdateDeleteCustomerBills.BilMonth);
        setBilDate(UpdateDeleteCustomerBills.BilDate);
        setBranch(UpdateDeleteCustomerBills.Branch);
        setPromoCode(UpdateDeleteCustomerBills.PromoCode);
        setSerialNo(UpdateDeleteCustomerBills.SerialNo);
        setProductID(UpdateDeleteCustomerBills.ProductID);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => getAllCustomerBills(), []);

  return (
    <Container className="printFormBill">
      <div className="billPrintOut" ref={componentRef}>
        <div className="compdetails">
          <p>
            Wireless Waves <br></br>
            011-2955152<br></br>
            wirelesswaves@gmail.com<br></br>
            123,Adresss,adress
          </p>
        </div>

        <div className="billcusdetails">
          <p>
            Customer Name : {Name}
            <br></br>
            Bill ID : {BillID}
            <br></br>
            Date : {BilYear} / {BilMonth} / {BilDate}
            <br></br>
            Branch : {Branch}
            <br></br>
          </p>
        </div>

        <div className="billprinttable">
          <Table responsive="xl" bordered>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>SerialNo</th>
                <th>Promo Code</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{ProductID}</td>
                <td>{SerialNo}</td>
                <td>{PromoCode}</td>
                <td>{price}</td>
              </tr>
            </tbody>
          </Table>
        </div>

        <div>
          {/* <p>
            Bill Date : {d.getFullYear()}/{d.getMonth()}/{d.getDate()}
            <br></br>
            Bill Time : {d.getHours()} : {d.getMinutes()} : {d.getSeconds()}
            <br></br>
          </p> */}
          <h3>Thanks For Shopping...!</h3>
        </div>
      </div>

      <Row>
        <Button onClick={handlePrint}>Print</Button>
      </Row>
    </Container>
  );
};

export default CustomerBillPrint;
