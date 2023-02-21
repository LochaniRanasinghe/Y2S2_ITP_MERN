import React from "react";
import { Container } from "react-bootstrap";
import PageTitle from "../../Header/PageTitle";
import AddPromReport from "./AddPromReport";

const MainPromReport = () => {
  return (
    <PageTitle title="Promotion Summary">
      <Container>
        <AddPromReport />
      </Container>
    </PageTitle>
  );
};

export default MainPromReport;
