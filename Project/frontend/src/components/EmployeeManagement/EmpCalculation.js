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

const EmpCalculation = () => {
  const [empDetails, setEmployees] = useState([]);
  const [totalD, settotalD] = useState(0);
  const [totalDDash, settotalDDash] = useState(0);

  const [designation, setdesignation] = useState("");

  const componentRef = useRef();

  //printing function
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Employees Report",
  });

  const getEmployees = () => {
    axios
      .get("http://localhost:8070/empEmployee/")
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  function calEmpDesignation() {
    let vartotal = 0;
    let dashtotal = 0;
    // let vartotalWorkers = 0;

    for (let i = 0; i < empDetails.length; i++) {
      if (empDetails[i].designation == "Manager") {
        vartotal = vartotal + 1;
      } else {
        dashtotal = dashtotal + 1;
      }
    }
    settotalD(vartotal);
    settotalDDash(dashtotal);

    setpiedata([
      { name: "Total Managers", value: vartotal },
      { name: "Total Workers", value: dashtotal },
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

  useEffect(() => getEmployees(), []);

  return (
    <div className="EmpCalculationcard">
      <div className="empReportdiv">
        <InputGroup>
          <Button
            className="btnEmpReport"
            variant="warning"
            id="button-addon2"
            onClick={(e) => {
              calEmpDesignation();
            }}
          >
            Generate Employee Designation Report
          </Button>
        </InputGroup>
      </div>
      <div className="printdiv" ref={componentRef}>
        <br />
        <div className="headingReport">
          <h1>Employee Designation Report</h1>
        </div>
        <br />
        <hr />
        <div className="divTableEmpReport">
          <Table bordered hover>
            <thead>
              <tr className="table-primary">
                <th>Managers</th>
                <th>Workers</th>
                <th>Total Employees</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{totalD}</td>
                <td>{totalDDash}</td>
                <td style={{ background: "#ff9a3d" }}>
                  {+totalD + +totalDDash}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>

        <br />
        <hr />
        <br />
        <div>
          <div className="headingGraphSal">
            <h1>Graphical Designation Report</h1>
          </div>
          <div>
            <h5>Managers as a percentage of total employees</h5>
            {Math.round((totalD / (+totalD + +totalDDash)) * 100).toFixed(2)}
            %
            <br />
            <ProgressBar>
              <ProgressBar
                striped
                animated
                variant="info"
                now={(totalD / (+totalD + +totalDDash)) * 100}
                key={1}
              />
            </ProgressBar>
            <br />
          </div>

          <div>
            <h5>Workers as a percentage of total employees</h5>
            {Math.round((totalDDash / (+totalD + +totalDDash)) * 100).toFixed(
              2
            )}
            %
            <br />
            <ProgressBar>
              <ProgressBar
                striped
                animated
                variant="danger"
                now={(totalDDash / (+totalD + +totalDDash)) * 100}
                key={1}
              />
            </ProgressBar>
          </div>
        </div>
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

export default EmpCalculation;
