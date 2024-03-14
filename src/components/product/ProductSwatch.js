import React from "react";
import styled from "styled-components";

const ProductSwatchStyle = styled.div`
  input {
    width: 1px;
    height: 1px;
    position: absolute;
    visibility: hidden;
    &:checked {
      & + .product__swatches {
        border: 0.75px solid rgba(174, 0, 0, 0.5);
        color: #ae0000;
      }
    }
    &:disabled {
      & + .product__swatches {
        color: rgba(48, 48, 48, 0.25);
        border: 0.75px solid rgba(48, 48, 48, 0.25);
      }
    }
  }
  .product__swatches {
    color: #303030;
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    padding: 12px 24px;
    border-radius: 3.75px;
    border: 0.75px solid rgba(48, 48, 48, 0.5);
    background: #fff;
    display: inline-block;
  }
`;

const ProductSwatch = ({ name, label, index, isDisabled }) => {
  return (
    <ProductSwatchStyle>
      <input type="radio" id={name + index} name={name} disabled={isDisabled} />
      <label htmlFor={name + index} className="product__swatches">
        {label}
      </label>
    </ProductSwatchStyle>
  );
};

export default ProductSwatch;
