import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import swal from "sweetalert";
import "./OtherIncomeStyle.css";

const ViewOtherIncome = () => {
  const [otherIncomDetails, setOtherIncomDetails] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  function getAllOtherIncome() {
    axios
      .get("http://localhost:8070/otherIncomeFin/")
      .then((res) => {
        setOtherIncomDetails(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function deleteOtherIncom(id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this record !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        //true
        // Save it!
        axios
          .delete("http://localhost:8070/otherIncomeFin/delete/" + id)
          .then((res) => {
            swal("Poof! Your record has been deleted!", {
              icon: "success",
            });
          })
          .catch((err) => {
            alert(err.message);
          });
      } else {
        swal("Your record is safe!");
      }
    });
  }

  useEffect(() => getAllOtherIncome());

  return (
    <div className="ViewOtherIncomeTable">
      <h3>All Other Income Details </h3>
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
            {otherIncomDetails
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
              .map((otherIncomeDetailsVal) => (
                <tr>
                  <td>{otherIncomeDetailsVal.billId}</td>
                  <td>
                    {otherIncomeDetailsVal.byear}/{otherIncomeDetailsVal.bmonth}
                    /{otherIncomeDetailsVal.bday}
                  </td>
                  <td>{otherIncomeDetailsVal.bpayee}</td>
                  <td>{otherIncomeDetailsVal.bprice}</td>
                  <td>{otherIncomeDetailsVal.bdescription}</td>
                  <td>{otherIncomeDetailsVal.bbranch}</td>
                  <td>
                    <Link
                      to={"/otherincome/print/" + otherIncomeDetailsVal._id}
                    >
                      <Button
                        style={{ margin: "5px" }}
                        variant="warning"
                        type="submit"
                      >
                        <i class="bi bi-download"></i>
                      </Button>
                    </Link>
                    <Link
                      to={"/otherincome/update/" + otherIncomeDetailsVal._id}
                    >
                      <Button
                        style={{ margin: "5px" }}
                        variant="info"
                        type="submit"
                      >
                        <i class="bi bi-pencil-square"></i>
                      </Button>
                    </Link>
                    <Link to={"/otherincome"}>
                      <Button
                        style={{ margin: "5px" }}
                        variant="danger"
                        type="submit"
                        onClick={() =>
                          deleteOtherIncom(otherIncomeDetailsVal._id)
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

export default ViewOtherIncome;
