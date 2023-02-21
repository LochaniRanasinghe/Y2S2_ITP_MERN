import React from "react";
import { Container } from "react-bootstrap";
import PageTitle from "../../Header/PageTitle";
import GetAllCustomerBil from "./GetAllCustomerBil";
import ViewCustomerBill from "./ViewCustomerBill";

const MainCustomerBill = () => {
  return (
    <PageTitle title="Customer Bill Details Page...">
      <Container>
        <GetAllCustomerBil />
        <hr />
        <ViewCustomerBill />
        <hr />
      </Container>
    </PageTitle>
  );
};

export default MainCustomerBill;
