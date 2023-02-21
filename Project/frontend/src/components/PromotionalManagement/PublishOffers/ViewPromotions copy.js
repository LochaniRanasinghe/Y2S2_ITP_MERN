import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./PublishOffers.css";

const ViewPromotions = () => {
  const [AllPromotions, setAllPromotions] = useState([]);

  // (use state)for search
  const [searchTerm, setsearchTerm] = useState("");

  function getAllPromotions() {
    axios
      .get("http://localhost:8070/OfferInfo/")
      .then((res) => {
        setAllPromotions(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function deletePromotion(id) {
    if (window.confirm("Are you sure you want to delete?")) {
      axios
        .delete("http://localhost:8070/OfferInfo/delete/" + id)
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

  useEffect(() => getAllPromotions());

  return (
    <div className="ViewPromotions">
      <h3>All Published Details </h3>
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
              <th>Promotion ID</th>
              <th>Type</th>
              <th>Description</th>
              <th>Discount(%)</th>
              <th>Issued Date</th>

              <th>Due Date</th>
              <th>Terms & Conditions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {AllPromotions.filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.promotionId
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                val.promotionName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                val.issuedYear.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            }).map((AllPromotionsVal) => (
              <tr>
                <td>{AllPromotionsVal.promotionId}</td>
                <td>{AllPromotionsVal.promotionName}</td>
                <td>{AllPromotionsVal.promoDescription}</td>
                <td>{AllPromotionsVal.discountPercentage}</td>
                <td>
                  {AllPromotionsVal.issuedYear}/{AllPromotionsVal.issuedMonth}/
                  {AllPromotionsVal.issuedDate}
                </td>

                <td>
                  {AllPromotionsVal.dueYear}/{AllPromotionsVal.dueMonth}/
                  {AllPromotionsVal.dueDate}
                </td>

                <td>{AllPromotionsVal.promoConditions}</td>
                <td>
                  <Link
                    to={
                      "/mainpromotionpage/updatepromo/" + AllPromotionsVal._id
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

                  <Link to={"/mainpromotionpage/viewpromo"}>
                    <Button
                      style={{ margin: "5px" }}
                      variant="danger"
                      type="submit"
                      onClick={() => deletePromotion(AllPromotionsVal._id)}
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

export default ViewPromotions;
