import React, { useEffect, useState } from "react";
import { Button, Col, Container, ProgressBar, Row, Table } from "react-bootstrap";
import "./SerClaimStatic.css";
import BarChart from "./BarChart";
import axios from "axios";
import PieChart from "./PieChart";
import AreaChart from "./LineChart";
import ReportGen from "./../SerReport/reportGenerator";

function SerStaticChart() {
  const [claimDetails, setAllClaimdetails] = useState([]);
  useEffect(() => {
    function getAllClaimDetails() {
      axios
        .get("http://localhost:8070/SerClaim/service/get-count")
        .then(res => {
          setAllClaimdetails(res.data)
        })
        .catch((err) => {
          alert(err);
        });
    }

    getAllClaimDetails()
  }, []);

  let total = 0;
  let samsung = 0;
  let Htc = 0;
  let apple = 0;
  let huawei = 0;
  for (var model of claimDetails) {
    if (model._id === 'Samsung') {
      samsung = Number(model.Count)
    }

    if (model._id === 'Apple') {
      apple = Number(model.Count)
    }

    if (model._id.toLowerCase() === 'huawei') {
      huawei = Number(model.Count)
      console.log((huawei / total) * 100);
    }

    if (model._id.toLowerCase() === 'htc') {
      Htc = Number(model.Count)
      console.log((Htc / total) * 100);
    }

    total = total + Number(model.Count);
    console.log(total);
  };

  function APPLEPRO() {
    const now = Math.floor((apple / total) * 100);
    return (
      <ProgressBar
        now={now}
        animated
        variant="danger"
        style={{ margin: "20px" }}
        label={`${now}%`}
      />
    );
  }
  function HTCPRO() {
    const now = Math.floor((Htc / total) * 100);
    return (
      <ProgressBar
        now={now}
        animated
        variant="secondary"
        style={{ margin: "20px" }}
        label={`${now}%`}
      />
    );
  }
  function HUAWEIPRO() {
    const now = Math.floor((huawei / total) * 100);
    return (
      <ProgressBar
        now={now}
        animated
        variant="success"
        style={{ margin: "20px" }}
        label={`${now}%`}
      />
    );
  }
  function SAMSUNGPRO() {
    const now = Math.floor((samsung / total) * 100);
    return (
      <ProgressBar
        now={now}
        animated
        variant="info"
        style={{ margin: "20px" }}
        label={`${now}%`}
      />
    );
  }


  return (
    <div className="FinCalculationcard">
      <Container>
        <Row>
          <br></br><br></br>
          <Container><Row><hr /><h2>Summary Table</h2><hr /></Row></Container>
          <br></br><br></br>
          <Table bordered hover responsive border={3} variant="light">
            <thead>
              <tr className="table-primary">
                <th>Mobile Brand</th>
                <th>Total Receive</th>
                <th>Precentage view</th>
                <th>Toal Precentage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>APPLE</td>
                <td>{apple}</td>
                <td>{APPLEPRO()}</td>
                <td style={{ background: "success" }}>{Math.floor((apple / total) * 100)}%</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>SAMSUNG</td>
                <td>{samsung}</td>
                <td>{SAMSUNGPRO()}</td>
                <td style={{ background: "success" }}>{Math.floor((samsung / total) * 100)}%</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>HTC</td>
                <td>{Htc}</td>
                <td>{HTCPRO()}</td>
                <td style={{ background: "success" }}>{Math.floor((Htc / total) * 100)} %</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>HUAWEI</td>
                <td>{huawei}</td>
                <td>{HUAWEIPRO()}</td>
                <td style={{ background: "success" }}>{Math.floor((huawei / total) * 100)}%</td>
              </tr>
            </tbody>
          </Table></Row></Container>

      <br></br><br></br>
      <Container><Row><hr /><h2>Chart Representation</h2><hr /></Row></Container>
      <br></br><br></br>

      <Table striped bordered hover size="sm" responsive border={2} variant="secondary">
        <thead>
          <tr>
            <th><Col><small>Bar Chart</small><BarChart /></Col></th>
            <th> <Col><small>Pie Chart</small><PieChart /></Col></th>
            <th><Col><small>Area Chart</small><AreaChart /></Col></th>
          </tr>
        </thead>
      </Table>
      <br></br><br></br>
      <Container><Row><hr /><h2>Services In Details</h2><hr /></Row></Container>
      <br></br><br></br>
      <Table striped bordered hover size="sm" responsive="xl" border={2} variant="light">
        <thead>
          <tr>
            <th ><Col><ReportGen /></Col></th>
          </tr>
        </thead>
      </Table>

    </div>
  );
}

export default SerStaticChart;
