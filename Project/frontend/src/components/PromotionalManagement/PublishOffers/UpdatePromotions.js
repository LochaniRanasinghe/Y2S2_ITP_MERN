import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";


const UpdatePromotions = () => {
  const history = useNavigate();

  const [promotionId, setpromotionId] = useState("");
  const [promotionName, setpromotionName] = useState("");
  const [promoDescription, setpromoDescription] = useState("");
  const [discountPercentage, setdiscountPercentage] = useState("");
  const [issuedYear, setissuedYear] = useState("");
  const [issuedMonth, setissuedMonth] = useState("");
  const [issuedDate, setissuedDate] = useState("");
  const [dueYear, setdueYear] = useState("");
  const [dueMonth, setdueMonth] = useState("");
  const [dueDate, setdueDate] = useState("");
  const [promoConditions, setpromoConditions] = useState("");

  const { id } = useParams();

  const getPromotions = () => {
    // calling data in the backend from frontend
    axios
      .get("http://localhost:8070/OfferInfo/get/" + id)
      .then((res) => {
        const updateOffers = {
          promotionId: res.data.promotionInfo.promotionId,
          promotionName: res.data.promotionInfo.promotionName,
          promoDescription: res.data.promotionInfo.promoDescription,
          discountPercentage: res.data.promotionInfo.discountPercentage,
          issuedYear: res.data.promotionInfo.issuedYear,
          issuedMonth: res.data.promotionInfo.issuedMonth,
          issuedDate: res.data.promotionInfo.issuedDate,
          dueYear: res.data.promotionInfo.dueYear,
          dueMonth: res.data.promotionInfo.dueMonth,
          dueDate: res.data.promotionInfo.dueDate,
          promoConditions: res.data.promotionInfo.promoConditions,
        };

        setpromotionId(updateOffers.promotionId);
        setpromotionName(updateOffers.promotionName);
        setpromoDescription(updateOffers.promoDescription);
        setdiscountPercentage(updateOffers.discountPercentage);
        setissuedYear(updateOffers.issuedYear);
        setissuedMonth(updateOffers.issuedMonth);
        setissuedDate(updateOffers.issuedDate);
        setdueYear(updateOffers.dueYear);
        setdueMonth(updateOffers.dueMonth);
        setdueDate(updateOffers.dueDate);
        setpromoConditions(updateOffers.promoConditions);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => getPromotions(), []);

  return (
    <Container>
      <div className="UpdatePromotions">
        <h3>Update Promotions</h3>
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
            <Form.Group className="mb-3" controlId="formGridpromotionid">
              <Form.Label>Promotion ID</Form.Label>
              <Form.Control
                placeholder="Enter Promotion ID"
                defaultValue={promotionId}
                onChange={(e) => {
                  setpromotionId(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridpromotionname">
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

            <Form.Group className="mb-3" controlId="formGridpromotiondes">
              <Form.Label>Promotion Description</Form.Label>
              <Form.Control
                placeholder="Enter Promotion Description"
                defaultValue={promoDescription}
                onChange={(e) => {
                  setpromoDescription(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGriddiscount">
              <Form.Label>Promotion Discount</Form.Label>
              <Form.Control
                placeholder="Enter Discount"
                defaultValue={discountPercentage}
                onChange={(e) => {
                  setdiscountPercentage(e.target.value);
                }}
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridYear">
                <Form.Label>Issued Year</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Year"
                  defaultValue={issuedYear}
                  onChange={(e) => {
                    setissuedYear(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridMonth">
                <Form.Label>Issued Month</Form.Label>
                <Form.Control
                  defaultValue={issuedMonth}
                  min={1}
                  max={12}
                  onChange={(e) => {
                    setissuedMonth(e.target.value);
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

              <Form.Group as={Col} controlId="formGridDay">
                <Form.Label>Issued Day</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Day"
                  min={1}
                  max={31}
                  defaultValue={issuedDate}
                  onChange={(e) => {
                    setissuedDate(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridDueYear">
                <Form.Label>Due Year</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Year"
                  defaultValue={dueYear}
                  onChange={(e) => {
                    setdueYear(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridDueMonth">
                <Form.Label>Due Month</Form.Label>
                <Form.Control
                  defaultValue={dueMonth}
                  min={1}
                  max={12}
                  onChange={(e) => {
                    setdueMonth(e.target.value);
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

              <Form.Group as={Col} controlId="formGridDueDay">
                <Form.Label>Due Day</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Day"
                  defaultValue={dueDate}
                  min={1}
                  max={31}
                  onChange={(e) => {
                    setdueDate(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>

            <Form.Group as={Col} controlId="formGridConditions">
              <Form.Label>Promotion Conditions</Form.Label>
              <Form.Control
                placeholder="Enter Promotion Conditions"
                defaultValue={promoConditions}
                onChange={(e) => {
                  setpromoConditions(e.target.value);
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

                  const newpromo = {
                    promotionId,
                    promotionName,
                    promoDescription,
                    discountPercentage,
                    issuedYear,
                    issuedMonth,
                    issuedDate,
                    dueYear,
                    dueMonth,
                    dueDate,
                    promoConditions,
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
                      "http://localhost:8070/OfferInfo/update/" + id,
                      newpromo
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

export default UpdatePromotions;
