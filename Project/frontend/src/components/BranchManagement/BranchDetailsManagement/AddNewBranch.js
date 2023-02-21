import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from "react-bootstrap";
import axios from 'axios';

import "./BranchDetails.css";
import { useNavigate } from "react-router-dom";

import swal from 'sweetalert';

const AddNewBranch = () => {

    const [branchId, setbranchId] = useState("")
    const [brLocation, setbrLocation] = useState("")
    const [brManagerId, setbrManagerId] = useState("")
    const [brEmail, setbrEmail] = useState("")
    const [brContactNo, setbrContactNo] = useState("")
    const [brCreatedDate, setbrCreatedDate] = useState("")

    const navigate = useNavigate();

    function sendData(e) {
        e.preventDefault();

        const newBbranchSchema = {
            branchId,
            brLocation,
            brManagerId,
            brEmail,
            brContactNo,
            brCreatedDate,
        };

        axios.post("http://localhost:8070/branchRoutes/add", newBbranchSchema)
            .then(() => {
                // alert("Branch Added!");
                swal("Good job!", "Branch Added!", "success");
                navigate("/branchdetails")
            })
            .catch((err) => {
                alert(err);
            });
    }

    return (
        <Container>
            <div className="BranchAdd">
                <h3>Add New Branch </h3>
                <hr />
                <div>
                    <Form onSubmit={sendData}>
                        <Form.Group className="mb-3" controlId="formBranchID">
                            <Form.Label>Branch ID</Form.Label>
                            <Form.Control placeholder="Enter Branch ID" required
                                onChange={(e) => {
                                    setbranchId(e.target.value);
                                }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" placeholder="Enter Location" required
                                onChange={(e) => {
                                    setbrLocation(e.target.value);
                                }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formManagerID">
                            <Form.Label>Manager ID</Form.Label>
                            <Form.Control placeholder="Enter Manager ID" required
                                onChange={(e) => {
                                    setbrManagerId(e.target.value);
                                }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" required
                                onChange={(e) => {
                                    setbrEmail(e.target.value);
                                }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formContactNo">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control id="contactNo" type="tel" pattern="[0-9]{10}" placeholder="Enter Contact Number" required
                                onChange={(e) => {
                                    setbrContactNo(e.target.value);
                                }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" placeholder="Enter Date" required
                                onChange={(e) => {
                                    setbrCreatedDate(e.target.value);
                                }}
                            />
                        </Form.Group>
                        <hr />
                        <Button variant="outline-success" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </Container>
    );
}

export default AddNewBranch;