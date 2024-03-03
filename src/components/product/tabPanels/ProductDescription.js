import React from "react";
import styled from "styled-components";

const ProductDescriptionStyle = styled.div`
  color: #898989;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ProductDescription = ({ description }) => {
  return <ProductDescriptionStyle>{description}</ProductDescriptionStyle>;
};

export default ProductDescription;
