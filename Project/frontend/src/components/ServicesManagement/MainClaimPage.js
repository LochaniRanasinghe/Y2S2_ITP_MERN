import React from "react";
import { Link, useLocation } from "react-router-dom";
import PageTitle from "../Header/PageTitle";
import GetAllWD from "./GetAllWD";

const MainClaimPage = () => {
  const location = useLocation();
  return (
    <>
    <div className="Title"><PageTitle className="Title" title="All Warrenty Claim Details">

    </PageTitle></div><GetAllWD /></>
  );
};

export default MainClaimPage;
