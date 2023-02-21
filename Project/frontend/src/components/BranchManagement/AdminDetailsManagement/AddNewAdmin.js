import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from "react-bootstrap";
import "./AdminDetails.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import swal from 'sweetalert';

const AddNewAdmin = () => {

    const [adminId, setadminId] = useState("")
    const [adUsername, setadUsername] = useState("")
    const [adNic, setadNic] = useState("")
    const [adName, setadName] = useState("")
    const [adEmail, setadEmail] = useState("")
    const [adContactNo, setadContactNo] = useState("")
    const [adPassword, setadPassword] = useState("")

    const navigate = useNavigate();

    function sendData(e) {
        e.preventDefault();

        const newAdminSchema = {
            adminId,
            adUsername,
            adNic,
            adName,
            adEmail,
            adContactNo,
            adPassword,
        };

        axios.post("http://localhost:8070/adminRoutes/reg", newAdminSchema)
            .then(() => {
                // alert("New Admin Registered!");
                swal("Good job!", "New Admin Registered!", "success");
                navigate("/admindetails")
            })
            .catch((err) => {
                alert(err);
            });
    }
    return (
        <Container>
            <div className="AdminAdd">
                <h3>Register Admin </h3>
                <hr />
                <div>
                    <Form onSubmit={sendData}>
                        <Form.Group className="mb-3" controlId="formBranchID">
                            <Form.Label>Admin ID</Form.Label>
                            <Form.Control placeholder="Enter Admin ID"
                                required
                                onChange={(e) => {
                                    setadminId(e.target.value);
                                }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter Username" required
                                onChange={(e) => {
                                    setadUsername(e.target.value);
                                }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formNic">
                            <Form.Label>NIC</Form.Label>
                            <Form.Control placeholder="Enter NIC" required
                                onChange={(e) => {
                                    setadNic(e.target.value);
                                }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" required
                                onChange={(e) => {
                                    setadName(e.target.value);
                                }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" required
                                onChange={(e) => {
                                    setadEmail(e.target.value);
                                }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formContactNo">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control id="contactNo" type="tel" pattern="[0-9]{10}" placeholder="Enter Contact Number" required
                                onChange={(e) => {
                                    setadContactNo(e.target.value);
                                }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required
                                onChange={(e) => {
                                    setadPassword(e.target.value);
                                }} />
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

export default AddNewAdmin;