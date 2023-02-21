import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import bg1 from "./bg_teamsC.jpg";
import ErrorMsgLogin from "./ErrorMsgLogin";
import "./loginpage.css";
import sample from "./bgvid.mp4";
import loginlogo from "./loginlogo.png";
import { Col, Row } from "react-bootstrap";
import swal from "sweetalert";

const LoginPgae = () => {
  const [adEmail, setemail] = useState("");
  const [adPassword, setpassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const history = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newOb = {
      adEmail,
      adPassword,
    };

    axios
      .post("http://localhost:8070/adminRoutes/login", newOb)
      .then((res) => {
        //console.log(res.data);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      history("/home");
    }
  });

  return (
    <div>
      <video className="videoTag" autoPlay loop muted>
        <source src={sample} type="video/mp4" />
        <source src={sample} type="video/ogg" />
      </video>

      <Row>
        <Col>
          <div className="glassform">
            <img src={loginlogo}></img>
          </div>
        </Col>
        <Col>
          <div className="loginformcard">
            <div class="col-lg-8">
              <div id="loginform" class="card-body py-5 px-md-5">
                <h1>Welcome Back !</h1>
                <p>
                  We provide you <br></br>with the best selection of phones.
                </p>
                <form onSubmit={submitHandler}>
                  {error && (
                    <ErrorMsgLogin variant="danger">
                      {"Invalid Email Or Password..."}
                    </ErrorMsgLogin>
                  )}
                  <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example1">
                      Email address
                    </label>
                    <input
                      onChange={(e) => setemail(e.target.value)}
                      type="email"
                      id="form2Example1"
                      class="form-control"
                    />
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example2">
                      Password
                    </label>
                    <input
                      onChange={(e) => setpassword(e.target.value)}
                      type="password"
                      id="form2Example2"
                      class="form-control"
                    />
                  </div>

                  <div
                    class="row mb-4"
                    onClick={() => {
                      swal(
                        "Please contact admin",
                        "Admin: 0701892883 ( Sashira Udayanga )",
                        "warning"
                      );
                    }}
                  >
                    <div id="fgtpwtxt" class="col">
                      Forgot password?
                    </div>
                  </div>
                  {loading && <Loading />}
                  <button type="submit" class="btn btn-primary btn-block mb-4">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <div></div>
    </div>
  );
};

export default LoginPgae;
