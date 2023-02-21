import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import swal from "sweetalert";

const UpdateDeleteOtherExpen = () => {
  const history = useNavigate();

  const [billId, setbillId] = useState("");
  const [byear, setByear] = useState("");
  const [bmonth, setBmonth] = useState("");
  const [bday, setBday] = useState("");
  const [bpayee, setBpayee] = useState("");
  const [bprice, setBprice] = useState("");
  const [bdescription, setBdescription] = useState("");
  const [bbranch, setBbranch] = useState("");

  const { id } = useParams();

  const getOtherExpenDetail = () => {
    axios
      .get("http://localhost:8070/OtherExpenFin/get/" + id)
      .then((res) => {
        const updateDetails = {
          billId: res.data.OtherExpenFin.billId,
          byear: res.data.OtherExpenFin.byear,
          bmonth: res.data.OtherExpenFin.bmonth,
          bday: res.data.OtherExpenFin.bday,
          bpayee: res.data.OtherExpenFin.bpayee,
          bprice: res.data.OtherExpenFin.bprice,
          bdescription: res.data.OtherExpenFin.bdescription,
          bbranch: res.data.OtherExpenFin.bbranch,
        };

        setbillId(updateDetails.billId);
        setByear(updateDetails.byear);
        setBmonth(updateDetails.bmonth);
        setBday(updateDetails.bday);
        setBpayee(updateDetails.bpayee);
        setBprice(updateDetails.bprice);
        setBdescription(updateDetails.bdescription);
        setBbranch(updateDetails.bbranch);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => getOtherExpenDetail(), []);

  return (
    <Container>
      <div className="UpdateOtherExpenAddForm">
        <Button
          variant="outline-secondary"
          onClick={() => {
            history(-1);
          }}
        >
          <i class="bi bi-arrow-left-circle"></i>
        </Button>
        <h3>Update Other Expenditures Details </h3>
        <hr />
        <div>
          <Form>
            <Form.Group className="mb-3" controlId="formGriddblid">
              <Form.Label>DB ID</Form.Label>
              <Form.Control defaultValue={id} disabled />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridbillid">
              <Form.Label>Bill ID</Form.Label>
              <Form.Control
                placeholder="Enter Bill ID"
                defaultValue={billId}
                disabled
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridYear">
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Year"
                  defaultValue={byear}
                  disabled
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridMonth">
                <Form.Label>Month</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Month"
                  defaultValue={bmonth}
                  disabled
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridDay">
                <Form.Label>Day</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  max={31}
                  placeholder="Day"
                  defaultValue={bday}
                  onChange={(e) => {
                    setBday(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="formGridPayee">
              <Form.Label>Payee</Form.Label>
              <Form.Control
                placeholder="Enter Payee"
                defaultValue={bpayee}
                onChange={(e) => {
                  setBpayee(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                defaultValue={bprice}
                onChange={(e) => {
                  setBprice(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridDes">
              <Form.Label>Description</Form.Label>
              <Form.Control
                placeholder="Enter Description"
                defaultValue={bdescription}
                onChange={(e) => {
                  setBdescription(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridBranch">
              <Form.Label>Branch</Form.Label>
              <Form.Select
                defaultValue={bbranch}
                onChange={(e) => {
                  setBbranch(e.target.value);
                }}
              >
                <option>Panadura</option>
                <option>...</option>
              </Form.Select>
            </Form.Group>
            <hr />
            <Row>
              <Button
                as={Col}
                variant="outline-success"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();

                  const newOtherExpenFinScheema = {
                    billId,
                    byear,
                    bmonth,
                    bday,
                    bpayee,
                    bprice,
                    bdescription,
                    bbranch,
                  };

                  console.log(newOtherExpenFinScheema);

                  axios
                    .put(
                      "http://localhost:8070/OtherExpenFin/update/" + id,
                      newOtherExpenFinScheema
                    )
                    .then(() => {
                      swal("Good job!", "Data Updated !", "success");
                      setTimeout(function () {
                        history("/otherexpen");
                      }, 2000);
                    })
                    .catch((err) => {
                      alert(err);
                    });
                }}
              >
                Update
              </Button>
              <Button
                as={Col}
                variant="outline-secondary"
                type="submit"
                onClick={() => {
                  history(-1);
                }}
              >
                Cancel
              </Button>
            </Row>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default UpdateDeleteOtherExpen;
