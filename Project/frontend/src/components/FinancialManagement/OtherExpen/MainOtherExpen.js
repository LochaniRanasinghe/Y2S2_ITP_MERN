import React from "react";
import { Container } from "react-bootstrap";
import PageTitle from "../../Header/PageTitle";
import AddOtherExpen from "./AddOtherExpen";

import ViewOtherExpen from "./ViewOtherExpen";

const MainOtherExpen = () => {
  return (
    <PageTitle title="Other Expenditures Page...">
      <Container>
        <AddOtherExpen />
        <hr />
        <ViewOtherExpen />
        <hr />
      </Container>
    </PageTitle>
  );
};

export default MainOtherExpen;
