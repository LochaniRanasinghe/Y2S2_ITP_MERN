import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Form,
  InputGroup,
  ProgressBar,
  Row,
  Table,
} from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import "./FinStatics.css";

import { PieChart, Pie, Cell } from "recharts";

const FinCalculation = () => {
  const [otherIncomDetails, setOtherIncomDetails] = useState([]);
  const [customerbilldetails, setcustomerbilldetails] = useState([]);
  const [finYear, setFinYear] = useState("");
  const [finMonth, setFinMonth] = useState("");

  const [totalincome, setTotalincome] = useState(0);
  const [totalOincome, setTotalOincome] = useState(0);
  const [totmonin, setTotmonin] = useState(0);

  const [otherExpenDetails, setOtherExpenDetails] = useState([]);
  const [invoicedetails, setInvoicedetails] = useState([]);

  const [totalexpen, setTotalexpen] = useState(0);
  const [totalOexpen, settotalOexpen] = useState(0);
  const [totmonex, setTotmonex] = useState(0);

  const [finalprofit, setFinalprofit] = useState(0);

  const componentRef = useRef();

  //printing function
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Finance Report",
  });

  function getAllOtherIncome() {
    //get all other income details from db
    axios
      .get("http://localhost:8070/otherIncomeFin/")
      .then((res) => {
        setOtherIncomDetails(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function getAllCustomerBills() {
    //get all cusbills
    axios
      .get("http://localhost:8070/CusBill/")
      .then((res) => {
        setcustomerbilldetails(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function calcprofits(e) {
    e.preventDefault();
    //calculate total other incom
    let totalOi = 0;
    let totalMi = 0;

    for (let i = 0; i < otherIncomDetails.length; i++) {
      if (
        parseInt(otherIncomDetails[i].byear) === parseInt(finYear) &&
        parseInt(otherIncomDetails[i].bmonth) === parseInt(finMonth)
      ) {
        totalOi = totalOi + parseFloat(otherIncomDetails[i].bprice);
      }
    }
    for (let i = 0; i < customerbilldetails.length; i++) {
      if (
        parseInt(customerbilldetails[i].BilYear) === parseInt(finYear) &&
        parseInt(customerbilldetails[i].BilMonth) === parseInt(finMonth)
      ) {
        totalMi = totalMi + parseFloat(customerbilldetails[i].price);
      }
    }

    //calc total expenditures
    let totalOe = 0;
    let totalMe = 0;

    for (let i = 0; i < otherExpenDetails.length; i++) {
      if (
        parseInt(otherExpenDetails[i].byear) === parseInt(finYear) &&
        parseInt(otherExpenDetails[i].bmonth) === parseInt(finMonth)
      ) {
        totalOe = totalOe + parseFloat(otherExpenDetails[i].bprice);
      }
    }

    for (let i = 0; i < invoicedetails.length; i++) {
      // console.log(parseInt(invoicedetails[i].invcDate.slice(5, 7)));

      if (
        parseInt(invoicedetails[i].invcDate.slice(0, 4)) ===
          parseInt(finYear) &&
        parseInt(invoicedetails[i].invcDate.slice(5, 7)) === parseInt(finMonth)
      ) {
        totalMe = totalMe + parseFloat(invoicedetails[i].Amount);
      }
    }
    settotalOexpen(totalOe);
    setTotmonex(totalMe);
    let totalExpTemp = totalOe + totalMe;
    setTotalexpen(totalExpTemp); //set total expenditures...............................

    let totmoninTemp = totalMi + totalOi;

    let finalprofits = totmoninTemp - totalExpTemp;
    setFinalprofit(finalprofits);
    setpiedata([
      { name: "Group A", value: totmoninTemp },
      { name: "Group B", value: totalExpTemp },
    ]);

    setTotalincome(totalOi);
    setTotalOincome(totalMi);
    setTotmonin(totmoninTemp); // set total income...................................
  }

  //calculations for expenditures
  function getAllOtherExpen() {
    axios
      .get("http://localhost:8070/OtherExpenFin/")
      .then((res) => {
        setOtherExpenDetails(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  //get main expenditures
  function getAllDetails() {
    axios
      .get("http://localhost:8070/SupInvoice/")
      .then((res) => {
        setInvoicedetails(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  //pie chart....................

  const [piedata, setpiedata] = useState([
    { name: "Group A", value: 0 },
    { name: "Group B", value: 0 },
  ]);

  const COLORS = ["#54ff82", "#FFBB28"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  useEffect(() => getAllOtherIncome(), []);
  useEffect(() => getAllCustomerBills(), []);
  useEffect(() => getAllOtherExpen(), []);
  useEffect(() => getAllDetails(), []);

  return (
    <div className="FinCalculationcard">
      <div className="selectdatefin">
        <Form onSubmit={calcprofits}>
          <InputGroup className="mb-3">
            <Form.Control
              required
              type="number"
              placeholder="Year (Required!)"
              aria-describedby="basic-addon2"
              onChange={(e) => {
                setFinYear(e.target.value);
                console.log(finYear);
              }}
            />
            <Form.Control
              required
              type="number"
              min={1}
              max={12}
              placeholder="Month (Required!)"
              aria-describedby="basic-addon2"
              onChange={(e) => {
                console.log(finMonth);
                setFinMonth(e.target.value);
              }}
            />
            <Button type="submit" variant="outline-success" id="button-addon2">
              Analyze now !
            </Button>
          </InputGroup>
        </Form>
      </div>

      <div className="printdiv" ref={componentRef}>
        <h1>
          <u>Monthly Finance Report</u>
        </h1>

        <h4>Monthly Income</h4>
        <hr />
        <Table bordered hover>
          <thead>
            <tr className="table-primary">
              <th>Year</th>
              <th>Month</th>
              <th>Main Income</th>
              <th>Other Income</th>
              <th>Total Income</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{finYear}</td>
              <td>{finMonth}</td>
              <td>{totalOincome}</td>
              <td>{totalincome}</td>
              <td style={{ background: "#54ff82" }}>{totmonin}</td>
            </tr>
          </tbody>
        </Table>

        <h4>Monthly Expenditures</h4>
        <hr />
        <Table bordered hover>
          <thead>
            <tr className="table-primary">
              <th>Year</th>
              <th>Month</th>
              <th>Main Expens</th>
              <th>Other Expens</th>
              <th>Total Expens</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{finYear}</td>
              <td>{finMonth}</td>
              <td>{totmonex}</td>
              <td>{totalOexpen}</td>
              <td style={{ background: "#ff9a3d" }}>{totalexpen}</td>
            </tr>
          </tbody>
        </Table>

        <h4>Monthly Profit</h4>
        <hr />
        <Table bordered hover>
          <thead>
            <tr className="table-primary">
              <th>Year</th>
              <th>Month</th>
              <th>Total Income</th>
              <th>Totale Expens</th>
              <th>Month Profit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{finYear}</td>
              <td>{finMonth}</td>
              <td>{totmonin}</td>
              <td>{totalexpen}</td>
              <td style={{ background: "#fb5e5e" }}>{finalprofit}</td>
            </tr>
          </tbody>
        </Table>

        <hr />

        <Row>
          <Col>
            <h3>Total Income vs Total Expenditures</h3>
            <hr />

            <PieChart width={400} height={400}>
              <Pie
                data={piedata}
                cx={200}
                cy={200}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={180}
                fill="#8884d8"
                dataKey="value"
              >
                {piedata.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </Col>

          <Col>
            <br />
            <br />
            <h3>Expenditures </h3>
            <div>
              <h5>Main Expenditures </h5>
              <ProgressBar
                striped
                animated
                variant="warning"
                now={(totmonex / totalexpen) * 100}
              />
              <br />
              <h5>Other Expenditures </h5>
              <ProgressBar
                striped
                animated
                variant="danger"
                now={(totalOexpen / totalexpen) * 100}
              />
            </div>
            <hr />
            <h3>Income </h3>
            <div>
              <h5>Main Income </h5>
              <ProgressBar
                striped
                animated
                variant="success"
                now={(totalOincome / totmonin) * 100}
              />
              <br />

              <h5>Other Income </h5>
              <ProgressBar
                striped
                animated
                variant="info"
                now={(totalincome / totmonin) * 100}
              />
            </div>
          </Col>
        </Row>
      </div>
      <hr />

      <Row style={{ marginRight: "5px" }}>
        <Button
          style={{ margin: "10px" }}
          variant="success"
          onClick={handlePrint}
        >
          Print Data
        </Button>
      </Row>
    </div>
  );
};

export default FinCalculation;
