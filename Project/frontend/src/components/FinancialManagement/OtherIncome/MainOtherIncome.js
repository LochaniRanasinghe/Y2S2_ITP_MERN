import React from "react";
import { Container } from "react-bootstrap";
import PageTitle from "../../Header/PageTitle";
import AddOtherIncome from "./AddOtherIncome";
import ViewOtherIncome from "./ViewOtherIncome";

const MainOtherIncome = () => {
  return (
    <PageTitle title="Other Income Page...">
      <Container>
        <AddOtherIncome />
        <hr />
        <ViewOtherIncome />
        <hr />
      </Container>
    </PageTitle>
  );
};

export default MainOtherIncome;
