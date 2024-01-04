import React from "react";
import styled from "styled-components";
import { ReactComponent as ChevronRed } from "../../assets/chevron-red.svg";

const FaqAccordionStyle = styled.div`
  display: flex;
  gap: 24px;
  padding: 24px 45px;
  max-width: 712px;
  width: 100%;
  margin: auto;
  border-radius: 18.75px;
  background: #fff;
  .icon {
    cursor: pointer;
  }
  .content {
    display: flex;
    gap: 11.5px;
    flex-direction: column;
    .accordion__title {
      color: #303030;
      font-size: 18px;
      font-weight: 600;
      line-height: 22.5px;
      cursor: pointer;
    }
    .accordion__body {
      color: #303030;
      font-size: 15px;
      font-weight: 400;
      line-height: 22.5px; /* 150% */
      display: none;
    }
  }
`;

const FaqAccordion = () => {
  return (
    <FaqAccordionStyle>
      <div className="icon">
        <ChevronRed />
      </div>
      <div className="content">
        <h2 className="accordion__title">
          What payment methods do you accept?
        </h2>
        <p className="accordion__body">
          Absolutely! Once your order has been shipped, we'll send you a
          tracking num-ber and a link to our carrier's website where you can
          track your package in real-time. You can also check the status of your
          order by logging into your account and viewing your order history.
        </p>
      </div>
    </FaqAccordionStyle>
  );
};

export default FaqAccordion;
