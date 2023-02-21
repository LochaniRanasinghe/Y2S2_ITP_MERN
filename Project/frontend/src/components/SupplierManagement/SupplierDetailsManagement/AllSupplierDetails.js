import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';


import "./SupplierDetailStyles.css";

const AllSupplierDetails = ({onDataChange}) => {
  const [supplierdetails, setSupplierdetails] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  function getAllDetails() {
    axios
      .get("http://localhost:8070/SupSupplier/")
      .then((res) => {
        setSupplierdetails(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  useEffect(() => getAllDetails());
  useEffect(() => onDataChange(supplierdetails) , [supplierdetails])
  

  return (
    <Container>
      <div className="AllSupplierDetailsTable">
        <h3> All Supplier Details</h3>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={(e) =>{
              setSearchTerm(e.target.value);
          }}
            />
          <Button variant="outline-success">Search</Button>
        </Form>
        <hr />

        <div>
          <Table bordered hover responsive>
            <thead>
              <tr className="table-primary">
                <th>Supplier Id</th>
                <th>Item Id</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Company</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {supplierdetails
              .filter((val) => {
                if(searchTerm === ""){
                    return val;
                }else if(
                    val.sipplierID.toLowerCase().includes(searchTerm.toLowerCase())||
                    val.F_name.toLowerCase().includes(searchTerm.toLowerCase())
                ){
                    return val;
                }
            })
              
              .map((supplierdetailsVal) => (
                <tr>


                  <td>{supplierdetailsVal.sipplierID}</td>
                  <td>{supplierdetailsVal.itemID}</td>
                  <td>{supplierdetailsVal.F_name}  {supplierdetailsVal.L_name}</td>
                  <td>{supplierdetailsVal.phone}</td>
                  <td>{supplierdetailsVal.CompanyName}</td>
                  <td>{supplierdetailsVal.Gender}</td>
                  <td>{supplierdetailsVal.Address}</td>
                  <td>{supplierdetailsVal.Email}</td>
                  <td>
                    <Link to={"/AllSupplierDetails/update/" + supplierdetailsVal._id}>
                      <Button className="updatedeletebutton" variant='info'>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentcolor"
                          class="bi bi-pencil-square"
                          viewBox="0 0 16 16">

                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                        </svg>

                      </Button>
                    </Link>

                    <Link to={"/AllSupplierDetails/delete/" + supplierdetailsVal._id}>
                      <Button className="updatedeletebutton" variant='danger'>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-trash-fill"
                          viewBox="0 0 16 16">

                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </svg>

                      </Button>
                    </Link>


                  </td>
                </tr>

              ))}


            </tbody>

          </Table>
        </div>
      </div>
    </Container>
  );
};

export default AllSupplierDetails