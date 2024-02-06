import React from "react";
import styled from "styled-components";
import ProductSwatch from "./ProductSwatch";

const ProductVariantsStyle = styled.div`
  .product__swatches__wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    flex: 1;
  }
`;

const ProductVariants = ({ name }) => {
  return (
    <ProductVariantsStyle>
      <div className="product__options product__variants__wrapper">
        <h2 className="product__options__title">{name}</h2>
        <div className="product__swatches__wrapper">
          <ProductSwatch name={"variant"} label={"Off White"} index={1} />
          <ProductSwatch name={"variant"} label={"Space Gray"} index={2} />
          <ProductSwatch name={"variant"} label={"Jet Black"} index={3} />
          <ProductSwatch
            name={"variant"}
            label={"Cinnamon Red"}
            index={4}
            isDisabled={true}
          />
        </div>
      </div>
    </ProductVariantsStyle>
  );
};

export default ProductVariants;
