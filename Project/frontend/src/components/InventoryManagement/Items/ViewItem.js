import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Form, Button, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import "./ItemStyle.css";

const ViewItem = ({ onDataChange }) => {
  const [itemdetails, setitemdetails] = useState([]);

  function getAllItemDetails() {
    axios
      .get("http://localhost:8070/InvItem/")
      .then((res) => {
        setitemdetails(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  useEffect(() => getAllItemDetails(), []);
  useEffect(() => onDataChange(itemdetails), [itemdetails]);

  const [searchterm, setSearchterm] = useState("");

  return (
    <Container>
      <div className="ViewItemDetails">
        <h3>All Item Details</h3>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={(e) => {
              setSearchterm(e.target.value);
            }}
          />
          <Button variant="outline-success">Search</Button>
        </Form>
        <hr />

        <div>
          <Table bordered hover>
            <thead>
              <tr className="table-primary">
                <th>#</th>
                <th>Item ID</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Shelf ID</th>
                <th>Location</th>
                <th>Supplier ID</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {itemdetails
                .filter((val) => {
                  if (searchterm === "") {
                    return val;
                  } else if (
                    val.ItemName.toLowerCase().includes(
                      searchterm.toLowerCase()
                    )
                  ) {
                    return val;
                  }
                })
                .map((itemdetailsvalues, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{itemdetailsvalues.ItemID}</td>
                    <td>{itemdetailsvalues.ItemName}</td>
                    <td>{itemdetailsvalues.Quantity}</td>
                    <td>{itemdetailsvalues.ShelfID}</td>
                    <td>{itemdetailsvalues.Location}</td>
                    <td>{itemdetailsvalues.SupplierID}</td>
                    <td>
                      <Link to={"/itemdetails/update/" + itemdetailsvalues._id}>
                        <Button as={Col} variant="info" type="submit">
                          info
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default ViewItem;
