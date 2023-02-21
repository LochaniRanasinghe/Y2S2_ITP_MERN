import React from "react";
import { Container } from "react-bootstrap";
import PageTitle from "../../Header/PageTitle";
import GetAllCustomerDetails from "./GetAllCustomerDetails";
import ViewCustomer from "./ViewCustomer";

const MainCustomerDetails = () => {
  return (
    <PageTitle title="Customer Details Page...">
      <Container>
        <GetAllCustomerDetails />
        <hr />
        <ViewCustomer />
        <hr />
      </Container>
    </PageTitle>
  );
};

export default MainCustomerDetails;
