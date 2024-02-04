import React from "react";
import styled from "styled-components";
import { ReactComponent as GearIcon } from "../../../assets/gear.svg";

const ProductSpecificationStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 18px;
  max-width: 700px;
  .product__specification {
    width: 350px;
    display: flex;
    align-items: center;
    gap: 10px;
    .icon {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #eeeeee;
    }
    .content {
      p {
        color: #959595;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
      .main {
        color: #000;
        margin-top: 3.8px;
      }
    }
  }
`;

const ProductSpecification = () => {
  return (
    <ProductSpecificationStyle>
      {Array.from({ length: 5 }, (_, index) => index + 1).map((item) => (
        <div className="product__specification">
          <div className="icon">
            <GearIcon />
          </div>
          <div className="content">
            <p>Parameter 1</p>
            <p className="main">Wooden Door</p>
          </div>
        </div>
      ))}
    </ProductSpecificationStyle>
  );
};

export default ProductSpecification;
