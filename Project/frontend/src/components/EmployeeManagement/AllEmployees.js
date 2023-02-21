import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import swal from "sweetalert";

function AllEmployees() {
  const [employees, setEmployees] = useState([]);

  const [searchDoc, setsearchDoc] = useState("");

  const getEmployees = () => {
    axios
      .get("http://localhost:8070/empEmployee/")
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const updateEmployee = () => {
    axios
      .get("http://localhost:8070/empEmployee/get:id")
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  function deleteEmployee(id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this record!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        //if true do the following
        axios
          .delete("http://localhost:8070/empEmployee/delete/" + id)
          .then((res) => {
            swal("Your record has been deleted!", {
              icon: "success",
            });
            window.location.reload(false);
          })
          .catch((err) => {
            alert(err.message);
          });
      } else {
        swal("Delete cancelled success!");
      }
    });
  }

  useEffect(() => getEmployees(), []);

  return (
    <div className="TableEmp">
      <br />
      <div id="container1">
        <h1>All Employees</h1>
        <br />
      </div>
      <br />
      <div id="container2">
        <form class="form-inline my-2 my-lg-0">
          <div id="in">
            <input
              class="form-control mr-sm-2"
              type="search"
              id="searchBar"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => {
                setsearchDoc(e.target.value);
              }}
            />
            <span>
              <button
                class="btn btn-outline-success my-2 my-sm-0"
                type="submit"
                id="btnEmp"
              >
                Search
              </button>
            </span>
          </div>
        </form>
      </div>
      <br /> <br />
      <Table striped bordered hover className="bootTable">
        <thead className="tableHead">
          <tr class="table-primary">
            <th>Employee ID</th>
            <th>Full name</th>
            <th>Designation</th>
            <th>Branch</th>
            <th>NIC</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Phone</th>
            <th>E-mail</th>
            <th>Date Of Employment</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees
            .filter((val) => {
              if (searchDoc === "") {
                return val;
              } else if (
                val.empID.toLowerCase().includes(searchDoc.toLowerCase()) ||
                val.designation
                  .toLowerCase()
                  .includes(searchDoc.toLowerCase()) ||
                val.branch.toLowerCase().includes(searchDoc.toLowerCase()) ||
                val.name.toLowerCase().includes(searchDoc.toLowerCase())
              ) {
                return val;
              }
            })
            .map((data) => {
              return (
                <tr>
                  <td>{data.empID}</td>
                  <td>{data.name}</td>
                  <td>{data.designation}</td>
                  <td>{data.branch}</td>
                  <td>{data.nic}</td>
                  <td>{data.gender}</td>
                  <td>{data.dob}</td>
                  <td>{data.phone}</td>
                  <td>{data.email}</td>
                  <td>{data.dateOfEmployment}</td>
                  <td>
                    <Link
                      to={"/empEmployee/update/" + data._id}
                      className="btn btn-warning"
                    >
                      {/* Update */}
                      <svg
                        id="iconEmp"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-pencil-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                      </svg>
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={{
                        pathname: "/employeemain",
                      }}
                    >
                      <Button
                        className="btn btn-danger"
                        onClick={() => deleteEmployee(data._id)}
                      >
                        <svg
                          id="iconEmp"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-trash-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </svg>
                      </Button>

                      {/* Delete */}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={"/empEmployee/print/" + data._id}
                      className="btn btn-info"
                    >
                      {/* Update */}
                      <svg
                        id="iconEmp"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-download"
                        viewBox="0 0 16 16"
                      >
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                      </svg>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}

export default AllEmployees;
