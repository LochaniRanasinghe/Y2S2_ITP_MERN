import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";


const UpdatePromReport = () => {
  const history = useNavigate();

  const [customerId, setcustomerId] = useState("");
  const [billId, setbillId] = useState("");
  const [billYear, setbillYear] = useState("");
  const [billMonth, setbillMonth] = useState("");
  const [billDate, setbillDate] = useState("");
  const [promotionId, setpromotionId] = useState("");
  const [promotionName, setpromotionName] = useState("");
  const [discountAmount, setdiscountAmount] = useState("");

  const { id } = useParams();

  const getPromReport = () => {

    // calling data in the backend from frontend
    axios
      .get("http://localhost:8070/ProReport/get/" + id)
      .then((res) => {

          const updateReport = {
          customerId: res.data.ProReports.customerId,
          billId: res.data.ProReports.billId,
          billYear: res.data.ProReports.billYear,
          billMonth: res.data.ProReports.billMonth,
          billDate: res.data.ProReports.billDate,
          promotionId: res.data.ProReports.promotionId,
          promotionName: res.data.ProReports.promotionName,
          discountAmount: res.data.ProReports.discountAmount,
        };

        setcustomerId(updateReport.customerId);
        setbillId(updateReport.billId);
        setbillYear(updateReport.billYear);
        setbillMonth(updateReport.billMonth);
        setbillDate(updateReport.billDate);
        setpromotionId(updateReport.promotionId);
        setpromotionName(updateReport.promotionName);
        setdiscountAmount(updateReport.discountAmount);
        
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => getPromReport(), []);

  return (
    <Container>
      <div className="updatePromReport">
        <h3>Update Rewarded Offers</h3>
        <Button
          style={{ margin: "5px" }}
          // variant="outline-secondary"
          variant="info"
          onClick={() => {
            history(-1);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-left-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
          </svg>
        </Button>
        <hr />
        <div>
          <Form>
            <Form.Group className="mb-3" controlId="formGridcusid">
              <Form.Label>Customer ID</Form.Label>
              <Form.Control
                placeholder="Enter Customer ID"
                defaultValue={customerId}
                onChange={(e) => {
                  setcustomerId(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridBillid">
              <Form.Label>Bill ID</Form.Label>
              <Form.Control
                placeholder="Enter Bill ID"
                defaultValue={billId}
                onChange={(e) => {
                  setbillId(e.target.value);
                }}
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formYear">
                <Form.Label>Bill Year</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Year"
                  defaultValue={billYear}
                  onChange={(e) => {
                    setbillYear(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formMonth">
                <Form.Label>Bill Month</Form.Label>
                <Form.Control
                  placeholder="Month"
                  defaultValue={billMonth}
                  min={1}
                  max={12}
                  onChange={(e) => {
                    setbillMonth(e.target.value);
                  }}
                >
                  {/* <option>01</option>
                  <option>02</option>
                  <option>03</option>
                  <option>04</option>
                  <option>05</option>
                  <option>06</option>
                  <option>07</option>
                  <option>08</option>
                  <option>09</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option> */}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formDay">
                <Form.Label>Bill Day</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Day"
                  min={1}
                  max={31}
                  defaultValue={billDate}
                  onChange={(e) => {
                    setbillDate(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formPid">
              <Form.Label>Promotion ID</Form.Label>
              <Form.Control
                placeholder="Enter Promotion ID"
                defaultValue={promotionId}
                onChange={(e) => {
                  setpromotionId(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPtype">
              <Form.Label>Promotion Type</Form.Label>
              <Form.Control
                defaultValue={promotionName}
                onChange={(e) => {
                  setpromotionName(e.target.value);
                }}
              >
                {/* <option>Seasonal Offers</option>
                <option>Student Discounts</option>
                <option>Joint promotions</option>
                <option>Cashback Promotions</option>
                <option>Loyalty Rewards</option> */}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAmount">
              <Form.Label>Discount Amount</Form.Label>
              <Form.Control
                placeholder="Enter Discount Amount"
                defaultValue={discountAmount}
                onChange={(e) => {
                  setdiscountAmount(e.target.value);
                }}
              />
            </Form.Group>
            <hr />
            <Row>
              <Button
                as={Col}
                // variant="outline-success"
                variant="success"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();

                  const newreport = {
                    customerId,
                    billId,
                    billYear,
                    billMonth,
                    billDate,
                    promotionId,
                    promotionName,
                    discountAmount,
                  };

                  swal({
                    title: "Are you sure?",
                    text: "Are you sure that you want to delete this record?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  });


                  axios
                    .put(
                      "http://localhost:8070/ProReport/update/" + id,
                      newreport
                    )
                    .then(() => {
                      history(-1);
                      swal("Data Updated!", "Your data has been Updated!", {
                        icon: "success",
                        //  window.location.reload(false);
                      });
                    })
                    .catch((err) => {
                      alert(err);
                    });
                }}
              >
                Update
              </Button>
            </Row>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default UpdatePromReport;
