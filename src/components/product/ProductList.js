import React from "react";
import ProductCard from "./ProductCard";
import styled from "styled-components";
import Pagination from "@mui/material/Pagination";

const ProductListStyle = styled.div`
  .product__list__title__wrapper {
    margin-bottom: 46.75px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .product__list__title {
      color: #303030;
      font-size: 27px;
      font-weight: 600;
      line-height: 34.5px;
    }
    .product__list__button {
      color: #ae0000;
      font-size: 16.5px;
      font-weight: 600;
      background: none;
    }
  }
  .product__list__wrapper {
    display: flex;
    gap: 18px;
  }
`;

const ProductList = ({
  listTitle = "Exterior",
  buttonText = "See All",
  handleButtonClick,
}) => {
  return (
    <ProductListStyle>
      <div className="product__list__title__wrapper">
        <p className="product__list__title">{listTitle}</p>
        <button className="product__list__button" onClick={handleButtonClick}>
          {buttonText}
        </button>
      </div>
      <div className="product__list__wrapper">
        <ProductCard isLoading={true} />
        <ProductCard isLoading={true} />
        <ProductCard isLoading={true} />
        <ProductCard isLoading={true} />
        <ProductCard isLoading={true} />
      </div>

      <Pagination count={10} shape="rounded" />
    </ProductListStyle>
  );
};

export default ProductList;
