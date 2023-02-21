import React from "react";
import { ProgressBar } from "react-bootstrap";
import "./FinStatics.css";

const FinChart = () => {
  return (
    <div className="FinCalculationcard">
      <h1>Total Expenditures vs Total Income</h1>
      <hr />
      <br />
      <ProgressBar>
        <ProgressBar striped variant="success" now={35} key={1} />

        <ProgressBar striped variant="danger" now={25} key={2} />
      </ProgressBar>
      <br />

      <hr />
      <h3>Expenditures Graph </h3>
      <div>
        <h5>Main Expenditures </h5>
        <ProgressBar striped variant="warning" now={(4570 / 85570) * 100} />
        <br />
        <h5>Other Expenditures </h5>
        <ProgressBar striped variant="danger" now={(81000 / 85570) * 100} />
        <br />
      </div>

      <h3>Income Graph </h3>
      <div>
        <h5>Main Income </h5>
        <ProgressBar striped variant="success" now={40} />
        <br />
        <h5>Other Income </h5>
        <ProgressBar striped variant="info" now={20} />
        <br />
      </div>
      <hr />
    </div>
  );
};

export default FinChart;
