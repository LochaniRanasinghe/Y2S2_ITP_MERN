import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

import "./BranchDetails.css";

import swal from 'sweetalert';

const UpdateBranchDetails = () => {

    const [branchId, setbranchId] = useState("")
    const [brLocation, setbrLocation] = useState("")
    const [brManagerId, setbrManagerId] = useState("")
    const [brEmail, setbrEmail] = useState("")
    const [brContactNo, setbrContactNo] = useState("")
    const [brCreatedDate, setbrCreatedDate] = useState("")

    const navigate = useNavigate();

    const { id } = useParams();

    const getBranchDetails = () => {
        axios.get("http://localhost:8070/branchRoutes/get/" + id)
            .then((res) => {
                const updateDetails = {
                    branchId: res.data.BrnBranch.branchId,
                    brLocation: res.data.BrnBranch.brLocation,
                    brManagerId: res.data.BrnBranch.brManagerId,
                    brEmail: res.data.BrnBranch.brEmail,
                    brContactNo: res.data.BrnBranch.brContactNo,
                    brCreatedDate: res.data.BrnBranch.brCreatedDate,

                };

                setbranchId(updateDetails.branchId);
                setbrLocation(updateDetails.brLocation);
                setbrManagerId(updateDetails.brManagerId);
                setbrEmail(updateDetails.brEmail);
                setbrContactNo(updateDetails.brContactNo);
                setbrCreatedDate(updateDetails.brCreatedDate);
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    useEffect(() => getBranchDetails(), []);

    return (
        <Container>
            <div className="UpdateBranch">
                <h3>Update Branch Details</h3>
                <hr />
                <div>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBranchID">
                            <Form.Label>Branch ID</Form.Label>
                            <Form.Control
                                defaultValue={branchId}
                                disabled />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={brLocation}
                                disabled />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formManagerID">
                            <Form.Label>Manager ID</Form.Label>
                            <Form.Control
                                defaultValue={brManagerId}
                                onChange={(e) => {
                                    setbrManagerId(e.target.value);
                                }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                defaultValue={brEmail}
                                onChange={(e) => {
                                    setbrEmail(e.target.value);
                                }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formContactNo">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control
                                id="contactNo" type="tel" pattern="[0-9]{10}"
                                defaultValue={brContactNo}
                                onChange={(e) => {
                                    setbrContactNo(e.target.value);
                                }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDate">
                            <Form.Label>Created Date</Form.Label>
                            <Form.Control
                                type="date"
                                defaultValue={brCreatedDate}
                                disabled />
                        </Form.Group>
                        <hr />
                        <Link to={"/branchdetails"}>
                            <Button variant="outline-success" type="submit"
                                onClick={(e) => {
                                    e.preventDefault();

                                    const newBbranchSchema = {
                                        branchId,
                                        brLocation,
                                        brManagerId,
                                        brEmail,
                                        brContactNo,
                                        brCreatedDate,
                                    };

                                    axios.put("http://localhost:8070/branchRoutes/update/" + id, newBbranchSchema)
                                        .then(() => {
                                            // alert("Branch Updated!");
                                            swal("Good job!", "Branch Details Updated!", "success");
                                            navigate("/branchdetails")
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

export default UpdateBranchDetails;