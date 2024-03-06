import React from "react";
import styled from "styled-components";
import QuantityInput from "../common/QuantityInput";

const CartProductCardStyle = styled.div`
  display: flex;
  align-items: center;
  padding: 30px 24px;
  gap: 10px;
  position: relative;
  .cart__product__wrapper {
    flex: 1;
    display: flex;
    gap: 18px;
    padding-right: 40px;
    .cart__product__image {
      width: 82px;
      height: 114px;
    }
    .cart__product__details {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: #303030;
      padding: 5px 0;
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
    line-height: 22.5px;
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
  .cart__product__wishlist {
    color: #ae0000;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    position: absolute;
    right: 25px;
    bottom: 18px;
    background-color: #fff;
  }
  @media (max-width: 768px) {
    flex-wrap: wrap;
    padding: 15px 15px 30px;
    gap: 4px;
    justify-content: space-between;
    .cart__product__wrapper {
      flex: auto;
      padding-right: 70px;
      gap: 12px;
      .cart__product__details .cart__product__title {
        font-size: 14px;
        -webkit-line-clamp: 3;
      }
      .cart__product__image {
        width: 70px;
        height: 70px;
      }
    }
    .cart__product__total {
      position: absolute;
      right: 15px;
      top: 15px;
    }
    .cart__product__price {
      margin-left: 84px;
    }
    .cart__product__wishlist {
      bottom: 12px;
      right: auto;
      left: 98px;
    }
    .cart__product__price,
    .cart__product__total,
    .cart__product__qty {
      flex: 0;
      font-size: 12px;
    }
  }
`;

const CartProductCard = ({ src, title, isSchedule }) => {
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
      <button className="cart__product__wishlist">
        {isSchedule ? "Schedule" : "Add to wishlist"}
      </button>
    </CartProductCardStyle>
  );
};

export default CartProductCard;
