import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PageTitle from "../../Header/PageTitle";
import ViewItem from "./ViewItem";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import printPDF from "../../../utils/printPDF";

const MainItem = () => {
  const [data, setData] = useState([]);

  const onDataChange = (data) => {
    const customDataMap = data.map((obj, index) => {
      return {
        "#": index + 1,
        "Item ID": obj.ItemID,
        "Item Name": obj.ItemName,
        Location: obj.Location,
        Quantity: obj.Quantity,
        "Shelf ID": obj.ShelfID,
      };
    });
    setData(customDataMap);
  };

  return (
    <PageTitle title="Inventory Details Page...">
      <Container>
        <Row>
          <Col>
            <Link to={"/itemdetails/add"}>
              <Button variant="primary" type="submit">
                Add New Item
              </Button>
            </Link>
          </Col>
          <Col align="right">
            <Button
              style={{ margin: "5px" }}
              variant="warning"
              onClick={() =>
                printPDF(data, "Inventory Details", "inventoryDetails")
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-download"
                viewBox="0 0 16 16"
              >
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
              </svg>
            </Button>
          </Col>
        </Row>
        <hr />
        <ViewItem onDataChange={onDataChange} />
        <hr />
      </Container>
    </PageTitle>
  );
};

export default MainItem;
