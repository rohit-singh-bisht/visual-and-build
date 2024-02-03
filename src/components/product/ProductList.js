import React from "react";
import ProductCard from "./ProductCard";
import styled from "styled-components";
import Pagination from "@mui/material/Pagination";
import { ReactComponent as ArrowIcon } from "../../assets/arrow.svg";
import { useAppContext } from "../../context/useAppContext";

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
      display: flex;
      gap: 12px;
      align-items: center;
    }
  }
  .product__list__wrapper {
    display: flex;
    gap: 18px;
  }
  .product__list__pagination {
    margin-top: 44.25px;
    display: flex;
    justify-content: center;
  }
  @media (max-width: 768px) {
    .product__list__wrapper {
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;

const ProductList = ({
  listTitle,
  buttonText,
  buttonArrow = false,
  handleButtonClick,
  pagination = true,
  productList,
}) => {
  const { isDesktop } = useAppContext();
  return (
    <ProductListStyle>
      {listTitle && (
        <div className="product__list__title__wrapper">
          <p className="product__list__title">{listTitle}</p>
          <button className="product__list__button" onClick={handleButtonClick}>
            {buttonText}
            <ArrowIcon className="icon" />
          </button>
        </div>
      )}
      <div className="product__list__wrapper">
        <ProductCard isLoading={true} />
        <ProductCard isLoading={true} />
        <ProductCard isLoading={true} />
        <ProductCard isLoading={true} />
        <ProductCard isLoading={true} />
      </div>
      {pagination && isDesktop && (
        <div className="product__list__pagination">
          <Pagination className="pagination" count={10} shape="rounded" />
        </div>
      )}
    </ProductListStyle>
  );
};

export default ProductList;
