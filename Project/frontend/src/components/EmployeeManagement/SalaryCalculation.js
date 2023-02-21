import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Row,
  Table,
  Form,
  InputGroup,
  ProgressBar,
  Container,
} from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import { Pie, PieChart, Cell, Legend } from "recharts";
import FootCom from "../Footer/FootCom";

const SalaryCalculation = () => {
  const [salariesDetails, setSalaries] = useState([]);
  const [totalBasicSalary, settotalBasicSalary] = useState(0);
  const [totalBonusSalary, settotalBonusSalary] = useState(0);
  const [totalDeductSalary, settotalDeductSalary] = useState(0);
  const [totalTSalary, settotalTSalary] = useState(0);

  const [finYear, setFinYear] = useState("");
  const [finMonth, setFinMonth] = useState("");

  const componentRef = useRef();

  //printing function
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Salary Report",
  });

  const getSalaries = () => {
    axios
      .get("http://localhost:8070/empSalary/")
      .then((res) => {
        setSalaries(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  function calSalary() {
    let totalBasic = 0;
    let totalBonus = 0;
    let totalDeduct = 0;
    let totalTSal = 0;

    for (let i = 0; i < salariesDetails.length; i++) {
      if (
        parseInt(salariesDetails[i].year) === parseInt(finYear) &&
        salariesDetails[i].month === finMonth
      ) {
        totalBasic = totalBasic + parseInt(salariesDetails[i].basicSalary);
        totalBonus = totalBonus + parseInt(salariesDetails[i].bonus);
        totalDeduct = totalDeduct + parseInt(salariesDetails[i].deduction);
        totalTSal = totalTSal + parseInt(salariesDetails[i].totalSalary);
      }
    }
    settotalBasicSalary(totalBasic);
    settotalBonusSalary(totalBonus);
    settotalDeductSalary(totalDeduct);
    settotalTSalary(totalTSal);

    setpiedata([
      { name: "Total Basic Salary", value: totalBasic },
      { name: "Total Bonuses", value: totalBonus },
      { name: "Total Deductions", value: totalDeduct },
    ]);
  }

  //////////////

  //pie chart....................

  const [piedata, setpiedata] = useState([
    { name: "Group A", value: 0 },
    { name: "Group B", value: 0 },
    { name: "Group C", value: 0 },
  ]);

  const COLORS = ["#8f79d7", "#febf44", "#ec6074"];

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

  useEffect(() => getSalaries(), []);

  return (
    <div className="FinCalculationcard">
      <div className="selectdatefin">
        <InputGroup className="mb-3">
          <Form.Control
            required
            type="number"
            placeholder="Enter Year"
            aria-describedby="basic-addon2"
            onChange={(e) => {
              setFinYear(e.target.value);
              console.log(finYear);
            }}
          />
          <Form.Select
            required
            id="month"
            placeholder="Select Month"
            aria-describedby="basic-addon2"
            onChange={(e) => {
              console.log(finMonth);
              setFinMonth(e.target.value);
            }}
          >
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </Form.Select>
          <Button
            variant="outline-success"
            id="button-addon2"
            onClick={(e) => {
              calSalary();
            }}
          >
            Generate
          </Button>
        </InputGroup>
      </div>
      <div className="printdiv" ref={componentRef}>
        <br />
        <br />
        <div className="headingReport">
          <h1>Monthly Salary Report - {finMonth}</h1>
        </div>
        <br />
        <hr />
        <Table bordered hover>
          <thead>
            <tr className="table-primary">
              <th>Year</th>
              <th>Month</th>
              <th>Total Basic Salary</th>
              <th>Total Bonuses</th>
              <th>Total Deductions</th>
              <th>Total Salary Paid</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{finYear}</td>
              <td>{finMonth}</td>
              <td>{totalBasicSalary}</td>
              <td>{totalBonusSalary}</td>
              <td>{totalDeductSalary}</td>
              <td style={{ background: "#ff9a3d" }}>{totalTSalary}</td>
            </tr>
          </tbody>
        </Table>
        <br />
        <hr />
        <br />
        <div>
          <div className="headingGraphSal">
            <h1>Graphical Salary Report</h1>
          </div>
          <div>
            <h5>Total basic salary as a percentage of total salary paid</h5>
            {Math.round((totalBasicSalary / totalTSalary) * 100).toFixed(2)}%
            <br />
            <ProgressBar>
              <ProgressBar
                striped
                animated
                variant="info"
                now={(totalBasicSalary / totalTSalary) * 100}
                key={1}
              />
            </ProgressBar>
            <br />
          </div>

          <div>
            <h5>Total bonuses as a percentage of total salary paid</h5>
            {Math.round((totalBonusSalary / totalTSalary) * 100).toFixed(2)}%
            <br />
            <ProgressBar>
              <ProgressBar
                striped
                animated
                variant="danger"
                now={(totalBonusSalary / totalTSalary) * 100}
                key={1}
              />
            </ProgressBar>
          </div>

          <div>
            <br />
            <h5>Total deductions as a percentage of total salary paid</h5>
            {Math.round((totalDeductSalary / totalTSalary) * 100).toFixed(2)}%
            <br />
            <ProgressBar>
              <ProgressBar
                striped
                animated
                variant="success"
                now={(totalDeductSalary / totalTSalary) * 100}
                key={1}
              />
            </ProgressBar>
          </div>
        </div>{" "}
        {/* //within graph part */}
        <div className="headerPieChart">
          <h1>Pie chart</h1>
        </div>
        <div className="containerPieChart">
          <PieChart width={600} height={400}>
            <Legend
              layout="vertical"
              verticalAlign="top"
              align="right"
              iconSize={20}
              iconType="wye"
            />
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
        </div>
        {/* <hr />
        <div>
          <FootCom />
        </div> */}
      </div>

      <br />
      <hr />

      <Row className="rowReportDownload">
        <Button
          className="btnReportDownload"
          variant="info"
          onClick={handlePrint}
        >
          Download Report
        </Button>
      </Row>
    </div>
  );
};

export default SalaryCalculation;
