import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';


import "./InvoiceDetailStyles.css";
import axios from "axios";

const AllInvoiceDetails = () => {
    const [invoicedetails, setInvoicedetails] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

    function getAllDetails() {
        axios
            .get("http://localhost:8070/SupInvoice/")
            .then((res) => {
                setInvoicedetails(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }

    useEffect(() => getAllDetails(), []);



    return (
        <Container>
            <Row>
                <Col align="right">
                    <Link to={"/AllInvoiceDetails/add"}>
                        <Button variant="primary"> + Add new invoice </Button>
                    </Link>
                </Col>
            </Row>


            <div className="AllInvoiceDetailsTable">
                <h3>All Invoice Details </h3>
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                        }}
                    />
                    <Button variant="outline-success">Search</Button>
                </Form>
                <hr />

                <div>
                    <Table bordered hover responsive>
                        <thead>
                            <tr className="table-primary">
                                <th>Invoice ID</th>
                                <th>Date</th>
                                <th>Supplier ID</th>
                                <th>Item ID</th>
                                <th>Quantity</th>
                                <th>UnitPrice</th>
                                <th>Amount</th>
                                <th>Description</th>

                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoicedetails
                                .filter((val) => {
                                    if (searchTerm === "") {
                                        return val;
                                    } else if (
                                        val.invoiceID.toLowerCase().includes(searchTerm.toLowerCase())
                                    ) {
                                        return val;
                                    }
                                })

                                .map((invoicedetailsVal) => (

                                    <tr>

                                        <td>{invoicedetailsVal.invoiceID}</td>
                                        <td>{invoicedetailsVal.invcDate.slice(0,10)}</td>
                                        <td>{invoicedetailsVal.supID}</td>
                                        <td>{invoicedetailsVal.itemID}</td>
                                        <td>{invoicedetailsVal.quantity}</td>
                                        <td>{invoicedetailsVal.unitPrice}</td>
                                        <td>{invoicedetailsVal.Amount}</td>
                                        <td>{invoicedetailsVal.description}</td>

                                        <td>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                    Select Option
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item ><Link to={"/AllInvoiceDetails/update/" + invoicedetailsVal._id}>Update</Link></Dropdown.Item>
                                                    <Dropdown.Item ><Link to={"/AllInvoiceDetails/delete/" + invoicedetailsVal._id}>Delete</Link></Dropdown.Item>
                                                    <Dropdown.Item ><Link to={"/AllInvoiceDetails/print/" + invoicedetailsVal._id}>Print</Link></Dropdown.Item>                      </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    </tr>


                                ))}


                        </tbody>
                    </Table>
                </div>
            </div>
        </Container>
    );
};

export default AllInvoiceDetails;