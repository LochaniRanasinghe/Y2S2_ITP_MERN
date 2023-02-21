import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import "./ScrPrint.css";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import PageTitle from "../Header/PageTitle";

const PrintClaim = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Claim Receipt",
    onAfterPrint: () => history(-1),
  });

  const [serialNo, setserialNo] = useState("");
  const [mobileModel, setmobileModel] = useState("");
  const [warrantyTill, setwarrantyTill] = useState("");
  const [customerName, setcustomerName] = useState("");
  const [contactNo, setcontactNo] = useState("");
  const [receveDate, setreceveDate] = useState("");
  const [mobileIMEI, setmobileIMEI] = useState("");
  const [reason, setreason] = useState("");

  const { id } = useParams();
  const history = useNavigate();

  const getClaimDetail = () => {
    axios
      .get("http://localhost:8070/SerClaim/get/" + id)
      .then((res) => {
        const updateDetails = {
          serialNo: res.data.Claim.serialNo,
          mobileModel: res.data.Claim.mobileModel,
          warrantyTill: res.data.Claim.warrantyTill,
          customerName: res.data.Claim.customerName,
          contactNo: res.data.Claim.contactNo,
          receveDate: res.data.Claim.receveDate,
          mobileIMEI: res.data.Claim.mobileIMEI,
          reason: res.data.Claim.reason,
        };

        setserialNo(updateDetails.serialNo);
        setmobileModel(updateDetails.mobileModel);
        setwarrantyTill(updateDetails.warrantyTill);
        setcustomerName(updateDetails.customerName);
        setcontactNo(updateDetails.contactNo);
        setreceveDate(updateDetails.receveDate);
        setmobileIMEI(updateDetails.mobileIMEI);
        setreason(updateDetails.reason);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

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

  useEffect(() => getClaimDetail(), []);
  const location = useLocation();

  return (

    <>
      <div className="Title"><PageTitle title="Print Claim Detail"></PageTitle></div>
      <Container className="printFormOut" responsive>
        <div className="oidprintMain" ref={componentRef}>
          <h1>MOBILE PHONE REPAIR</h1>
          <></>
          <h1>INVOICE</h1>
          <div className="compdetails">
            <h1>Company Name</h1><br></br>
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
            <br></br>
          </div>

          <div className="bpayeedetails">
            <p1><svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="currentColor" class="bi bi-record-fill" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10z" />
            </svg>Serial Number : {serialNo}</p1>
            <br></br>
            <p3><svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="currentColor" class="bi bi-record-fill" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10z" />
            </svg>Warranty Expire Date : {warrantyTill}</p3>
            <br></br>
            <p3><svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="currentColor" class="bi bi-record-fill" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10z" />
            </svg>Customer Name : {customerName}</p3>
            <br></br>
            <p3><svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="currentColor" class="bi bi-record-fill" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10z" />
            </svg>Customer Contact : {contactNo}</p3>
          </div>

          <div className="bpayeeTable">
            <hr></hr><br></br>
            <Table responsive="xl" bordered>
              <thead>
                <tr>
                  <th>Mobile Model</th> <th>Claim Reson</th> <th>Receive Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{mobileModel}</td>
                  <td>{reason}</td>
                  <td>{receveDate}</td>
                </tr>
              </tbody>
            </Table>
          </div>

          <div>
            <p><svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
              <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
              <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
            </svg>
              Issue Date: {formatDate(isoDate)}
              <br></br>
            </p>
            <h3>THANKS for stay with us..!<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 20 20">
              <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
            </svg></h3>
          </div>
        </div>
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
              <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
              <path d="M4.603 12.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.701 19.701 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.716 5.716 0 0 1-.911-.95 11.642 11.642 0 0 0-1.997.406 11.311 11.311 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.27.27 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.647 12.647 0 0 1 1.01-.193 11.666 11.666 0 0 1-.51-.858 20.741 20.741 0 0 1-.5 1.05zm2.446.45c.15.162.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.881 3.881 0 0 0-.612-.053zM8.078 5.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z" />
            </svg>
            Print
          </Button>
        </Row>
      </Container></>
  );
};

export default PrintClaim;
