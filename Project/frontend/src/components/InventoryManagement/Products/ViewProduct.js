import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import "./ProductStyle.css";

const ViewProduct = ({ onChangeData }) => {
  const [productdetails, setproductdetails] = useState([]);

  function getAllProductDetails() {
    axios
      .get("http://localhost:8070/InvProduct/")
      .then((res) => {
        setproductdetails(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  useEffect(() => getAllProductDetails(), []);
  useEffect(() => onChangeData(productdetails), [productdetails]);
  const [searchterm, setSearchterm] = useState("");

  return (
    <Container>
      <div className="ViewProductDetails">
        <h3>All Product Details</h3>
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
          <Table bordered hover responsive>
            <thead>
              <tr className="table-primary">
                <th>DBID</th>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Product Model</th>
                <th>Year of Manufactured</th>
                <th>Warranty Period</th>
                <th>Supplier ID</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productdetails
                .filter((val) => {
                  if (searchterm === "") {
                    return val;
                  } else if (
                    val.Model.toLowerCase().includes(searchterm.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((productdetailsvalues) => (
                  <tr>
                    <td>#</td>
                    <td>{productdetailsvalues.ID}</td>
                    <td>{productdetailsvalues.Name}</td>
                    <td>{productdetailsvalues.Price}</td>
                    <td>{productdetailsvalues.Model}</td>
                    <td>{productdetailsvalues.YearOfManufactured}</td>
                    <td>{productdetailsvalues.WarrantyPeriod}</td>
                    <td>{productdetailsvalues.SupplierID}</td>
                    <td>
                      <Link
                        to={
                          "/productdetails/update/" + productdetailsvalues._id
                        }
                      >
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

export default ViewProduct;
