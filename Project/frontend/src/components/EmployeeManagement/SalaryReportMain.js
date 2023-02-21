import React from "react";
import { Container } from "react-bootstrap";

import PageTitle from "../Header/PageTitle";
import SalaryCalculation from "./SalaryCalculation";
//import FinChart from "./FinChart";

const SalaryReportMain = () => {
  return (
    // <PageTitle title="Employee Management Page....">
    <Container className="reportSal">
      <SalaryCalculation />
      <hr />
      {/* <FinChart /> */}
    </Container>
    // </PageTitle>
  );
};

export default SalaryReportMain;
