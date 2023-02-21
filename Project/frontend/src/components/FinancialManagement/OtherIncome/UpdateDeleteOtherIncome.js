import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import swal from "sweetalert";

const UpdateDeleteOtherIncome = () => {
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

  const getOtherIncomeDetail = () => {
    axios
      .get("http://localhost:8070/OtherIncomeFin/get/" + id)
      .then((res) => {
        const updateDetails = {
          billId: res.data.OtherIncomeFin.billId,
          byear: res.data.OtherIncomeFin.byear,
          bmonth: res.data.OtherIncomeFin.bmonth,
          bday: res.data.OtherIncomeFin.bday,
          bpayee: res.data.OtherIncomeFin.bpayee,
          bprice: res.data.OtherIncomeFin.bprice,
          bdescription: res.data.OtherIncomeFin.bdescription,
          bbranch: res.data.OtherIncomeFin.bbranch,
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

  useEffect(() => getOtherIncomeDetail(), []);

  return (
    <Container>
      <div className="UpdateIncomeAddForm">
        <Button
          variant="outline-secondary"
          onClick={() => {
            history(-1);
          }}
        >
          <i class="bi bi-arrow-left-circle"></i>
        </Button>
        <h3>Update Other Income Details </h3>
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
                  min={1}
                  max={31}
                  type="number"
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
                type="text"
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

                  const newOtherIncomeFinScheema = {
                    billId,
                    byear,
                    bmonth,
                    bday,
                    bpayee,
                    bprice,
                    bdescription,
                    bbranch,
                  };

                  console.log(newOtherIncomeFinScheema);

                  axios
                    .put(
                      "http://localhost:8070/otherIncomeFin/update/" + id,
                      newOtherIncomeFinScheema
                    )
                    .then(() => {
                      swal("Good job!", "Data Updated !", "success");
                      setTimeout(function () {
                        history("/otherincome");
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

export default UpdateDeleteOtherIncome;
