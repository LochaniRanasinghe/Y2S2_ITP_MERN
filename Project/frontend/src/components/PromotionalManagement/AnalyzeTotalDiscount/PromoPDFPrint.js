import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import "./PromReport.css";

const PromoPDFPrint = () => {
  const d = new Date();

  const history = useNavigate();

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Discount Invoice",
    onAfterPrint: () => history(-1),
  });

  const [customerId, setcustomerId] = useState("");
  const [billId, setbillId] = useState("");
  const [billYear, setbillYear] = useState("");
  const [billMonth, setbillMonth] = useState("");
  const [billDate, setbillDate] = useState("");
  const [promotionId, setpromotionId] = useState("");
  const [promotionName, setpromotionName] = useState("");
  const [discountAmount, setdiscountAmount] = useState("");
  const [dbid, setDbid] = useState("");

  const { id } = useParams();

  const getPromReport = () => {
    // calling data in the backend from frontend
    axios
      .get("http://localhost:8070/ProReport/get/" + id)
      .then((res) => {
        const updateReport = {
          dbid: res.data.ProReports._id,
          customerId: res.data.ProReports.customerId,
          billId: res.data.ProReports.billId,
          billYear: res.data.ProReports.billYear,
          billMonth: res.data.ProReports.billMonth,
          billDate: res.data.ProReports.billDate,
          promotionId: res.data.ProReports.promotionId,
          promotionName: res.data.ProReports.promotionName,
          discountAmount: res.data.ProReports.discountAmount,
        };

        setDbid(updateReport.dbid);
        setcustomerId(updateReport.customerId);
        setbillId(updateReport.billId);
        setbillYear(updateReport.billYear);
        setbillMonth(updateReport.billMonth);
        setbillDate(updateReport.billDate);
        setpromotionId(updateReport.promotionId);
        setpromotionName(updateReport.promotionName);
        setdiscountAmount(updateReport.discountAmount);
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
            Discount Info <br></br>
          </h3>
          <p>DB ID : {dbid}</p>
        </div>

        <div className="tablePrint">
          <Table responsive="xl" bordered>
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Bill ID</th>
                <th>Bill Date</th>
                <th>Promotion ID</th>
                <th>Promotion Type</th>
                <th>Discount Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{customerId}</td>
                <td>{billId}</td>
                <td>
                  {billYear}/{billMonth}/{billDate}
                </td>
                <td>{promotionId}</td>
                <td>{promotionName}</td>
                <td>{discountAmount}</td>
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

export default PromoPDFPrint;
