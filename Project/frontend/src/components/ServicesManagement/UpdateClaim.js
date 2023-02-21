import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import PageTitle from "../Header/PageTitle";
import "./serClaim.css";

const WarrantyClaim = () => {


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

  const [serialNo, setserialNo] = useState("");
  const [mobileModel, setmobileModel] = useState("");
  const [warrantyTill, setwarrantyTill] = useState("");
  const [customerName, setcustomerName] = useState("");
  const [contactNo, setcontactNo] = useState("");
  const [receveDate, setreceveDate] = useState("");
  const [mobileIMEI, setmobileIMEI] = useState("");
  const [technician, settechnician] = useState("");
  const [reason, setreason] = useState("");

  const { id } = useParams();

  const getClaimDetail = () => {
    axios
      .get("http://localhost:8070/SerClaim/get/" + id)
      .then((res) => {
        const updateDetails = {
          serialNo: res.data.Claim.serialNo,
          mobileModel: res.data.Claim.mobileModel,
          warrantyTill: res.data.Claim.warrantyTill,
          customerName: res.data.Claim.customerName,
          contactNo: res.data.Claim.contactNo,
          receveDate: res.data.Claim.receveDate,
          mobileIMEI: res.data.Claim.mobileIMEI,
          technician: res.data.Claim.technician,
          reason: res.data.Claim.reason,
        };

        setserialNo(updateDetails.serialNo);
        setmobileModel(updateDetails.mobileModel);
        setwarrantyTill(updateDetails.warrantyTill);
        setcustomerName(updateDetails.customerName);
        setcontactNo(updateDetails.contactNo);
        setreceveDate(updateDetails.receveDate);
        setmobileIMEI(updateDetails.mobileIMEI);
        settechnician(updateDetails.technician);
        setreason(updateDetails.reason);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => getClaimDetail(), []);
  const location = useLocation();

  const [showA, setShowA] = useState(false);


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (


    <>
      <div className="Title"><PageTitle title="Modify Warranty Claim Details"></PageTitle></div>
      <Container>

        <>
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
                  fill="yellow"
                  class="bi bi-square-fill"
                  viewBox="0 0 30 20">

                  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                </svg>
                 Record has been updated</strong></div></Modal.Title>
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

            <Form noValidate validated={validated} onSelect={handleSubmit} className="Form">

              <Row className="mb-3">
                <Form.Group as={Col} md="10" controlId="validationCustom01">
                  <Form.Label>Serial Number</Form.Label>
                  <Form.Control type="text" placeholder={serialNo} disabled />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Serial Number !!
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="10" controlId="validationCustom09">
                  <Form.Label>Mobile Model</Form.Label>
                  <Form.Control type="text" placeholder={mobileModel} disabled />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Mobile Model !!
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="10" controlId="validationCustom05">
                  <Form.Label>Warranty Expire Date</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Warranty Expire Date.."
                    defaultValue={warrantyTill}
                    onChange={(e) => {
                      setwarrantyTill(e.target.value);
                    }}
                    required />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Warranty Expire Date !!
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="10" controlId="validationCustom02">
                  <Form.Label>Customer Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Customer Name.."
                    defaultValue={customerName}
                    onChange={(e) => {
                      setcustomerName(e.target.value);
                    }}
                    required />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Customer Name !!
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="10" controlId="validationCustom03">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="Number"
                    placeholder="Contact Number.."
                    defaultValue={contactNo}
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
                <Form.Group as={Col} md="10" controlId="validationCustom04">
                  <Form.Label>Receive Date</Form.Label>
                  <Form.Control type="text" placeholder={receveDate} disabled />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Receve Date !!
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="10" controlId="validationCustom07">
                  <Form.Label>Mobile IMEI Number</Form.Label>
                  <Form.Control type="text" placeholder={mobileIMEI} disabled />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Mobile IMEI Number !!
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="10" controlId="validationCustom06">
                  <Form.Label>Technician Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Technician Name.."
                    defaultValue={technician}
                    onChange={(e) => {
                      settechnician(e.target.value);
                    }}
                    required />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid Technician Name !!
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Form.Group
                className="mb-4"
                controlId="exampleForm.ControlTextarea1"
              >
                <p>
                  <label for="w3review">Repair Reason</label>
                </p>
                <textarea
                  rows="2"
                  cols="107"
                  name="comment"
                  form="usrform"
                  placeholder=" Enter Repair Reason Here .."
                  defaultValue={reason}
                  onChange={(e) => {
                    setreason(e.target.value);
                  }}
                  required></textarea>
                <Form.Control.Feedback type="invalid">
                  Please provide a Repair Reason !!
                </Form.Control.Feedback>
              </Form.Group>
              <Row>

                {" "}
                <Button
                  id="UpSubmit1"
                  type="submit"
                  variant="outline-success"
                  onClick={(e) => {
                    e.preventDefault();
                    handleShow();

                    const newClaim = {
                      warrantyTill,
                      customerName,
                      contactNo,
                      technician,
                      reason,
                    };

                    axios
                      .put(
                        "http://localhost:8070/SerClaim/update/" + id,
                        newClaim
                      )
                      .then(() => {
                        // alert("Details Successfully Updated!");

                        //navigate("/MainClaimPage");
                      })
                      .catch((err) => {
                        alert(err.message);
                      });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="currentColor"
                    class="bi bi-arrow-up-circle"
                    viewBox="0 0 30 30"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
                  </svg>
                  Update Details
                </Button>

                <Col>
                  {" "}
                  <Button
                    as={Col}
                    id="UpSubmit2"
                    variant="outline-danger"
                    type="submit"
                    onClick={() => {
                      history(-1);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      fill="currentColor"
                      class="bi bi-arrow-90deg-left"
                      viewBox="0 0 30 30"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z" />
                    </svg>
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Container></>
  );
}
export default WarrantyClaim;
