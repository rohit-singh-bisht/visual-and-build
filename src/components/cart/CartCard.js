import React from "react";
import styled from "styled-components";
import QuantityInput from "../common/QuantityInput";

const CartProductCardStyle = styled.div`
  display: flex;
  align-items: center;
  padding: 30px 24px;
  gap: 10px;
  .cart__product__wrapper {
    flex: 1;
    display: flex;
    gap: 18px;
    padding-right: 40px;
    .cart__product__image {
      width: 82px;
    }
    .cart__product__details {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: #303030;
      .cart__product__category {
        font-size: 11.25px;
        font-weight: 400;
        line-height: 15px;
      }
      .cart__product__title {
        font-size: 15px;
        font-weight: 600;
        line-height: 22.5px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .cart__product__variant {
        color: #303030;
        font-size: 12px;
        font-weight: 600;
        line-height: 18px;
        span {
          font-weight: 400;
        }
      }
    }
  }
  .cart__cell {
    flex: 0 0 120px;
  }
  .cart__product__price,
  .cart__product__total,
  .cart__product__qty {
    color: #303030;
    font-size: 15px;
    font-weight: 600;
    line-height: 22.5px; /* 150% */
    text-align: center;
  }
  .cart__product__qty {
    display: flex;
    justify-content: center;
  }
  .cart__product__total {
    flex: 0 0 90px;
    text-align: right;
  }
`;

const CartProductCard = ({ src, title }) => {
  return (
    <CartProductCardStyle>
      <div className="cart__product__wrapper">
        <div className="cart__product__image">
          <img src={src} alt={title} />
        </div>
        <div className="cart__product__details">
          <p className="cart__product__category">Flooring</p>
          <p className="cart__product__title" title={title}>
            Rust-Oleum Varathane Ultra Thick Floor Finish...
          </p>
          <p className="cart__product__variant">
            Variant: <span>Space Gray</span>
          </p>
        </div>
      </div>
      <h2 className="cart__cell cart__product__price">$1,659.00</h2>
      <div className="cart__cell cart__product__qty">
        <QuantityInput />
      </div>
      <h2 className="cart__cell cart__product__total">$1,659.00</h2>
      {/* <div className="cart__cell cart__product__wishlist"></div> */}
    </CartProductCardStyle>
  );
};

export default CartProductCard;