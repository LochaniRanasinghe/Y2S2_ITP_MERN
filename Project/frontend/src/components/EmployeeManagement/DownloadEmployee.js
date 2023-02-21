import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Row } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";

const DownloadEmployee = () => {
  const d = new Date();
  const componentRef = useRef();
  const history = useNavigate();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Employee Details",
    onAfterPrint: () => history(-1),
  });

  const [empID, setempID] = useState("");
  const [name, setname] = useState("");
  const [designation, setdesignation] = useState("");
  const [branch, setbranch] = useState("");
  const [nic, setnic] = useState("");
  const [gender, setgender] = useState("");
  const [dob, setdob] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [dateOfEmployment, setdateOfEmployment] = useState("");

  const { id } = useParams();

  const getEmployee = () => {
    axios
      .get("http://localhost:8070/empEmployee/get/" + id)
      .then((res) => {
        const updateEmployee = {
          empID: res.data.empID,
          name: res.data.name,
          designation: res.data.designation,
          branch: res.data.branch,
          nic: res.data.nic,
          gender: res.data.gender,
          dob: res.data.dob,
          phone: res.data.phone,
          email: res.data.email,
          dateOfEmployment: res.data.dateOfEmployment,
        };

        setempID(updateEmployee.empID);
        setname(updateEmployee.name);
        setdesignation(updateEmployee.designation);
        setbranch(updateEmployee.branch);
        setnic(updateEmployee.nic);
        setgender(updateEmployee.gender);
        setdob(updateEmployee.dob);
        setphone(updateEmployee.phone);
        setemail(updateEmployee.email);
        setdateOfEmployment(updateEmployee.dateOfEmployment);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => getEmployee(), []);

  return (
    <Container className="divEmpDownContainer">
      <Row>
        <div className="divEmpDownContainer" ref={componentRef}>
          {/* <div className="divEmpDownContainer"> */}
          <div className="empDownTitle">
            <h1>Employee Details of {empID}</h1>
          </div>
          <div className="empDownDetails">
            <p>Employee ID : {empID}</p>
            <p>Full name : {name}</p>
            <p>Designation : {designation}</p>
            <p>Branch : {branch}</p>
            <p>NIC : {nic}</p>
            <p>Gender : {gender}</p>
            <p>DOB : {dob}</p>
            <p>Phone : {phone}</p>
            <p>E-mail : {email}</p>
            <p>Date Of Employment : {dateOfEmployment}</p>
            <br />
            <p>
              Printed Date : {d.getFullYear()}/{d.getMonth()}/{d.getDate()}
              <br></br>
              Printed Time : {d.getHours()}:{d.getMinutes()}:{d.getSeconds()}
            </p>
          </div>
          {/* </div> */}

          <br></br>
        </div>
        <Row style={{ margin: "10px" }} className="rowPrint">
          <Button variant="info" onClick={handlePrint} className="printBtn">
            Print
          </Button>
        </Row>
      </Row>
    </Container>
  );
};

export default DownloadEmployee;
