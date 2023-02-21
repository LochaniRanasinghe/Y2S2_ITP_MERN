import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import swal from "sweetalert";

import "./OtherIExpenStyle.css";

const ViewOtherExpen = () => {
  const [otherExpenDetails, setOtherExpenDetails] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  function getAllOtherExpen() {
    axios
      .get("http://localhost:8070/OtherExpenFin/")
      .then((res) => {
        setOtherExpenDetails(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function deleteOtherExpen(id) {
    // if (window.confirm("Are you sure you want to Delete?")) {
    //   // Save it!
    //   axios
    //     .delete("http://localhost:8070/OtherExpenFin/delete/" + id)
    //     .then((res) => {
    //       alert("Record Deleted Succesfully");
    //     })
    //     .catch((err) => {
    //       alert(err.message);
    //     });
    // } else {
    //   // Do nothing!
    // }

    swal({
      title: "Are you sure you want to Delete?",
      text: "Once deleted, you will not be able to recover this Record!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // Save it!
        axios
          .delete("http://localhost:8070/OtherExpenFin/delete/" + id)
          .then((res) => {
            swal("Poof! Your Record has been deleted!", {
              icon: "success",
            });
          })
          .catch((err) => {
            alert(err.message);
          });
      } else {
        swal("Your Record is safe!");
      }
    });
  }

  useEffect(() => getAllOtherExpen());

  return (
    <div className="ViewOtherExpenTable">
      <h3>All Other Expenditures Details </h3>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <Button variant="outline-success">Search</Button>
      </Form>
      <hr />

      <div>
        <Table responsive="xl" bordered hover>
          <thead>
            <tr className="table-primary">
              <th>Bill ID</th>
              <th>Date</th>

              <th>Payee</th>
              <th>Price</th>
              <th>Description</th>
              <th>Branch</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {otherExpenDetails
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.bpayee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  val.billId.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((otherExpenDetailsVal) => (
                <tr>
                  <td>{otherExpenDetailsVal.billId}</td>
                  <td>
                    {otherExpenDetailsVal.byear}/{otherExpenDetailsVal.bmonth}/
                    {otherExpenDetailsVal.bday}
                  </td>
                  <td>{otherExpenDetailsVal.bpayee}</td>
                  <td>{otherExpenDetailsVal.bprice}</td>
                  <td>{otherExpenDetailsVal.bdescription}</td>
                  <td>{otherExpenDetailsVal.bbranch}</td>
                  <td>
                    <Link to={"/otherexpen/print/" + otherExpenDetailsVal._id}>
                      <Button
                        style={{ margin: "5px" }}
                        variant="warning"
                        type="submit"
                      >
                        <i class="bi bi-download"></i>
                      </Button>
                    </Link>
                    <Link to={"/otherexpen/update/" + otherExpenDetailsVal._id}>
                      <Button
                        style={{ margin: "5px" }}
                        variant="info"
                        type="submit"
                      >
                        <i class="bi bi-pencil-square"></i>
                      </Button>
                    </Link>
                    <Link to={"/otherexpen"}>
                      <Button
                        style={{ margin: "5px" }}
                        variant="danger"
                        type="submit"
                        onClick={() =>
                          deleteOtherExpen(otherExpenDetailsVal._id)
                        }
                      >
                        <i class="bi bi-trash"></i>
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ViewOtherExpen;
