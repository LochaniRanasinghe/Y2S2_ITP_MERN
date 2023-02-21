import React, { useState } from "react";
import { Col, ListGroup, Row, Tab } from "react-bootstrap";
import AddEmployee from "./AddEmployee";
import AllEmployees from "./AllEmployees";
import EmpCalculation from "./EmpCalculation";
import "./employee.css";
import EmpReportMain from "./EmpReportMain";

const EmployeeMain = () => {
  return (
    <div>
      <Tab.Container defaultActiveKey="#link1">
        <Row>
          <ListGroup>
            <Col></Col>
            <Col id="tab_link">
              <ListGroup.Item action href="#link1">
                <i class="bi bi-list-nested"></i>
                All Employees
              </ListGroup.Item>
            </Col>
            <Col id="tab_link">
              <ListGroup.Item action href="#link2">
                <i class="bi bi-plus-circle-fill"></i>
                Add Employee
              </ListGroup.Item>
            </Col>
            <Col id="tab_link">
              <ListGroup.Item action href="#link3">
                <i class="bi bi-graph-up"></i>
                Employee Report
              </ListGroup.Item>
            </Col>
            <Col></Col>
          </ListGroup>
        </Row>

        <Row>
          <Tab.Content>
            <Tab.Pane eventKey="#link1">
              <AllEmployees />
            </Tab.Pane>
            <Tab.Pane eventKey="#link2">
              <AddEmployee />
            </Tab.Pane>
            <Tab.Pane eventKey="#link3">
              <EmpReportMain />
            </Tab.Pane>
          </Tab.Content>
        </Row>
      </Tab.Container>
      <br />
      <br />
      <br />
    </div>
  );
};
export default EmployeeMain;
