import React from "react";
import { Container } from "react-bootstrap";
import PageTitle from "../../Header/PageTitle";
import AddPromotions from "./AddPromotions";

const MainPromotionPage = () => {
  return (
    <PageTitle title="Offers and Promotions">
      <Container>
        <AddPromotions />
      </Container>
    </PageTitle>
  );
};

export default MainPromotionPage;
