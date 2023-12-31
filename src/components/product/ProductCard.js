import React from "react";
import styled from "styled-components";
import ProductCardSkeleton from "../skeleton/ProductCardSkeleton";

export const ProductCardStyle = styled.div`
  border-radius: 4px;
  border: 0.75px solid #d9d9d9;
  padding: 18.75px 18.75px 37.75px;
  width: 100%;
  .image {
    img {
      width: 100%;
      display: block;
    }
  }
  .content {
    display: flex;
    gap: 9px;
    flex-direction: column;
    margin-top: 9px;
    .product__tag {
      color: #898989;
      font-size: 10.5px;
      font-style: normal;
      font-weight: 400;
    }
    .product__title {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .product__price__wrapper {
      display: flex;
      align-items: baseline;
      gap: 6px;
      .product__discounted__price {
        color: #303030;
        font-size: 18px;
        font-weight: 600;
        line-height: 22.5px;
      }
      .product__price {
        color: #303030;
        font-size: 11.25px;
        font-weight: 400;
        line-height: 22.5px;
        text-decoration-line: line-through;
      }
    }
  }
`;

const ProductCard = ({
  productImage,
  productTag,
  productTitle,
  productDiscountedPrice,
  productPrice,
  isLoading,
}) => {
  const priceSymbol = process.env.REACT_APP_PRICE_SYMBOL;
  return (
    <>
      {!isLoading ? (
        <ProductCardStyle>
          <div className="image">
            <img src={productImage} alt="" />
          </div>
          <div className="content">
            <p className="product__tag">{productTag}</p>
            <p className="product__title">{productTitle}</p>
            <div className="product__price__wrapper">
              <div className="product__discounted__price">
                {priceSymbol + productDiscountedPrice}
              </div>
              <div className="product__price">{priceSymbol + productPrice}</div>
            </div>
          </div>
        </ProductCardStyle>
      ) : (
        <ProductCardSkeleton />
      )}
    </>
  );
};

export default ProductCard;
