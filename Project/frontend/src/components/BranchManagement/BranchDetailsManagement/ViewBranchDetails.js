import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./BranchDetails.css";

import swal from 'sweetalert';

const ViewBranchDetails = ({ onDataChange }) => {
    const [branchDetails, setBranchDetails] = useState([]);
    const [refresh, setRefresh] = useState(false)
    const [searchBr, setsearchBr] = useState("")


    function getAllBranchDetails() {
        axios.get("http://localhost:8070/branchRoutes/")
            .then((res) => {
                setBranchDetails(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }

    function deleteBranchDetails(id) {
        // if (window.confirm("Do you want to delete this record?"))
        //     axios.delete("http://localhost:8070/branchRoutes/delete/" + id)
        //         .then((res) => {
        //             alert("One branch deleted successfully!")
        //             setRefresh(!refresh)
        //         })
        //         .catch((err) => {
        //             alert(err.message);
        //         });

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this branch!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    //true
                    axios.delete("http://localhost:8070/branchRoutes/delete/" + id)
                        .then((res) => {
                            // alert("One branch deleted successfully!")
                            swal("Poof! Branch has been deleted!", {
                                icon: "success",
                            });
                            setRefresh(!refresh)
                        })
                        .catch((err) => {
                            alert(err.message);
                        });

                } else {
                    swal("Branch details are safe!");
                }
            });
    }

    useEffect(() => getAllBranchDetails(), [refresh]);
    useEffect(() => onDataChange(branchDetails), [branchDetails])


    return (
        <div className="ViewBranchTable">
            <Row>
                <Col>
                    <h3>All Branch Details </h3>
                </Col>
                <Col>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={(e) => {
                                setsearchBr(e.target.value)
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
                            <th>Branch Id</th>
                            <th>Location</th>
                            <th>Manager ID</th>
                            <th>Email</th>
                            <th>Contact Number</th>
                            <th>Created Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {branchDetails.filter((val) => {
                            if (searchBr === "") {
                                return val;
                            } else if (val.brLocation.toLowerCase().includes(searchBr.toLowerCase()) ||
                                val.brEmail.toLowerCase().includes(searchBr.toLowerCase()) ||
                                val.branchId.toLowerCase().includes(searchBr.toLowerCase()) ||
                                val.brManagerId.toLowerCase().includes(searchBr.toLowerCase()) ||
                                val.brContactNo.toLowerCase().includes(searchBr.toLowerCase())) {
                                return val;
                            }
                        })
                            .map((branch, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{branch.branchId}</td>
                                    <td>{branch.brLocation}</td>
                                    <td>{branch.brManagerId}</td>
                                    <td>{branch.brEmail}</td>
                                    <td>{branch.brContactNo}</td>
                                    <td>{branch.brCreatedDate}</td>
                                    <td>
                                        <center> <Link to={"/branchdetails/update/" + branch._id}>
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
                                                onClick={() => deleteBranchDetails(branch._id)}
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

export default ViewBranchDetails;