import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./AdminDetails.css";

import swal from 'sweetalert';

const ViewAdminDetails = ({ onDataChange }) => {
    const [adminDetails, setAdminDetails] = useState([]);
    const [refresh, setRefresh] = useState(false)
    const [searchAd, setsearchAd] = useState("")

    function getAllAdminDetails() {
        axios.get("http://localhost:8070/adminRoutes/")
            .then((res) => {
                setAdminDetails(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }

    function deleteAdminDetails(id) {
        // if (window.confirm("Do you want to remove this admin?")) {
        //     axios.delete("http://localhost:8070/adminRoutes/delete/" + id)
        //         .then((res) => {
        //             alert("Admin removed successfully!")
        //             setRefresh(!refresh)
        //         })
        //         .catch((err) => {
        //             alert(err.message);
        //         });
        // }

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this admin!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    //true
                    axios.delete("http://localhost:8070/adminRoutes/delete/" + id)
                        .then((res) => {
                            // alert("Admin removed successfully!")
                            swal("Poof! Admin has been deleted!", {
                                icon: "success",
                            });
                            setRefresh(!refresh)
                        })
                        .catch((err) => {
                            alert(err.message);
                        });

                } else {
                    swal("Admin details are safe!");
                }
            });
    }

    useEffect(() => getAllAdminDetails(), [refresh]);
    useEffect(() => onDataChange(adminDetails), [adminDetails])

    return (
        <div className="ViewAdminTable">
            <Row>
                <Col>
                    <h3>All Admin Details </h3>
                </Col>
                <Col>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={(e) => {
                                setsearchAd(e.target.value)
                            }}
                        />
                    </Form>
                </Col>
            </Row>
            <hr />
            <div>
                <Table bordered hover responsive>
                    <thead>
                        <tr className="table-primary">
                            <th>#</th>
                            <th>Admin Id</th>
                            <th>username</th>
                            <th>NIC</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact Number</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {adminDetails.filter((val) => {
                            if (searchAd === "") {
                                return val;
                            } else if (val.adName.toLowerCase().includes(searchAd.toLowerCase()) ||
                                val.adNic.toLowerCase().includes(searchAd.toLowerCase()) ||
                                val.adUsername.toLowerCase().includes(searchAd.toLowerCase()) ||
                                val.adminId.toLowerCase().includes(searchAd.toLowerCase())) {
                                return val;
                            }
                        })
                            .map((admin, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{admin.adminId}</td>
                                    <td>{admin.adUsername}</td>
                                    <td>{admin.adNic}</td>
                                    <td>{admin.adName}</td>
                                    <td>{admin.adEmail}</td>
                                    <td>{admin.adContactNo}</td>
                                    <td>
                                        <center>
                                            <Link to={"/admindetails/update/" + admin._id}>
                                                <Button
                                                    style={{ margin: "5px" }}
                                                    variant="info"
                                                    type="submit"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        className="bi bi-pencil-square"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                                        />
                                                    </svg>
                                                </Button>
                                            </Link>
                                            <Button
                                                style={{ margin: "5px" }}
                                                variant="danger"
                                                type="submit"
                                                onClick={() => deleteAdminDetails(admin._id)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                </svg>
                                            </Button>
                                        </center>
                                    </td>
                                </tr>)}


                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default ViewAdminDetails;