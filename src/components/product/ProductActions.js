import React from "react";
import styled from "styled-components";
import QuantityInput from "../common/QuantityInput";
import Button from "../common/Button";

const ProductActionsStyle = styled.div`
  display: flex;
  gap: 12px;
`;

const ProductActions = () => {
  return (
    <ProductActionsStyle>
      <QuantityInput />
      <Button title={"Buy Now"} />
    </ProductActionsStyle>
  );
};

export default ProductActions;
