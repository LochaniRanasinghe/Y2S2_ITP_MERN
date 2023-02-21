import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import "./CustomerMangement.css";
import swal from 'sweetalert';

const ViewCustomer = () => {
  const [customerdetails, setcustomerdetails] = useState([]);

  const [search, setsearch] = useState("");

  function getAllCustomers() {
    axios
      .get("http://localhost:8070/Customer/")
      .then((res) => {
        setcustomerdetails(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  useEffect(() => getAllCustomers());



 //delete function
  function deleteCustomer(id) {
    // if (window.confirm("Are you sure want to delete Customer?")) {
    //   //save.it
    //   axios
    //     .delete("http://localhost:8070/Customer/delete/" + id)
    //     .then((result) => {
    //       alert("Customer deleted successfully");
    //       window.location.reload(false);
    //     })
    //     .catch((err) => {
    //       alert(err.message);
    //     });
    // }
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this this Record!!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        //true
         //save.it
      axios
      .delete("http://localhost:8070/Customer/delete/" + id)
      .then((result) => {
        // alert("Customer deleted successfully");
        swal("Done! Record has been deleted!", {
          icon: "success",
       })
       setTimeout(function () {

        window.location.reload();

      }, 2000);
      })
        .catch((err) => {
            alert(err.message);
      });
    } else {
        swal("Your Record is safe!");
      }
    });
  }

  return (
    <div className="ViewOtherExpenTable">
      <h3>All Customer Details </h3>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onChange={(e) => {
            setsearch(e.target.value);
          }}
        />
        <Button variant="outline-success">Search</Button>
      </Form>
      <hr />

      <div>
        <Table bordered hover>
          <thead>
            <tr className="table-primary">
              <th>CID</th>
              <th>Name</th>
              <th>PhoneNumber</th>
              <th>NIC</th>
              <th>Email</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {customerdetails
              .filter((value) => {
                if (search === "") {
                  return value;
                } else if (
                  value.CID.toLowerCase().includes(
                    search.toLocaleLowerCase()
                  ) ||
                  value.FirstName.toLowerCase().includes(
                    search.toLocaleLowerCase()
                  ) ||
                  value.LastName.toLowerCase().includes(
                    search.toLocaleLowerCase()
                  )
                ) {
                  return value;
                }
              })
              .map((customersVal) => (
                <tr>
                  <td>{customersVal.CID}</td>
                  <td>
                    {customersVal.FirstName} {customersVal.LastName}
                  </td>
                  <td>{customersVal.phoneNumber}</td>
                  <td>{customersVal.NIC}</td>
                  <td>{customersVal.Email}</td>
                  <td>
                    <Link
                      to={"/maincustomerdetails/update/" + customersVal._id}
                    >
                      <Button
                        style={{ margin: "5px" }}
                        variant="info"
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
                    {/* <Button
                      style={{ margin: "5px" }}
                      variant="warning"
                      type="submit"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-file-pdf"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                        <path d="M4.603 12.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.701 19.701 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.716 5.716 0 0 1-.911-.95 11.642 11.642 0 0 0-1.997.406 11.311 11.311 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.27.27 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.647 12.647 0 0 1 1.01-.193 11.666 11.666 0 0 1-.51-.858 20.741 20.741 0 0 1-.5 1.05zm2.446.45c.15.162.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.881 3.881 0 0 0-.612-.053zM8.078 5.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z" />
                      </svg>
                    </Button> */}
                    <Link to={"/maincustomerdetails"}>
                      <Button
                        style={{ margin: "5px" }}
                        variant="danger"
                        type="submit"
                        onClick={() => deleteCustomer(customersVal._id)}
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
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ViewCustomer;
