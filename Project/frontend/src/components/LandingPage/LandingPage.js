import React, { useEffect } from "react";
import { Carousel, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import bg1 from "./bg1.jpg";
import bg2 from "./bg2.jpg";
import bg3 from "./bg3.jpg";
import Clock from "./Clock";
import "./landingPageStyles.css";

const LandingPage = () => {
  //check login validation
  const history = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (!userInfo) {
      history("/");
    }
  });

  return (
    <div>
      <Row>
        <Col className="langingCarousel">
          <Carousel fade>
            <Carousel.Item interval={2000}>
              <img className="d-block w-100" src={bg1} alt="First slide" />
              <Carousel.Caption>
                <h3></h3>
                <p></p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <img className="d-block w-100" src={bg2} alt="Second slide" />
              <Carousel.Caption>
                <h3></h3>
                <p></p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <img className="d-block w-100" src={bg3} alt="Third slide" />
              <Carousel.Caption>
                <h3></h3>
                <p></p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col className="clockmain">
          <Clock />
        </Col>
      </Row>
    </div>
  );
};

export default LandingPage;
