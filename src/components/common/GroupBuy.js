import React from "react";
import styled from "styled-components";
import { ReactComponent as ReviewStars } from "../../assets/reviewStars.svg";
import ImageGallery from "react-image-gallery";

export const GroupBuyStyle = styled.div`
  display: flex;
  gap: 33.75px;
  flex-direction: ${({ reverse }) =>
    reverse === "true" ? "row-reverse" : "row"};
  .product__image,
  .product__details {
    width: 100%;
  }
  .product__details {
    display: flex;
    flex-direction: column;
    gap: 16.5px;
    .product__title {
      color: #303030;
      font-size: 27px;
      font-weight: 600;
      line-height: 34.5px;
      text-transform: capitalize;
    }
    .product__ratings {
      color: #303030;
      font-size: 15px;
      font-weight: 400;
      line-height: 22.5px;
      display: flex;
      align-items: center;
      gap: 6.75px;
      .product__reviews__count {
        font-size: 15px;
        font-weight: 400;
        line-height: 23px;
        letter-spacing: 0em;
        text-align: left;
        color: #303030;
      }
    }
    .product__price {
      display: flex;
      align-items: center;
      gap: 9.75px;
      .product__selling__price {
        color: #ae0000;
        font-size: 33.75px;
        font-weight: 700;
        line-height: 51px;
      }
      .product__cost__price {
        color: #303030;
        font-size: 15px;
        font-weight: 400;
        line-height: 22.5px;
        text-decoration: line-through;
      }
    }
    .product__variants {
      display: flex;
      gap: 6px;
      .product__variants__button {
        width: 110px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #303030;
        font-size: 12px;
        font-weight: 700;
        line-height: 18px;
        border-radius: 3.75px;
        border: 0.75px solid #303030;
        background: #fff;
        cursor: pointer;
        &.active {
          background: #ae0000;
          color: #fff;
          font-weight: 500;
          border: 0.75px solid #ae0000;
        }
      }
    }
    .product__addToCart {
      width: 327.5px;
      height: 42px;
      border-radius: 3.75px;
      border: 0.75px solid #ae0000;
      background: #ae0000;
      color: #fff;
      font-size: 12px;
      font-weight: 500;
      line-height: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const GroupBuy = ({
  productTitle,
  productDescription,
  productOriginalPrice,
  productPrice,
  reverse,
  reviewsCount = 0,
  images,
}) => {
  const priceSymbol = process.env.REACT_APP_PRICE_SYMBOL;
  return (
    <GroupBuyStyle className="group__buy__item" reverse={reverse}>
      <div className="product__image">
        <ImageGallery
          items={images}
          showBullets={false}
          showNav={false}
          showPlayButton={false}
        />
      </div>
      <div className="product__details">
        <div className="product__ratings">
          <ReviewStars />
          <span className="product__reviews__count">
            {reviewsCount} Reviews
          </span>
        </div>
        <p className="product__title">{productTitle}</p>
        <p className="product__description">{productDescription}</p>
        <div className="product__price">
          <div className="product__selling__price">
            {priceSymbol + " " + productPrice.toFixed(2)}
          </div>
          {productOriginalPrice && productOriginalPrice > 0 && (
            <div className="product__cost__price">
              {priceSymbol + " " + productOriginalPrice.toFixed(2)}
            </div>
          )}
        </div>
        <div className="product__variants">
          <div className="product__variants__button">Variant</div>
          <div className="product__variants__button active">Variant</div>
          <div className="product__variants__button">Variant</div>
        </div>
        <div className="product__addToCart">Add to cart</div>
      </div>
    </GroupBuyStyle>
  );
};

export default GroupBuy;
