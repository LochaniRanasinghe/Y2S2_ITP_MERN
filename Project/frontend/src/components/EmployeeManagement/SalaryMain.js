import React from "react";
import { Col, ListGroup, Row, Tab } from "react-bootstrap";
import AddSalary from "./AddSalary";
import AllSalaries from "./AllSalaries";
import "./employee.css";
import SalaryReportMain from "./SalaryReportMain";

const SalaryMain = () => {
  return (
    <div>
      <Tab.Container defaultActiveKey="#link1">
        <Row>
          <ListGroup>
            <Col></Col>
            <Col id="tab_link">
              <ListGroup.Item action href="#link1">
                <i class="bi bi-list-nested"></i>
                All Salaries
              </ListGroup.Item>
            </Col>
            <Col id="tab_link">
              <ListGroup.Item action href="#link2">
                <i class="bi bi-plus-circle-fill"></i>
                Add Salary
              </ListGroup.Item>
            </Col>
            <Col id="tab_link">
              <ListGroup.Item action href="#link3">
                <i class="bi bi-graph-up"></i>
                Salary Reports
              </ListGroup.Item>
            </Col>
            <Col></Col>
          </ListGroup>
        </Row>
        <Row>
          <Tab.Content>
            <Tab.Pane eventKey="#link1">
              <AllSalaries />
            </Tab.Pane>
            <Tab.Pane eventKey="#link2">
              <AddSalary />
            </Tab.Pane>
            <Tab.Pane eventKey="#link3">
              <SalaryReportMain />
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
export default SalaryMain;
