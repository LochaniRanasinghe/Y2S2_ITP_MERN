import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import swal from "sweetalert";

function AllSalaries() {
  const [salaries, setSalaries] = useState([]);

  const [searchDoc, setsearchDoc] = useState("");

  const getSalaries = () => {
    axios
      .get("http://localhost:8070/empSalary/")
      .then((res) => {
        setSalaries(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const updateSalary = () => {
    axios
      .get("http://localhost:8070/empSalary/get:id")
      .then((res) => {
        setSalaries(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const deleteSalary = (id) => {
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
          .delete("http://localhost:8070/empSalary/delete/" + id)
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
  };

  useEffect(() => getSalaries(), []);

  return (
    <div className="TableSalary">
      <br />
      <div id="container4">
        <h1>All Salary Entries</h1>
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
      </div>{" "}
      <br />
      <Table striped bordered hover>
        <thead className="tableHead">
          <tr class="table-primary">
            <th>Salary ID</th>
            <th>Employee ID</th>
            <th>Year</th>
            <th>Month</th>
            <th>Basic Salary</th>
            <th>Bonus</th>
            <th>Deduction</th>
            <th>Total Salary</th>

            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {salaries
            .filter((val) => {
              if (searchDoc === "") {
                return val;
              } else if (
                val.salaryID.toLowerCase().includes(searchDoc.toLowerCase()) ||
                val.empID.toLowerCase().includes(searchDoc.toLowerCase()) ||
                val.year.toLowerCase().includes(searchDoc.toLowerCase()) ||
                val.month.toLowerCase().includes(searchDoc.toLowerCase())
              ) {
                return val;
              }
            })
            .map((data) => {
              return (
                <tr>
                  <td>{data.salaryID}</td>
                  <td>{data.empID}</td>
                  <td>{data.year}</td>
                  <td>{data.month}</td>
                  <td>{data.basicSalary}</td>
                  <td>{data.bonus}</td>
                  <td>{data.deduction}</td>
                  <td>{data.totalSalary}</td>
                  <td>
                    <Link
                      to={"/empSalary/update/" + data._id}
                      className="btn btn-warning"
                    >
                      Update
                      <svg
                        id="icon"
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
                        pathname: "/salarymain",
                      }}
                      className="btn btn-danger"
                      onClick={() => deleteSalary(data._id)}
                    >
                      Delete
                      <svg
                        id="icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-trash-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
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

export default AllSalaries;
