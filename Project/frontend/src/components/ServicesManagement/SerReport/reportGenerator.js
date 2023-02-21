import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Button, Card, Container, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useReactToPrint } from 'react-to-print';
import '../ScrPrint.css'

function DarkExample() {

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Claim Receipt",
        // onAfterPrint: () => history(-1),
    });
    const [claimDetailsFixing, setAllClaimdetailsFixing] = useState([]);
    const [filtedArray, setfiltedArray] = useState([]);
    useEffect(() => {

        function getAllClaimFixing() {
            axios
                .get("http://localhost:8070/SerClaim/service/Fixing-count")
                .then(res => {
                    setAllClaimdetailsFixing(res.data)
                })
                .catch(() => {
                    alert("Check The Connectivity");
                });
        }
        getAllClaimFixing()
    }, []);

    let Colcount = 0;
    let Fixcount1 = 0;
    let Fixcount2 = 0;
    let Fixcount3 = 0;
    let Clacount = 0;
    let total = 0;

    let date = new Date().toISOString();
    let isoDate = new Date(date);

    function formatDate(thedate) {
        return (
            thedate.getFullYear() +
            "/" +
            (thedate.getMonth() + 1) +
            "/" +
            thedate.getDate()
        );
    }

    function getCountForEachStatus(model, status) {
        let counter = 0;
        claimDetailsFixing?.map((claimDetailsVal) => {

            if (claimDetailsVal._id.mobileModel === model) {

                if (claimDetailsVal._id.status === status) {

                    // console.log(claimDetailsVal.Count)
                    ++counter
                }
            }
        })
        return counter;
    }

    const displyItemsCount = () => {
        let apple = {
            mobileModel: "",
            claimed: 0,
            collect: 0,
            fixing: 0
        }

        let samsung = {
            mobileModel: "",
            claimed: 0,
            collect: 0,
            fixing: 0
        }

        let htc = {
            mobileModel: "",
            claimed: 0,
            collect: 0,
            fixing: 0
        }

        let huawei = {
            mobileModel: "",
            claimed: 0,
            collect: 0,
            fixing: 0
        }

        claimDetailsFixing.map((data) => {
            if (data._id.status === "CLAIMED") {
                switch (data._id.mobileModel) {
                    case "Apple":
                        apple.mobileModel = "Apple";
                        apple.claimed = data.Count;
                        break;
                    case "HTC":
                        htc.mobileModel = "HTC";
                        htc.claimed = data.Count;
                        break;
                    case "Huawei":
                        huawei.mobileModel = "Huawei";
                        huawei.claimed = data.Count;
                        break;
                    case "Samsung":
                        samsung.mobileModel = "Samsung";
                        samsung.claimed = data.Count;
                        break;
                    default:
                        break;
                }

            } else if (data._id.status === "COLLECT") {

                switch (data._id.mobileModel) {
                    case "Apple":
                        apple.mobileModel = "Apple";
                        apple.collect = data.Count;
                        break;
                    case "HTC":
                        htc.mobileModel = "HTC";
                        htc.collect = data.Count;
                        break;
                    case "Huawei":
                        huawei.mobileModel = "Huawei";
                        huawei.collect = data.Count;
                        break;
                    case "Samsung":
                        samsung.mobileModel = "Samsung";
                        samsung.collect = data.Count;
                        break;
                    default:
                        break;
                }
            } else if (data._id.status === "FIXING") {
                switch (data._id.mobileModel) {
                    case "Apple":
                        apple.mobileModel = "Apple";
                        apple.fixing = data.Count;
                        break;
                    case "HTC":
                        htc.mobileModel = "HTC";
                        htc.fixing = data.Count;
                        break;
                    case "Huawei":
                        huawei.mobileModel = "Huawei";
                        huawei.fixing = data.Count;
                        break;
                    case "Samsung":
                        samsung.mobileModel = "Samsung";
                        samsung.fixing = data.Count;
                        break;
                    default:
                        break;
                }
            }
        });

        return (
            <tbody className='text-center'>
                <tr>
                    <td className='text-start'>{apple.mobileModel}</td>
                    <td>{apple.claimed}</td>
                    <td>{apple.collect}</td>
                    <td>{apple.fixing}</td>
                    <td>{apple.claimed + apple.collect + apple.fixing}</td>
                </tr>
                <tr>
                    <td className='text-start'>{htc.mobileModel}</td>
                    <td>{htc.claimed}</td>
                    <td>{htc.collect}</td>
                    <td>{htc.fixing}</td>
                    <td>{htc.claimed + htc.collect + htc.fixing}</td>
                </tr>
                <tr>
                    <td className='text-start'>{huawei.mobileModel}</td>
                    <td>{huawei.claimed}</td>
                    <td>{huawei.collect}</td>
                    <td>{huawei.fixing}</td>
                    <td>{huawei.claimed + huawei.collect + huawei.fixing}</td>
                </tr>
                <tr>
                    <td className='text-start'>{samsung.mobileModel}</td>
                    <td>{samsung.claimed}</td>
                    <td>{samsung.collect}</td>
                    <td>{samsung.fixing}</td>
                    <td>{samsung.claimed + samsung.collect + samsung.fixing}</td>
                </tr>
                <tr>
                    <td className='text-start'>Total Summary</td>
                    <td>{apple.claimed + htc.claimed + huawei.claimed + samsung.claimed}</td>
                    <td>{apple.collect + htc.collect + huawei.collect + samsung.collect}</td>
                    <td>{apple.fixing + htc.fixing + huawei.fixing + samsung.fixing}</td>
                    <td>{apple.claimed + apple.collect + apple.fixing + htc.claimed +
                        htc.collect + htc.fixing + huawei.claimed + huawei.collect +
                        huawei.fixing + samsung.claimed + samsung.collect + samsung.fixing}</td>
                </tr>
            </tbody>
        );


    }

    return (

        <Container>


            <div className="oidprintMain" ref={componentRef}>
                <div className="compdetails">
                    <h1>Company</h1>
                    <p1><svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" fill="currentColor" class="bi bi-building" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z" />
                        <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z" />
                    </svg>Wireless Waves</p1>
                    <br></br>
                    <p3><svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" fill="currentColor" class="bi bi-signpost-split" viewBox="0 0 16 16">
                        <path d="M7 7V1.414a1 1 0 0 1 2 0V2h5a1 1 0 0 1 .8.4l.975 1.3a.5.5 0 0 1 0 .6L14.8 5.6a1 1 0 0 1-.8.4H9v10H7v-5H2a1 1 0 0 1-.8-.4L.225 9.3a.5.5 0 0 1 0-.6L1.2 7.4A1 1 0 0 1 2 7h5zm1 3V8H2l-.75 1L2 10h6zm0-5h6l.75-1L14 3H8v2z" />
                    </svg>123,Adreess,Adress</p3>
                    <br></br>
                    <p3><svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" fill="currentColor" class="bi bi-envelope-check" viewBox="0 0 16 16">
                        <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" />
                        <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z" />
                    </svg>wirelesswaves@gmail.com</p3>
                    <br></br>
                    <p3><svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" fill="currentColor" class="bi bi-phone-vibrate" viewBox="0 0 16 16">
                        <path d="M10 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4zM6 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6z" />
                        <path d="M8 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM1.599 4.058a.5.5 0 0 1 .208.676A6.967 6.967 0 0 0 1 8c0 1.18.292 2.292.807 3.266a.5.5 0 0 1-.884.468A7.968 7.968 0 0 1 0 8c0-1.347.334-2.619.923-3.734a.5.5 0 0 1 .676-.208zm12.802 0a.5.5 0 0 1 .676.208A7.967 7.967 0 0 1 16 8a7.967 7.967 0 0 1-.923 3.734.5.5 0 0 1-.884-.468A6.967 6.967 0 0 0 15 8c0-1.18-.292-2.292-.807-3.266a.5.5 0 0 1 .208-.676zM3.057 5.534a.5.5 0 0 1 .284.648A4.986 4.986 0 0 0 3 8c0 .642.12 1.255.34 1.818a.5.5 0 1 1-.93.364A5.986 5.986 0 0 1 2 8c0-.769.145-1.505.41-2.182a.5.5 0 0 1 .647-.284zm9.886 0a.5.5 0 0 1 .648.284C13.855 6.495 14 7.231 14 8c0 .769-.145 1.505-.41 2.182a.5.5 0 0 1-.93-.364C12.88 9.255 13 8.642 13 8c0-.642-.12-1.255-.34-1.818a.5.5 0 0 1 .283-.648z" />
                    </svg>011-2955152</p3>
                    <hr></hr>
                </div>
                <h1>Warranty Claim Report</h1>
                <Card border="warning" style={{ width: '67rem' }}>
                    {/* <Card.Header></Card.Header> */}
                    <Card.Body>

                        {/* Table start */}


                        <Table striped bordered hover size="lg" responsive="xl">
                            <thead className='text-center'>
                                <tr>
                                    <th>Mobile Model</th>
                                    <th>Claimed</th>
                                    <th>Collect</th>
                                    <th>Fixing</th>
                                    <th>Total Count</th>
                                </tr>
                            </thead>
                            {
                                displyItemsCount()
                            }
                        </Table>

                        {/* TableEnd */}

                    </Card.Body>
                </Card >

                <br></br>
                <div>
                    <p><svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
                        <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                        <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
                    </svg>
                        Issue Date: {formatDate(isoDate)}
                        <p className='w-100 text-center'>© Copyright © 2022 All rights reserved</p>
                    </p>

                </div>

            </div>
            <br />

            <Row style={{ margin: "10px" }}>
                <Button variant="outline-success" onClick={handlePrint}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="38"
                        height="35"
                        fill="currentColor"
                        class="bi bi-file-pdf"
                        viewBox="0 0 10 19"
                    >
                        <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1
                         1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                        <path d="M4.603 12.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.701 19.701 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.716 5.716 0 0 1-.911-.95 11.642 11.642 0 0 0-1.997.406 11.311 11.311 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.27.27 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.647 12.647 0 0 1 1.01-.193 11.666 11.666 0 0 1-.51-.858 20.741 20.741 0 0 1-.5 1.05zm2.446.45c.15.162.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.881 3.881 0 0 0-.612-.053zM8.078 5.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z" />
                    </svg>
                    Print
                </Button>
            </Row>

        </Container >
    );
}

export default DarkExample;