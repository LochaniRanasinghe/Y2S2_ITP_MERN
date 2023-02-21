import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert';

import "./SupplierDetailStyles.css";

const UpdateSupplierDetails = () => {


  const [sipplierID, setSupplierID] = useState("");
  const [itemID, setItemID] = useState("");
  const [F_name, setF_name] = useState("");
  const [L_name, setL_name] = useState("");
  const [phone, setPhone] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [Gender, setGender] = useState("");
  const [Address, setAddress] = useState("");
  const [Email, setEmail] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();



  const getsupplierdetails = () => {
    axios
      .get("http://localhost:8070/SupSupplier/get/" + id)
      .then((res) => {
        const updateDetails = {
          sipplierID: res.data.supplier.sipplierID,
          itemID: res.data.supplier.itemID,
          F_name: res.data.supplier.F_name,
          L_name: res.data.supplier.L_name,
          phone: res.data.supplier.phone,
          CompanyName: res.data.supplier.CompanyName,
          Gender: res.data.supplier.Gender,
          Address: res.data.supplier.Address,
          Email: res.data.supplier.Email,

        };

        setSupplierID(updateDetails.sipplierID);
        setItemID(updateDetails.itemID);
        setF_name(updateDetails.F_name);
        setL_name(updateDetails.L_name);
        setPhone(updateDetails.phone);
        setCompanyName(updateDetails.CompanyName);
        setGender(updateDetails.Gender);
        setAddress(updateDetails.Address);
        setEmail(updateDetails.Email);

      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => getsupplierdetails(), []);

  return (
    <div className="updatesupplierdetailform">
      <h3>Update supplier details </h3>
      <hr />
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="formGridsupplierid">
            <Form.Label>Supplier ID</Form.Label>
            <Form.Control defaultValue={sipplierID} disabled />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formGriditemid">
            <Form.Label>Item ID</Form.Label>
            <Form.Control defaultValue={itemID}
              onChange={(e) =>
                setItemID(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridfirstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control defaultValue={F_name}
              onChange={(e) =>
                setF_name(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridlastname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control defaultValue={L_name}
              onChange={(e) =>
                setL_name(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridphone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control defaultValue={phone}
              onChange={(e) =>
                setPhone(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridcompanyname">
            <Form.Label>Company Name</Form.Label>
            <Form.Control defaultValue={CompanyName}
              onChange={(e) =>
                setCompanyName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridgender">
            <Form.Label>Gender</Form.Label>
            <Form.Control defaultValue={Gender}
              onChange={(e) =>
                setGender(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridaddress">
            <Form.Label>Address</Form.Label>
            <Form.Control defaultValue={Address}
              onChange={(e) =>
                setAddress(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridemail">
            <Form.Label>Email</Form.Label>
            <Form.Control defaultValue={Email}
              onChange={(e) =>
                setEmail(e.target.value)} />
          </Form.Group>


          <hr />
          <Button variant="outline-success" type="submit"
            onClick={(e) => {
              e.preventDefault();

              const newsupplierdetailsSheema = {
                sipplierID,
                itemID,
                F_name,
                L_name,
                phone,
                CompanyName,
                Gender,
                Address,
                Email,

              };

              console.log(newsupplierdetailsSheema);

              axios
                .put("http://localhost:8070/SupSupplier/update/" + id,
                  newsupplierdetailsSheema
                )

                .then(() => {
                  swal("Good job!", "Supplier Data Updated!", "success");
                  setTimeout(function(){
                    navigate("/supplierdetails")
                  },2000); 
                  
                   
                })
                .catch((err) => {
                  alert(err);
                });

            }}
          >
            UPDATE
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UpdateSupplierDetails;