import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import swal from "sweetalert"

const UpdateDeleteCustomerBills = () => {
  // const d = new Date();

  const history = useNavigate();

  const [BillID, setBillID] = useState("");
  const [Name, setName] = useState("");
  const [NIC, setNIC] = useState("");
  const [price, setPrice] = useState("");
  const [BilYear, setBilYear] = useState("");
  const [BilMonth, setBilMonth] = useState("");
  const [BilDate, setBilDate] = useState("");
  const [Branch, setBranch] = useState("");
  const [PromoCode, setPromoCode] = useState("");
  const [SerialNo, setSerialNo] = useState("");
  const [ProductID, setProductID] = useState("");

  const { id } = useParams();

  const getAllCustomerBills = () => {
    axios
      .get("http://localhost:8070/CusBill/get/" + id)
      .then((res) => {
        const UpdateDeleteCustomerBills = {
          BillID: res.data.cusBill.BillID,
          Name: res.data.cusBill.Name,
          NIC: res.data.cusBill.NIC,
          price: res.data.cusBill.price,
          BilYear: res.data.cusBill.BilYear,
          BilMonth: res.data.cusBill.BilMonth,
          BilDate: res.data.cusBill.BilDate,
          Branch: res.data.cusBill.Branch,
          PromoCode: res.data.cusBill.PromoCode,
          SerialNo: res.data.cusBill.SerialNo,
          ProductID: res.data.cusBill.ProductID,
        };

        console.log(res);

        setBillID(UpdateDeleteCustomerBills.BillID);
        setName(UpdateDeleteCustomerBills.Name);
        setNIC(UpdateDeleteCustomerBills.NIC);
        setPrice(UpdateDeleteCustomerBills.price);
        setBilYear(UpdateDeleteCustomerBills.BilYear);
        setBilMonth(UpdateDeleteCustomerBills.BilMonth);
        setBilDate(UpdateDeleteCustomerBills.BilDate);
        setBranch(UpdateDeleteCustomerBills.Branch);
        setPromoCode(UpdateDeleteCustomerBills.PromoCode);
        setSerialNo(UpdateDeleteCustomerBills.SerialNo);
        setProductID(UpdateDeleteCustomerBills.ProductID);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => getAllCustomerBills(), []);

  return (
    <Container>
      <div className="OtherExpenAddForm">
        <h3>Add Bill Details </h3>
        <hr />
        <div>
          <Form>
            <Form.Group className="mb-3" controlId="formGridbillid">
              <Form.Label>Bill ID</Form.Label>
              <Form.Control
                placeholder="Enter Bill ID"
                defaultValue={BillID}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="Enter Name"
                defaultValue={Name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridYear">
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Year"
                  defaultValue={BilYear}
                  disabled
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridMonth">
                <Form.Label>Month</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Month"
                  min={1}
                  max={12}
                  defaultValue={BilMonth}
                  disabled
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridDay">
                <Form.Label>Day</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Day"
                  min={1}
                  max={31}
                  defaultValue={BilDate}
                  onChange={(e) => {
                    setBilDate(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="formGridNIC">
              <Form.Label>NIC</Form.Label>
              <Form.Control
                placeholder="Enter NIC"
                defaultValue={NIC}
                onChange={(e) => {
                  setNIC(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                placeholder="Enter price"
                defaultValue={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridPromocode">
              <Form.Label>PromoCode</Form.Label>
              <Form.Control
              required disabled
              defaultValue={PromoCode}
              onChange={(e) => {
                setPromoCode(e.target.value);
              }}
            >
          
            </Form.Control>




              {/* <Form.Control
                placeholder="Enter PromoCode"
                defaultValue={PromoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value);
                }}
              /> */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridSN">
              <Form.Label>Serial Number</Form.Label>
              <Form.Control
                placeholder="Enter Serial Number"
                defaultValue={SerialNo}
                onChange={(e) => {
                  setSerialNo(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridProID">
              <Form.Label>ProductID</Form.Label>
              <Form.Control
                placeholder="Enter ProductID"
                defaultValue={ProductID}
                onChange={(e) => {
                  setProductID(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridBranch">
              <Form.Label>Branch</Form.Label>
              <Form.Control
                placeholder="Enter Branch"
                defaultValue={Branch}
                disabled
              />
            </Form.Group>
            <hr />
            <Button
              variant="outline-success"
              type="submit"
              onClick={(e) => {
                e.preventDefault();

                const CusBillSchema = {
                  BillID,
                  Name,
                  NIC,
                  price,
                  BilYear,
                  BilMonth,
                  BilDate,
                  Branch,
                  PromoCode,
                  SerialNo,
                  ProductID,
                };
                axios
                  .put(
                    "http://localhost:8070/CusBill/update/" + id,
                    CusBillSchema
                  )
                  .then(() => {
                    swal("Updated!!!", "Data updated ", "success");
                    history(-1);
                  })
                  .catch((err) => {
                    alert(err);
                  });
              }}
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default UpdateDeleteCustomerBills;
