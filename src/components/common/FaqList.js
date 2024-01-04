import React from "react";
import FaqAccordion from "./FaqAccordion";
import styled from "styled-components";

const FaqListStyle = styled.div`
  background: #fcfcfc;
  display: flex;
  gap: 18px;
  flex-direction: column;
  padding: 75px 0;
  .title {
    color: #303030;
    text-align: center;
    font-size: 27px;
    font-weight: 600;
    line-height: 34.5px;
    margin-bottom: calc(41.5px - 18px);
  }
`;

const FaqList = () => {
  return (
    <FaqListStyle>
      <h2 className="title">Frequently Asked Questions</h2>
      <FaqAccordion />
      <FaqAccordion />
      <FaqAccordion />
    </FaqListStyle>
  );
};

export default FaqList;
