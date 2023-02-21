import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import "./serClaim.css";

const GetAllWD = () => {

  const [dropdown, setDropdown] = useState("COLLECT");

  async function handleUpdateStatus(id, value) {
    console.log(id, value);

    axios
      .patch(
        `http://localhost:8070/SerClaim/update/${id}`,
        {
          status: value,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => {
        // alert("Details Successfully Updated!");
        window.location.reload(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  const [claimDetails, setAllClaimdetails] = useState([]);
  const [searchDetail, setsearchDetail] = useState("");

  function getAllClaimDetails() {
    axios
      .get("http://localhost:8070/SerClaim/getAll")
      .then((res) => {
        console.log(res);
        setAllClaimdetails(res.data.Claim);
      })
      .catch(() => {
        alert("Check The Connectivity");
      });
  }

  useEffect(() => getAllClaimDetails(), []);

  function deleteClaimDetail(id) {
    // if (window.confirm("Are You Sure Want To Delete?")) {
    axios
      .delete("http://localhost:8070/SerClaim/delete/" + id)
      .then(() => {
        // alert("Document Delete Successfully!");
        window.location.reload(false);
      })
      .catch(() => {
        alert("Error Occurred On Delete");
      });
    // }
  }
  const ColoredLine = () => (
    <hr
      style={{
        color: "#F0FFFF",
        backgroundColor: "#7FFFD4",
        height: 105,
        width: 190,
      }}
    />
  );

  const [showA, setShowA] = useState(false);

  const toggleShowA = () => setShowA(!showA);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container>
      <div div className="UpdateIncomeAddForm" >
        <div>

          <Row>
            <Col>
              <Link to={"/ClaimHome/AddClaim"}>
                <Button
                  style={{ margin: "3px" }}
                  variant="outline-success"
                  type="submit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="38"
                    height="45"
                    fill="currentColor"
                    class="bi bi-plus-circle"
                    viewBox="0 0 20 19"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>{" "}
                  Add a New Claim Detail
                </Button>
              </Link>{" "}
            </Col>
            <Col>
              <Form className="d-flex">
                <Form.Control
                  id="SerClaimSerch"
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  responsive
                  onChange={(e) => {
                    setsearchDetail(e.target.value);
                  }}
                />
                <Button responsive variant="outline-success">Search</Button>
              </Form>
            </Col>
          </Row>
          <div class="container p-3 my-3 bg-light text-white">
            <Container fluid="sm">
              {claimDetails
                ?.filter((val) => {
                  if (searchDetail === " ") {
                    return val;
                  } else if (
                    val.customerName
                      .toLowerCase()
                      .includes(searchDetail.toLowerCase()) ||
                    val.serialNo
                      .toLowerCase()
                      .includes(searchDetail.toLowerCase()) ||
                    val.status
                      .toLowerCase()
                      .includes(searchDetail.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((claimDetailsVal) => (
                  <Accordion responsive>
                    <div class="container p-0 my-1">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          <Container fluid="sm">
                            <Row>
                              <Col xs lg="35">
                                <h4>
                                  {" "}
                                  <Badge bg="secondary">
                                    Serial Number - {claimDetailsVal.serialNo}
                                  </Badge>
                                  <Badge bg="">
                                    <br></br>
                                  </Badge>
                                </h4>
                              </Col>
                              <Col xs="auto">
                                <h4>
                                  <Badge bg="">
                                    <br></br>
                                  </Badge>{" "}
                                  <Badge bg="secondary">
                                    Receive Date - {claimDetailsVal.receveDate}{" "}
                                  </Badge>
                                  <Badge bg="">
                                    <br></br>
                                  </Badge>
                                </h4>
                              </Col>
                              <Col xs="auto">
                                <h4>
                                  <Badge bg="">
                                    <br></br>
                                  </Badge>{" "}
                                  <Badge bg="light">
                                    {" "}
                                    {claimDetailsVal.status}
                                  </Badge>
                                  <Badge bg="">
                                    <br></br>
                                  </Badge>
                                </h4>
                              </Col>
                            </Row>
                          </Container>
                        </Accordion.Header>

                        <Accordion.Body>
                          <div class="card border-info mb-3">

                            <Row>
                              <Col md={6} className="mb-2" >
                                <ToastContainer className="p-3" position="middle-center" onClickCapture={showA} animation="true" style={{ margin: "1px" }} responsive>
                                  <Toast show={showA} onClose={toggleShowA} >
                                    <Toast.Header>
                                      <img
                                        src="holder.js/20x20?text=%20"
                                        className="rounded me-2"
                                        alt=""
                                      /><svg xmlns="http://www.w3.org/2000/svg"
                                        width="30"
                                        height="20"
                                        fill="red"
                                        class="bi bi-square-fill"
                                        viewBox="0 0 30 15">

                                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
                                      </svg>
                                      <strong className="me-auto">File is going to be remove</strong>
                                      <small></small>
                                    </Toast.Header>
                                    <Toast.Body><div className="Alignment">Delete : Press <strong>Delete</strong> To confirm</div></Toast.Body>
                                    <div className="Cbtn">
                                      <Row>
                                        <Col>
                                          {" "}
                                          <Button
                                            type="submit"
                                            variant="outline-danger"
                                            className="retrivebtn"
                                            onClick={() =>
                                              deleteClaimDetail(claimDetailsVal._id)
                                            }
                                          >

                                            <svg xmlns="http://www.w3.org/2000/svg"
                                              width="90"
                                              height="23"
                                              fill="currentColor"
                                              class="bi bi-file-earmark-x-fill"
                                              viewBox="0 0 20 20">
                                              <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z" />
                                            </svg>
                                            Delete
                                          </Button>
                                        </Col>
                                        <Col responsive>
                                          <Button
                                            variant="outline-success"
                                            type="reset"
                                            className="retrivebtn"
                                            onClick={toggleShowA}

                                          >
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                              width="90"
                                              height="23"
                                              fill="currentColor"
                                              class="bi bi-x-square-fill"
                                              viewBox="0 0 19 21">
                                              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                                            </svg>
                                            Cancel
                                          </Button>
                                        </Col>
                                      </Row><br></br>
                                    </div>
                                  </Toast>
                                </ToastContainer>
                              </Col>
                            </Row>


                            <Card style={{ margin: 10 }}>
                              <Card.Header style={{ display: "flex" }}>
                                <span
                                  style={{
                                    color: "black",
                                    textDecoration: "none",
                                    flex: "1",
                                    cursor: "pointer",
                                    alignSelf: "center",
                                    fontSize: "18",
                                  }}
                                ></span>

                                <div>
                                  <Link
                                    to={
                                      "/ClaimHome/UpdateClaim/" +
                                      claimDetailsVal._id
                                    }
                                  >
                                    <Button
                                      style={{ margin: "5px" }}
                                      variant="outline-info"
                                      type="submit"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="28"
                                        height="35"
                                        fill="currentColor"
                                        class="bi bi-pencil-square"
                                        viewBox="0 0 20 19"
                                      >
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path
                                          fill-rule="evenodd"
                                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                        />
                                      </svg>
                                      Edit Detail
                                    </Button>
                                  </Link>
                                  <Link
                                    to={
                                      "/ClaimHome/PrintClaim/" +
                                      claimDetailsVal._id
                                    }
                                  >
                                    <Button
                                      style={{ margin: "5px" }}
                                      variant="outline-warning"
                                      type="submit"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="28"
                                        height="35"
                                        fill="currentColor"
                                        class="bi bi-file-earmark-arrow-down-fill"
                                        viewBox="0 0 20 19"
                                      >
                                        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0z" />
                                      </svg>
                                      Print Detail
                                    </Button>
                                  </Link>

                                  <Link to={"/MainClaimPage"}>
                                    <Button
                                      style={{ margin: "5px" }}
                                      variant="outline-danger"
                                      type="submit"
                                      onClick={toggleShowA}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="28"
                                        height="35"
                                        fill="currentColor"
                                        class="bi bi-trash-fill"
                                        viewBox="0 0 20 19"
                                      >
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                      </svg>
                                      Delete detail
                                    </Button>
                                  </Link>
                                </div>
                              </Card.Header>
                              <Card.Body>
                                <div class="container p-3 my-3 bg-light text-dark">
                                  <blockquote className="blockquote mb-0">
                                    <p>
                                      <Table striped bordered hover responsive>
                                        <thead>
                                          <tr>
                                            <th>Mobile IMEI </th>
                                            <th>Model Name </th>
                                            <th>Warranty Expire </th>
                                            <th>Technician Name </th>
                                            <th>status</th>
                                          </tr>
                                        </thead>

                                        <tbody>
                                          <tr>
                                            <td>
                                              <h4>
                                                <Badge bg="secondary">
                                                  {claimDetailsVal.mobileIMEI}
                                                </Badge>
                                              </h4>
                                            </td>

                                            <td>
                                              {claimDetailsVal.mobileModel}
                                            </td>
                                            <td>
                                              {claimDetailsVal.warrantyTill}
                                            </td>
                                            <td>
                                              {claimDetailsVal.technician}
                                            </td>

                                            <td>
                                              <Row className="mb-1">


                                                <div class="input-group mb-3">
                                                  <select
                                                    class="form-select"
                                                    id="inputGroupSelect01"
                                                    value={dropdown}
                                                    onChange={(e) => {
                                                      setDropdown(
                                                        e.target.value
                                                      );

                                                      handleUpdateStatus(
                                                        claimDetailsVal._id,
                                                        e.target.value
                                                      );
                                                    }}
                                                  >
                                                    <option value="COLLECT">
                                                      {claimDetailsVal.status}
                                                    </option>
                                                    {ColoredLine()}
                                                    <option value="COLLECT">
                                                      COLLECT
                                                    </option>
                                                    <option value="FIXING">
                                                      FIXING
                                                    </option>
                                                    <option value="CLAIMED">
                                                      CLAIMED
                                                    </option>
                                                  </select>
                                                </div>

                                              </Row>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </Table>

                                      <Form>
                                        <fieldset disabled>
                                          <Form.Group className="mb-2">
                                            <Form.Label htmlFor="disabledTextInput">
                                              Customer Name
                                            </Form.Label>
                                            <Form.Control
                                              id="disabledTextInput"
                                              placeholder={
                                                claimDetailsVal.customerName
                                              }
                                            />
                                            <Form.Label htmlFor="disabledTextInput">
                                              Customer Contact
                                            </Form.Label>
                                            <Form.Control
                                              id="disabledTextInput"
                                              placeholder={
                                                claimDetailsVal.contactNo
                                              }
                                            />

                                            <Form.Label htmlFor="disabledTextInput">
                                              Claim Reason
                                            </Form.Label>
                                            <Form.Control
                                              id="disabledTextInput"
                                              placeholder={
                                                claimDetailsVal.reason
                                              }
                                            />
                                          </Form.Group>{" "}
                                        </fieldset>
                                      </Form>
                                    </p>
                                  </blockquote>
                                </div>
                              </Card.Body>
                            </Card>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <br />
                      <br />
                    </div>
                  </Accordion>
                ))}
            </Container>
          </div>
        </div>
      </div >
    </Container >
  );
};

export default GetAllWD;
