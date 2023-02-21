import React from "react";
import { Container, Row } from "react-bootstrap";
import "./headerStyle.css";

const PageTitle = ({ title, children }) => {
  return (
    <div className="mainBack">
      <Container className="heddingContainer">
        <Row>
          <div className="page">
            {title && (
              <>
                <h1 className="heading">{title}</h1>
                <hr />
              </>
            )}
          </div>
        </Row>
      </Container>
      {children}
    </div>
  );
};

export default PageTitle;
