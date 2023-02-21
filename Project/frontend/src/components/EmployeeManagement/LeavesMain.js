import React from "react";
import { Col, ListGroup, Row, Tab } from "react-bootstrap";
import AddLeave from "./AddLeave";
import AllLeaves from "./AllLeaves";
import "./employee.css";

const LeavesMain = () => {
  return (
    <div>
      <Tab.Container defaultActiveKey="#link1">
        <Row>
          <ListGroup>
            {/* id="tab_link" */}
            <Col></Col>
            <Col id="tab_link">
              <ListGroup.Item action href="#link1">
                <i class="bi bi-list-nested"></i>
                All Leave Details
              </ListGroup.Item>
            </Col>

            <Col id="tab_link">
              <ListGroup.Item action href="#link2">
                <i class="bi bi-plus-circle-fill"></i>
                Add New Leave
              </ListGroup.Item>
            </Col>
            <Col></Col>
          </ListGroup>
        </Row>
        <Row>
          <Tab.Content>
            <Tab.Pane eventKey="#link1">
              <AllLeaves />
            </Tab.Pane>
            <Tab.Pane eventKey="#link2">
              <AddLeave />
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
export default LeavesMain;
