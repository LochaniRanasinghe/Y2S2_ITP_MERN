import React, { useState } from 'react'
import { Button, Container, Col, Row } from 'react-bootstrap'
import PageTitle from '../../Header/PageTitle'
import { Link } from "react-router-dom";
import ViewAdminDetails from './ViewAdminDetails';
import printPDF from '../../../utils/printPDF';

const MainAdminDetails = () => {
    const [data, setData] = useState([]);

    const onDataChange = (data) => {
        let customDataMap = data.map((obj, index) => {
            return { "#": index + 1, "Admin ID": obj.adminId, "Username": obj.adUsername, "NIC": obj.adNic, "Name": obj.adName, "Email": obj.adEmail, "Contact Number": obj.adContactNo }
        })
        setData(customDataMap);
    };

    return (
        <PageTitle title="Admin Details...">
            <Container>
                <div>
                    <Row>
                        <Col xs={6} md={4}>
                            <Link to={"/admindetails/add"}>
                                <Button
                                    style={{ margin: "5px" }}
                                    variant="primary"
                                    type="submit"
                                >
                                    <svg style={{ marginRight: "10px" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                    </svg>
                                    Admin Register
                                </Button>
                            </Link>
                        </Col>
                        <Col align="end">
                            <Button
                                style={{ margin: "5px" }}
                                variant="warning"
                                onClick={() => printPDF(data, "Admin Details", "adminDetails")}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                                </svg>
                            </Button>
                        </Col>
                    </Row>
                </div>
                <ViewAdminDetails onDataChange={onDataChange} />
            </Container>
        </PageTitle>
    )
}

export default MainAdminDetails