import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import swal from "sweetalert";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

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
        console.log(AllPromotions);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function deletePromotion(id) {
  swal({
    title: "Are you sure?",
    text: "Are you sure that you want to delete this record?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      axios
        .delete("http://localhost:8070/OfferInfo/delete/" + id)
        .then((res) => {
        swal("Deleted!", "Your record has been deleted!", {
          icon: "success",
        });
        setTimeout(function () {
          window.location.reload();
        }, 1200);
      })
      .catch((err)=>{
         alert(err.message);
      });
    }else{
       swal("Your record is safe!");
    }
  });
    
  }

  //function for charts

  const [StudentDiscounts, setStudentDiscounts] = useState(0);
  const [SeasonalOffers, setSeasonalOffers] = useState(0);
  const [Jointpromotions, setJointpromotions] = useState(0);
  const [CashbackPromotions, setCashbackPromotions] = useState(0);
  const [LoyaltyRewards, setLoyaltyRewards] = useState(0);

  const [bardata, setbardata] = useState([
    {
      name: "Student Discounts",
      count: 0,
    },
    {
      name: "Seasonal Offers",
      count: 0,
    },
    {
      name: "Joint promotions",
      count: 0,
    },
    {
      name: "Cashback Promotions",
      count: 0,
    },
    {
      name: "Loyalty Rewards",
      count: 0,
    },
  ]);

  function calcpromos() {
    let sd = 0;
    let so = 0;
    let jp = 0;
    let cp = 0;
    let lr = 0;

    for (let i = 0; i < AllPromotions.length; i++) {
      if (AllPromotions[i].promotionName === "Student Discounts") {
        sd++;
        setStudentDiscounts(sd);
      } else if (AllPromotions[i].promotionName === "Seasonal Offers") {
        so++;
        setSeasonalOffers(so);
      } else if (AllPromotions[i].promotionName === "Joint promotions") {
        jp++;
        setJointpromotions(jp);
      } else if (AllPromotions[i].promotionName === "Cashback Promotions") {
        cp++;
        setCashbackPromotions(cp);
      } else if (AllPromotions[i].promotionName === "Loyalty Rewards") {
        lr++;
        setLoyaltyRewards(lr);
      } else {
        console.log("else");
      }
      setbardata([
        {
          name: "Student Discounts",
          count: StudentDiscounts,
        },
        {
          name: "Seasonal Offers",
          count: SeasonalOffers,
        },
        {
          name: "Joint promotions",
          count: Jointpromotions,
        },
        {
          name: "Cashback Promotions",
          count: CashbackPromotions,
        },
        {
          name: "Loyalty Rewards",
          count: LoyaltyRewards,
        },
      ]);
    }
  }

  useEffect(() => getAllPromotions(), []);

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

      {/* All Published Details calculation part....................................... */}

      <hr />
      <br />
      <br />
      <br />

      <div className="allPubPromoStat">
        <Button
          onClick={calcpromos}
          style={{ float: "right", marginRight: "50%" }}
          variant="outline-success"
        >
          Analyze Listed Offers
        </Button>
        <h3>All Published Details Analyze</h3>
        <hr />

        <Row>
          <Col>
            <Table
              striped
              bordered
              hover
              style={{ width: "100%", height: "200px" }}
            >
              <thead>
                <tr>
                  <th>Student Discounts</th>
                  <th>Seasonal Offers</th>
                  <th>Joint promotions</th>
                  <th>Cashback Promotions</th>
                  <th>Loyalty Rewards</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{StudentDiscounts}</td>
                  <td>{SeasonalOffers}</td>
                  <td>{Jointpromotions}</td>
                  <td>{CashbackPromotions}</td>
                  <td>{LoyaltyRewards}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col>
            <BarChart
              width={600}
              height={400}
              data={bardata}
              margin={{
                top: 10,
                right: 0,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </Col>
        </Row>

        <br />
        <hr />
      </div>
    </div>
  );
};

export default ViewPromotions;
