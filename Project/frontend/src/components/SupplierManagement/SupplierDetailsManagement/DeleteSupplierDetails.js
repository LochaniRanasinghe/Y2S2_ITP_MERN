import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert';

import "./SupplierDetailStyles.css";

const DeleteSupplierDetails = () => {

  const [sipplierID, setSupplierID] = useState("");
  const [itemID, setItemID] = useState("");
  const [F_name, setF_name] = useState("");
  const [L_name, setL_name] = useState("");
  const [phone, setPhone] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [Gender, setGender] = useState("");
  const [Address, setAddress] = useState("");
  const [Email, setEmail] = useState("");
  // const [refresh, setRefresh] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();


  const getsupplierdetails = () => {
    axios
      .get("http://localhost:8070/SupSupplier/get/" + id)
      .then((res) => {
        const deleteDetails = {
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

        setSupplierID(deleteDetails.sipplierID);
        setItemID(deleteDetails.itemID);
        setF_name(deleteDetails.F_name);
        setL_name(deleteDetails.L_name);
        setPhone(deleteDetails.phone);
        setCompanyName(deleteDetails.CompanyName);
        setGender(deleteDetails.Gender);
        setAddress(deleteDetails.Address);
        setEmail(deleteDetails.Email);

      })
      .catch((err) => {
        alert(err.message);
      });
  };

  function deleteSupDetails(id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        //true
        axios
        .delete("http://localhost:8070/SupSupplier/delete/" + id)
        .then((res) => {
          swal("Poof! Your data has been deleted!", {
            icon: "success",
          });
          setTimeout(function(){
            navigate("/supplierdetails")
          },2000);
          
        })
        .catch((err) => {
          alert(err.message);
        });
        
      } else {
        swal("Your data is safe!");
        setTimeout(function(){
          navigate("/supplierdetails")

        },1000);
      }
    });



  }

  useEffect(() => getsupplierdetails(), []);

  return (
    <div className="deletesupplierdetailform">
      <h3>Delete supplier details </h3>
      <hr />
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="formGridsupplierid">
            <Form.Label>Supplier ID</Form.Label>
            <Form.Control placeholder="Enter Supplier ID" defaultValue={sipplierID} disabled
              onChange={(e) =>
                setSupplierID(e.target.value)} />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formGriditemid">
            <Form.Label>Item ID</Form.Label>
            <Form.Control placeholder="Enter item ID" defaultValue={itemID} disabled
              onChange={(e) =>
                setItemID(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridfirstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control placeholder="Enter first name" defaultValue={F_name} disabled
              onChange={(e) =>
                setF_name(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridlastname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control placeholder="Enter last name" defaultValue={L_name} disabled
              onChange={(e) =>
                setL_name(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridphone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control placeholder="Enter Phone number" defaultValue={phone} disabled
              onChange={(e) =>
                setPhone(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridcompanyname">
            <Form.Label>Company Name</Form.Label>
            <Form.Control placeholder="Enter company name" defaultValue={CompanyName} disabled
              onChange={(e) =>
                setCompanyName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridgender">
            <Form.Label>Gender</Form.Label>
            <Form.Control placeholder="Enter Gender" defaultValue={Gender} disabled
              onChange={(e) =>
                setGender(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridaddress">
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="Enter Address" defaultValue={Address} disabled
              onChange={(e) =>
                setAddress(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridemail">
            <Form.Label>Email</Form.Label>
            <Form.Control placeholder="Enter Email" defaultValue={Email} disabled
              onChange={(e) =>
                setEmail(e.target.value)} />
          </Form.Group>

          <hr />

          <Button variant="outline-danger"
            onClick={() =>
              deleteSupDetails(id)}
          >
            DELETE
          </Button>

        </Form>
      </div>
    </div>
  );
};

export default DeleteSupplierDetails;