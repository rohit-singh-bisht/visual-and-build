import React from "react";
import styled from "styled-components";

const ProductCardStyle = styled.div`
  border-radius: 4px;
  border: 0.75px solid #d9d9d9;
  display: flex;
  gap: 9px;
  flex-direction: column;
  .content {
    .product__tag {
      color: #898989;
      font-size: 10.5px;
      font-style: normal;
      font-weight: 400;
    }
    .product__price {
      text-decoration: line-through;
    }
    .product__title {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
`;

const ProductCard = ({
  productImage,
  productTag,
  productTitle,
  productDiscountedPrice,
  productPrice,
}) => {
  return (
    <ProductCardStyle>
      <div className="image">
        <img src={productImage} alt="" />
      </div>
      <div className="content">
        <p className="product__tag">{productTag}</p>
        <p className="product__title">{productTitle}</p>
        <div className="product__price__wrapper">
          <div className="product__discounted__price">
            {productDiscountedPrice}
          </div>
          <div className="product__price">{productPrice}</div>
        </div>
      </div>
    </ProductCardStyle>
  );
};

export default ProductCard;
