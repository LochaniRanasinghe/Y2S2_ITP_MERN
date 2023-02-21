import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import "./OtherIncomeStyle.css";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const PrintOtherIncom = () => {
  const componentRef = useRef();

  //printing function
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
  const [dbid, setdbid] = useState("");

  const { id } = useParams();

  const d = new Date();

  const history = useNavigate();

  const getOtherIncomeDetail = () => {
    axios
      .get("http://localhost:8070/OtherIncomeFin/get/" + id)
      .then((res) => {
        const updateDetails = {
          dbid: res.data.OtherIncomeFin._id,
          billId: res.data.OtherIncomeFin.billId,
          byear: res.data.OtherIncomeFin.byear,
          bmonth: res.data.OtherIncomeFin.bmonth,
          bday: res.data.OtherIncomeFin.bday,
          bpayee: res.data.OtherIncomeFin.bpayee,
          bprice: res.data.OtherIncomeFin.bprice,
          bdescription: res.data.OtherIncomeFin.bdescription,
          bbranch: res.data.OtherIncomeFin.bbranch,
        };

        setdbid(updateDetails.dbid);
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

  useEffect(() => getOtherIncomeDetail(), []);

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
            Date : {byear}/{bmonth}/{bday}
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
          <h3>Thanks For Shopping..!</h3>
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

export default PrintOtherIncom;
