import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import "./PromReport.css";

const ViewPromReport = () => {
  const [AllPromReports, setAllPromReports] = useState([]);

  // (use state)for search
  const [searchTerm, setsearchTerm] = useState("");

  function getAllPromReports() {
    axios
      .get("http://localhost:8070/ProReport/")
      .then((res) => {
        setAllPromReports(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function deletePromReport(id) {
    if (window.confirm("Are you sure you want to delete?")) {
      axios
        .delete("http://localhost:8070/ProReport/delete/" + id)
        .then((res) => {
          alert("Record Deleted Succesfully");
          window.location.reload(false);
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      //Do nothing!
    }
  }

  useEffect(() => getAllPromReports());

  return (
    <div className="viewPromReport">
      <h3>All Rewarded Offers</h3>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onChange={(e) => {
            setsearchTerm(e.target.value);
          }}
        />
        <Button variant="outline-success">Search</Button>
      </Form>
      <hr />

      <div>
        <Table bordered hover>
          <thead>
            <tr className="table-primary">
              <th>Customer ID</th>
              <th>Bill ID</th>
              <th>Bill Date</th>
              <th>Promotion ID</th>
              <th>Promotion Name</th>
              <th>Discount Amount</th>
            </tr>
          </thead>
          <tbody>
            {AllPromReports.filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.customerId
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                val.billYear.toLowerCase().includes(searchTerm.toLowerCase()) ||
                val.promotionName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                val.promotionId.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            }).map((AllPromReportsVal) => (
              <tr>
                <td>{AllPromReportsVal.customerId}</td>
                <td>{AllPromReportsVal.billId}</td>
                <td>
                  {AllPromReportsVal.billYear}/{AllPromReportsVal.billMonth}/
                  {AllPromReportsVal.billDate}
                </td>
                <td>{AllPromReportsVal.promotionId}</td>
                <td>{AllPromReportsVal.promotionName}</td>
                <td>{AllPromReportsVal.discountAmount}</td>
                <td>
                  <Link
                    to={
                      "/mainpromotionpage/updatePreport/" +
                      AllPromReportsVal._id
                    }
                  >
                    <Button
                      style={{ margin: "5px" }}
                      variant="success"
                      type="submit"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                    </Button>
                  </Link>

                  <Link to={"/mainpromreport/viewpReport"}>
                    <Button
                      style={{ margin: "5px" }}
                      variant="danger"
                      type="submit"
                      onClick={() => deletePromReport(AllPromReportsVal._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path
                          fill-rule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                      </svg>
                    </Button>
                  </Link>

                  <Link
                    to={
                      "/mainpromotionpage/printPreport/" + AllPromReportsVal._id
                    }
                  >
                    <Button
                      style={{ margin: "5px" }}
                      variant="warning"
                      type="submit"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-file-pdf-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.523 10.424c.14-.082.293-.162.459-.238a7.878 7.878 0 0 1-.45.606c-.28.337-.498.516-.635.572a.266.266 0 0 1-.035.012.282.282 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548zm2.455-1.647c-.119.025-.237.05-.356.078a21.035 21.035 0 0 0 .5-1.05 11.96 11.96 0 0 0 .51.858c-.217.032-.436.07-.654.114zm2.525.939a3.888 3.888 0 0 1-.435-.41c.228.005.434.022.612.054.317.057.466.147.518.209a.095.095 0 0 1 .026.064.436.436 0 0 1-.06.2.307.307 0 0 1-.094.124.107.107 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256zM8.278 4.97c-.04.244-.108.524-.2.829a4.86 4.86 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.517.517 0 0 1 .145-.04c.013.03.028.092.032.198.005.122-.007.277-.038.465z" />
                        <path
                          fill-rule="evenodd"
                          d="M4 0h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm.165 11.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.64 11.64 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.856.856 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.844.844 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.76 5.76 0 0 0-1.335-.05 10.954 10.954 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.238 1.238 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a19.707 19.707 0 0 1-1.062 2.227 7.662 7.662 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103z"
                        />
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
  );
};

export default ViewPromReport;
