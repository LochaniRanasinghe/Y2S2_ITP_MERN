import React from "react";
import { Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import PageTitle from "../../Header/PageTitle";
import SerStaticChart from "./SerStaticChart";

function MainSerStatic() {
  const location = useLocation();
  return (
    <>
      <div className="Title">
        <PageTitle className="Title" title="Graphical View Of Claims">

        </PageTitle></div>
      <Container>
        <SerStaticChart />
      </Container></>
  );
}

export default MainSerStatic;
