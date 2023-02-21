import React, { useEffect, useState } from "react";
import { Form, Row, Button, Col, Container } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import "./ItemStyle.css";

const UpdateDeleteItem = () => {
  const [ItemID, setItemID] = useState("");
  const [ItemName, setItemName] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [ShelfID, setShelfID] = useState("");
  const [Location, setLocation] = useState("");
  const [SupplierID, setSupplierID] = useState("");
  const [refresh, setRefresh] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const getAllItemDetails = () => {
    axios
      .get("http://localhost:8070/InvItem/get/" + id)
      .then((res) => {
        const updatedetails = {
          ItemID: res.data.item.ItemID,
          ItemName: res.data.item.ItemName,
          Quantity: res.data.item.Quantity,
          ShelfID: res.data.item.ShelfID,
          Location: res.data.item.Location,
          SupplierID: res.data.item.SupplierID,
        };

        setItemID(updatedetails.ItemID);
        setItemName(updatedetails.ItemName);
        setQuantity(updatedetails.Quantity);
        setShelfID(updatedetails.ShelfID);
        setLocation(updatedetails.Location);
        setSupplierID(updatedetails.SupplierID);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  //delete function
  function deleteItem(id) {

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
        .delete("http://localhost:8070/InvItem/delete/" + id)
        .then((res) => {
          swal("Ohhh! Your data has been deleted!", {
            icon: "success", 
          });
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        })
      } else {
        swal("Your data is safe!");
      }
    });

  }

  useEffect(() => getAllItemDetails(), [refresh]);

  return (
    <Container>
      <div className="ItemUpdateForm">
        <h3>Update Item Details</h3>
        <hr />
        <div>
          <Form>
            <Form.Group className="mb-3" controlId="formGridbillid">
              <Form.Label>Item ID</Form.Label>
              <Form.Control
                placeholder="Enter Item ID"
                defaultValue={ItemID}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridbillid">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                placeholder="Enter Item Name"
                defaultValue={ItemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridbillid">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                placeholder="Enter Quantity"
                defaultValue={Quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridbillid">
              <Form.Label>Shelf ID</Form.Label>
              <Form.Control
                placeholder="Enter Shelf ID"
                defaultValue={ShelfID}
                onChange={(e) => setShelfID(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridbillid">
              <Form.Label>Location</Form.Label>
              <Form.Select
                defaultValue="Stocks"
                onChange={(e) => setLocation(e.target.value)}
              >
                <option>Stocks</option>
                <option>Showroom</option>
              </Form.Select>
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

            <Link to={"/itemdetails"}>
              <Row>
                <Col>
                  <Button
                    as={Col}
                    variant="outline-success"
                    style={{ width: "100%" }}
                    onClick={(e) => {
                      e.preventDefault();

                      const invItemSchema = {
                        ItemID,
                        ItemName,
                        Quantity,
                        ShelfID,
                        Location,
                        SupplierID,
                      };

                      axios
                        .put(
                          "http://localhost:8070/InvItem/update/" + id,
                          invItemSchema
                        )
                        .then(() => {
                          // alert("Data Updated");
                          swal("Good job!", "Data Updated!", "success");
                          navigate("/itemdetails")
                          
                        })
                        .catch((err) => {
                          alert(err);
                        });
                    }}
                  >
                    Update
                  </Button>
                </Col>
                <Col>
                
                  <Button
                    as={Col}
                    variant="outline-danger"
                    style={{ width: "100%" }}
                    onClick={() => deleteItem(id)}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            </Link>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default UpdateDeleteItem;
