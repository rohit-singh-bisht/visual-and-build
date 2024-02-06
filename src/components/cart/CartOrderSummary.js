import React from "react";
import styled from "styled-components";

const CartOrderSummaryStyle = styled.div`
  width: 380px;
  border-radius: 11.25px;
  border: 0.75px solid #ccc2c2;
  background: #fff;
  .cart__summary__header,
  .cart__summary__coupon {
    padding: 22px 22px 24px;
    border-bottom: 0.75px solid #ccc2c2;
  }
  .cart__summary__header {
    .cart__summary__title {
      color: #000;
      font-size: 22.5px;
      font-weight: 600;
      margin-bottom: 32px;
    }
  }
  .cart__summary__subtotal,
  .cart__summary__total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .subtotal__title {
      color: #000;
      font-size: 16.5px;
      font-weight: 500;
    }
    .subtotal__value {
      color: #ae0000;
      font-size: 18px;
      font-weight: 600;
      line-height: 22.5px;
    }
  }
  .cart__summary__coupon {
    .cart__summary__coupon__input {
      border-radius: 7.5px;
      border: 0.75px solid rgba(48, 48, 48, 0.25);
      background: #fff;
      height: 50px;
      line-height: 50px;
      color: #303030;
      font-size: 12px;
      font-weight: 400;
      line-height: 18px;
      font-family: Poppins;
      padding: 17.25px;
      width: 100%;
      display: block;
    }
  }
  .cart__summary__subtitle {
    color: #808082;
    font-size: 13.5px;
    font-weight: 400;
    margin-top: 12px;
  }
  .cart__summary__coupon__title,
  .cart__summart__total__title {
    color: #000;
    font-size: 16.5px;
    font-weight: 500;
    margin-bottom: 17.5px;
  }
  .cart__summary__total__wrapper {
    padding: 27px 22px 24px;
    .cart__summary__total {
      margin-bottom: 32px;
    }
  }
  .cart__summary__buttons {
    padding: 30px 22px;
    button {
      font-size: 15px;
      line-height: 22.5px;
      border-radius: 5px;
      height: 58px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
    .continue__shopping {
      color: #000;
      font-weight: 500;
      border: 0.5px solid #ccc2c2;
      background: #fff;
    }
    .checkout {
      font-weight: 700;
      margin-top: 12px;
      color: #fff;
      background: #ae0000;
    }
  }
  @media (max-width: 768px) {
    width: 100%;
    .cart__summary__header,
    .cart__summary__coupon,
    .cart__summary__total__wrapper {
      padding: 15px;
      .cart__summary__title {
        font-size: 16px;
        margin-bottom: 20px;
      }
    }
    .cart__summary__coupon__title {
      font-size: 14px;
    }
    .cart__summary__subtotal,
    .cart__summary__total {
      .subtotal__title,
      .subtotal__value {
        font-size: 14px;
      }
    }
    .cart__summary__total__wrapper {
      .cart__summary__total {
        margin-bottom: 20px;
      }
    }
    .cart__summary__buttons {
      padding: 20px;
    }
  }
`;

const CartOrderSummary = () => {
  return (
    <CartOrderSummaryStyle>
      <div className="cart__summary__header">
        <div className="cart__summary__title">Order Summary</div>
        <div className="cart__summary__subtotal">
          <div className="subtotal__title">Subtotal</div>
          <div className="subtotal__value">$7,733.00</div>
        </div>
      </div>
      <div className="cart__summary__coupon">
        <div className="cart__summary__coupon__title">Apply Coupon</div>
        <input
          type="text"
          placeholder="Enter coupon code (ex: FIRSTPAY)"
          className="cart__summary__coupon__input"
        />
        <p className="cart__summary__subtitle">
          Coupon code will be applied on the checkout page
        </p>
      </div>
      <div className="cart__summary__total__wrapper">
        <div className="cart__summary__total">
          <div className="subtotal__title">Total</div>
          <div className="subtotal__value">$7,733.00</div>
        </div>

        <p className="cart__summary__subtitle">
          Tax included and shipping calculated at checkout
        </p>
      </div>
      <div className="cart__summary__buttons">
        <button className="continue__shopping">Continue Shopping</button>
        <button className="checkout">Checkout</button>
      </div>
    </CartOrderSummaryStyle>
  );
};

export default CartOrderSummary;
