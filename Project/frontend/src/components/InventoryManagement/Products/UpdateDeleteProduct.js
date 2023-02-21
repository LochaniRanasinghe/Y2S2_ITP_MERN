import React, { useEffect, useState } from "react";
import { Form, Row, Button, Col, Container } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import "./ProductStyle.css";

const UpdateDeleteProduct = () => {
  const [ID, setID] = useState("");
  const [Name, setName] = useState("");
  const [Price, setPrice] = useState("");
  const [Model, setModel] = useState("");
  const [YearOfManufactured, setYearOfManufactured] = useState("");
  const [WarrantyPeriod, setWarrantyPeriod] = useState("");
  const [SupplierID, setSupplierID] = useState("");
  const [refresh, setRefresh] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const getAllProductDetails = () => {
    axios
      .get("http://localhost:8070/InvProduct/get/" + id)
      .then((res) => {
        const updatedetails = {
          ID: res.data.product.ID,
          Name: res.data.product.Name,
          Price: res.data.product.Price,
          Model: res.data.product.Model,
          YearOfManufactured: res.data.product.YearOfManufactured,
          WarrantyPeriod: res.data.product.WarrantyPeriod,
          SupplierID: res.data.product.SupplierID,
        };

        setID(updatedetails.ID);
        setName(updatedetails.Name);
        setPrice(updatedetails.Price);
        setModel(updatedetails.Model);
        setYearOfManufactured(updatedetails.YearOfManufactured);
        setWarrantyPeriod(updatedetails.WarrantyPeriod);
        setSupplierID(updatedetails.SupplierID);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  //delete function
  function deleteProduct(id) {
    // if (window.confirm("Are you sure to Delete?")) {
    //   axios
    //     .delete("http://localhost:8070/InvProduct/delete/" + id)
    //     .then((res) => {
    //       alert("Product Deleted Successfully");
    //       navigate("/productdetails")
    //       //setRefresh(!refresh);
          
    //     })
    //     .catch((err) => {
    //       alert(err.message);
    //     });
    // } else {
    //   //do nothing!
    // }

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios
        .delete("http://localhost:8070/InvProduct/delete/" + id)
        .then((res) => {
          swal("Ohhh! Your data has been deleted!", {
            icon: "success",
          });
          // window.location.reload();
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        })
      } else {
        swal("Your data is safe!");
      }
    });

  }

  useEffect(() => getAllProductDetails(), [refresh]);

  return (
    <Container>
      <div className="ProductUpdateForm">
        <h3>Update Product Details</h3>
        <hr />
        <div>
          <Form>
            <Form.Group className="mb-3" controlId="formGridbillid">
              <Form.Label>Product ID</Form.Label>
              <Form.Control
                placeholder="Enter Product ID"
                defaultValue={ID}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridbillid">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                placeholder="Enter Product Name"
                defaultValue={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridbillid">
              <Form.Label>Price</Form.Label>
              <Form.Control
                placeholder="Enter Price"
                defaultValue={Price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridbillid">
              <Form.Label>Product Model</Form.Label>
              <Form.Control
                placeholder="Enter Product Model"
                defaultValue={Model}
                onChange={(e) => setModel(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridbillid">
              <Form.Label>Year of Manufactured</Form.Label>
              <Form.Control
                placeholder="Enter Year of Manufactured"
                defaultValue={YearOfManufactured}
                onChange={(e) => setYearOfManufactured(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridbillid">
              <Form.Label>Warranty Period</Form.Label>
              <Form.Control
                placeholder="Enter Warranty Period"
                defaultValue={WarrantyPeriod}
                onChange={(e) => setWarrantyPeriod(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridbillid">
              <Form.Label>Supplier ID</Form.Label>
              <Form.Control
                placeholder="Enter Supplier ID"
                defaultValue={SupplierID}
                disabled
                onChange={(e) => setSupplierID(e.target.value)}
              />
            </Form.Group>
            <hr />

            <div>
              <Row align="center">
                <Col>
                  <Link to={"/productdetails/view"}>
                    <Button
                      variant="outline-success"
                      style={{ width: "100%" }}
                      onClick={(e) => {
                        e.preventDefault();

                        const invProductSchema = {
                          ID,
                          Name,
                          Price,
                          Model,
                          YearOfManufactured,
                          WarrantyPeriod,
                          SupplierID,
                        };

                        axios
                          .put(
                            "http://localhost:8070/InvProduct/update/" + id,
                            invProductSchema
                          )
                          .then(() => {
                            // alert("Data Updated");
                            swal("Good job!", "Data Updated!", "success");
                            navigate("/productdetails")
                          })
                          .catch((err) => {
                            alert(err);
                          });
                      }}
                    >
                      Update
                    </Button>
                  </Link>
                </Col>

                <Col>
                  <Link to={"/productdetails"}>
                    <Button
                      variant="outline-danger"
                      style={{ width: "100%" }}
                      onClick={() => deleteProduct(id)}
                    >
                      Delete
                    </Button>
                  </Link>
                </Col>
              </Row>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default UpdateDeleteProduct;
