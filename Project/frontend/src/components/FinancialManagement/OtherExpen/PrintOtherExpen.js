import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import "./OtherIExpenStyle.css";
import { useReactToPrint } from "react-to-print";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const PrintOtherExpen = () => {
  const d = new Date();
  const componentRef = useRef();
  const history = useNavigate();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Invoce",
    onAfterPrint: () => history(-1),
  });

  const [billId, setbillId] = useState("");
  const [byear, setByear] = useState("");
  const [bmonth, setBmonth] = useState("");
  const [bday, setBday] = useState("");
  const [bpayee, setBpayee] = useState("");
  const [bprice, setBprice] = useState("");
  const [bdescription, setBdescription] = useState("");
  const [bbranch, setBbranch] = useState("");
  const [dbid, setDbid] = useState("");

  const { id } = useParams();

  const getOtherExpenDetail = () => {
    axios
      .get("http://localhost:8070/OtherExpenFin/get/" + id)
      .then((res) => {
        const updateDetails = {
          dbid: res.data.OtherExpenFin._id,
          billId: res.data.OtherExpenFin.billId,
          byear: res.data.OtherExpenFin.byear,
          bmonth: res.data.OtherExpenFin.bmonth,
          bday: res.data.OtherExpenFin.bday,
          bpayee: res.data.OtherExpenFin.bpayee,
          bprice: res.data.OtherExpenFin.bprice,
          bdescription: res.data.OtherExpenFin.bdescription,
          bbranch: res.data.OtherExpenFin.bbranch,
        };

        setDbid(updateDetails.dbid);
        setbillId(updateDetails.billId);
        setByear(updateDetails.byear);
        setBmonth(updateDetails.bmonth);
        setBday(updateDetails.bday);
        setBpayee(updateDetails.bpayee);
        setBprice(updateDetails.bprice);
        setBdescription(updateDetails.bdescription);
        setBbranch(updateDetails.bbranch);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => getOtherExpenDetail(), []);

  return (
    <Container className="printFormOut">
      <div className="oidprintMain" ref={componentRef}>
        <div className="compdetails">
          <p1>Wireless Waves</p1>
          <br></br>
          <p3>011-2955152</p3>
          <br></br>
          <p3>wirelesswaves@gmail.com</p3>
          <br></br>
          <p3>123,Adreess,Adress</p3>
        </div>

        <div className="bpayeedetails">
          <p1>{bpayee}</p1>
          <br></br>
          <p3>DB ID : {dbid}</p3>
          <br></br>
          <p3>bill ID : {billId}</p3>
          <br></br>
          <p3>
            Date : {byear}/{bmonth}/{bday}{" "}
          </p3>
          <br></br>
          <p3>Branch : {bbranch}</p3>
        </div>

        <div className="bpayeeTable">
          <Table responsive="xl" bordered>
            <thead>
              <tr>
                <th>Description</th> <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{bdescription}</td>
                <td>{bprice}</td>
              </tr>
            </tbody>
          </Table>
        </div>

        <div>
          <p>
            Printing Date : {d.getFullYear()}/{d.getMonth() + 1}/{d.getDate()}
            <br></br>[ {d.getHours()}:{d.getMinutes()}:{d.getSeconds()} ]
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

export default PrintOtherExpen;
