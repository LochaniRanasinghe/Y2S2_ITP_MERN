import React, { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./serClaim.css";
import axios from "axios";
import PageTitle from "../Header/PageTitle";

const AddClaim = () => {
  const [serialNo, setserialNo] = useState("");
  const [mobileModel, setmobileModel] = useState("");
  const [warrantyTill, setwarrantyTill] = useState("");
  const [customerName, setcustomerName] = useState("");
  const [contactNo, setcontactNo] = useState("");
  const [receveDate, setreceveDate] = useState("");
  const [mobileIMEI, setmobileIMEI] = useState("");
  const [technician, settechnician] = useState("");
  const [reason, setreason] = useState("");

  function sendData(e) {
    e.preventDefault();

    const ClaimSchema = {
      serialNo,
      mobileModel,
      warrantyTill,
      customerName,
      contactNo,
      receveDate,
      mobileIMEI,
      technician,
      reason,
    };

    axios
      .post("http://localhost:8070/SerClaim/addclaim", ClaimSchema)
      .then(() => {
        handleShow()
      })
      .catch((err) => {
        alert(err); console.log(ClaimSchema)
      });
  }

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const history = useNavigate();

  //For get the current Date
  let date = new Date().toISOString();
  let isoDate = new Date(date);

  function formatDate(thedate) {
    return (
      thedate.getFullYear() +
      "/" +
      (thedate.getMonth() + 1) +
      "/" +
      thedate.getDate()
    );
  }

  const location = useLocation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <><>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
          <Modal.Title><div className="Content"><strong className="me-auto">
              <svg xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="19"
                fill="green"
                class="bi bi-square-fill"
                viewBox="0 0 30 20">

                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
              </svg>
              Record has been Added</strong></div></Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="ndContent"> Press <strong>Done</strong> go to the records</div>
          </Modal.Body>
          <Modal.Footer>
          <div className="JustifyModel1"><Button variant="outline-success" onClick={handleClose}>
            Close
          </Button></div>
          <div className="JustifyModel2"><Button variant="outline-primary" href="/MainClaimPage">Done</Button></div>
          </Modal.Footer>
        </Modal>
      </>
      <div className="Title"><PageTitle title="Add Warranty Claim Detail"></PageTitle></div>

      <Container responsive>
        <div className="UpdateserAddForm">
          <Button
            variant="outline-secondary"
            onClick={() => {
              history(-1);
            }}
          >
            <i class="bi bi-arrow-left-circle"></i>
          </Button>
          <div>
            <div>
              <div class="container p-10 my-6">
                <Form
                  className="Form"
                  noValidate
                  validated={validated}
                  onSubmit={sendData}
                  onSubmitCapture={handleSubmit}
                >
                  <Row className="mb-3">
                    <Form.Group as={Col} md="10" controlId="validationCustom01">
                      <Form.Label>Serial Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Serial Number.."
                        required
                        onChange={(e) => {
                          setserialNo(e.target.value);
                        }} />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Serial Number !!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} md="10" controlId="validationCustom02">
                      <Form.Label>Mobile Brand</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Mobile Brand.."
                        required
                        onChange={(e) => {
                          setmobileModel(e.target.value);
                        }} />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Mobile Brand !!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} md="10" controlId="validationCustom03">
                      <Form.Label>Warranty Expire Date</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Warranty Expire Date.."
                        required
                        onChange={(e) => {
                          setwarrantyTill(e.target.value);
                        }} />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Warranty Expire Date !!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} md="10" controlId="validationCustom04">
                      <Form.Label>Customer Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Customer Name.."
                        required
                        onChange={(e) => {
                          setcustomerName(e.target.value);
                        }} />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Customer Name !!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} md="10" controlId="validationCustom05">
                      <Form.Label>Contact Number</Form.Label>
                      <Form.Control
                        type="Number"
                        placeholder="Enter Contact Number.."
                        onChange={(e) => {
                          setcontactNo(e.target.value);
                        }}
                        required />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Contact Number !!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} md="10" controlId="validationCustom06">
                      <Form.Label>Receive Date</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={formatDate(isoDate)}
                        onChange={(e) => {
                          setreceveDate(e.target.value);
                        }}
                        required />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Receve Date !!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} md="10" controlId="validationCustom07">
                      <Form.Label>Mobile IMEI Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Mobile IMEI Number.."
                        onChange={(e) => {
                          setmobileIMEI(e.target.value);
                        }}
                        required />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Mobile IMEI Number !!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} md="10" controlId="validationCustom08">
                      <Form.Label>Technician Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Technician Name.."
                        required
                        onChange={(e) => {
                          settechnician(e.target.value);
                        }} />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Technician Name !!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Form.Group
                    className="mb-4"
                    controlId="exampleForm.ControlTextarea1"
                    responsive="sm"
                  >
                    <p>
                      <label for="w3review">Repair Reason</label>
                    </p>
                    <textarea
                      responsive="sm"
                      rows="2"
                      cols="105.5"
                      name="comment"
                      placeholder=" Enter Repair Reason Here .."
                      required
                      onChange={(e) => {
                        setreason(e.target.value);
                      }}
                    ></textarea>
                    <Form.Control.Feedback type="invalid">
                      Please provide a Repair Reason !!
                    </Form.Control.Feedback>
                  </Form.Group>


                  <Row >

                    {" "}
                    <Button
                      id="UpSubmit1"
                      type="submit"
                      variant="outline-success"

                      onChange={show}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="45"
                        height="35"
                        fill="currentColor"
                        class="bi bi-arrow-bar-up"
                        viewBox="0 0 30 30"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z" />
                      </svg>
                      SUBMIT
                    </Button>

                    <Col>
                      <Button
                        id="UpSubmit2"
                        variant="outline-danger"
                        type="reset"

                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="35"
                          height="35"
                          fill="currentColor"
                          class="bi bi-arrow-counterclockwise"
                          viewBox="0 0 30 30"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
                          <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                        </svg>
                        Re-Set All
                      </Button>
                    </Col>
                  </Row>

                  <div></div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Container></>
  );
};

export default AddClaim;
