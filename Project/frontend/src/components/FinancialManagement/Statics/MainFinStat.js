import React from "react";
import { Container } from "react-bootstrap";

import PageTitle from "../../Header/PageTitle";
import FinCalculation from "./FinCalculation";
import FinChart from "./FinChart";

const MainFinStat = () => {
  return (
    <PageTitle title="Financial Management Page....">
      <Container>
        <FinCalculation />
      </Container>
    </PageTitle>
  );
};

export default MainFinStat;
