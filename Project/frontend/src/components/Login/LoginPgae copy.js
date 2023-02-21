import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import bg1 from "./bg_teamsC.jpg";
import ErrorMsgLogin from "./ErrorMsgLogin";
import "./loginpage.css";

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
      <div id="loginpgbg" class="card mb-3">
        <div class="row g-0 d-flex align-items-center">
          <div class="col-lg-4 d-none d-lg-flex">
            <img
              src={bg1}
              alt="wirelesswaves"
              class="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
            />
          </div>

          <div class="col-lg-8">
            <div id="loginform" class="card-body py-5 px-md-5">
              <form onSubmit={submitHandler}>
                {error && (
                  <ErrorMsgLogin variant="danger">
                    {"Invlaid User Name Or Password..."}
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

                <div class="row mb-4">
                  <Link to="/home">
                    <div class="col">Forgot password?</div>
                  </Link>
                </div>
                {loading && <Loading />}
                <button type="submit" class="btn btn-primary btn-block mb-4">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPgae;
