import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

import "./AdminDetails.css";

import swal from 'sweetalert';

const UpdateAdminDetails = () => {

    const [adminId, setadminId] = useState("")
    const [adUsername, setadUsername] = useState("")
    const [adNic, setadNic] = useState("")
    const [adName, setadName] = useState("")
    const [adEmail, setadEmail] = useState("")
    const [adContactNo, setadContactNo] = useState("")
    const [adPassword, setadPassword] = useState("")

    const navigate = useNavigate();

    const { id } = useParams();

    const getAdminDetails = () => {
        axios.get("http://localhost:8070/adminRoutes/get/" + id)
            .then((res) => {
                const updateDetails = {
                    adminId: res.data.BrnAdmin.adminId,
                    adUsername: res.data.BrnAdmin.adUsername,
                    adNic: res.data.BrnAdmin.adNic,
                    adName: res.data.BrnAdmin.adName,
                    adEmail: res.data.BrnAdmin.adEmail,
                    adContactNo: res.data.BrnAdmin.adContactNo,

                };

                setadminId(updateDetails.adminId);
                setadUsername(updateDetails.adUsername);
                setadNic(updateDetails.adNic);
                setadName(updateDetails.adName);
                setadEmail(updateDetails.adEmail);
                setadContactNo(updateDetails.adContactNo);

            })
            .catch((err) => {
                alert(err.message);
            });
    };

    useEffect(() => getAdminDetails(), []);

    return (
        <Container>
            <div className="UpdateAdmin">
                <h3>Update Admin Details</h3>
                <hr />
                <div>
                    <Form>
                        <Form.Group className="mb-3" controlId="formAdminID">
                            <Form.Label>Admin ID </Form.Label>
                            <Form.Control
                                defaultValue={adminId}
                                disabled />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>username</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={adUsername}
                                onChange={(e) => {
                                    setadUsername(e.target.value);
                                }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formNic">
                            <Form.Label>NIC</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={adNic}
                                disabled />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={adName}
                                disabled />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                defaultValue={adEmail}
                                onChange={(e) => {
                                    setadEmail(e.target.value);
                                }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formContactNo">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control
                                id="contactNo" type="tel" pattern="[0-9]{10}"
                                defaultValue={adContactNo}
                                onChange={(e) => {
                                    setadContactNo(e.target.value);
                                }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                defaultValue={adPassword}
                                onChange={(e) => {
                                    setadPassword(e.target.value);
                                }} />
                        </Form.Group>
                        <hr />

                        <Link to={"/admindetails"}>
                            <Button variant="outline-success" type="submit"
                                onClick={(e) => {
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

                                    axios.put("http://localhost:8070/adminRoutes/update/" + id, newAdminSchema)
                                        .then(() => {
                                            // alert("Admin Details Updated!");
                                            swal("Good job!", "Admin Details Updated!", "success");
                                            navigate("/admindetails")
                                        })
                                        .catch((err) => {
                                            alert(err);
                                        });

                                }}>
                                Update
                            </Button>
                        </Link>
                    </Form>
                </div>
            </div>
        </Container>
    );
}

export default UpdateAdminDetails;