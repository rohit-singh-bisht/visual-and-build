import React from "react";
import styled from "styled-components";
import { ReactComponent as InfoSvg } from "../../assets/info.svg";

const CheckoutOrderSummaryStyle = styled.div`
  padding: 30px;
  border-radius: 11.25px;
  border: 0.75px solid #d9d9d9;
  background: #fff;
  .checkout__order__summary__item {
    display: flex;
    justify-content: space-between;
    gap: 45px;
    padding-top: 15px;
    border-top: 0.75px solid rgba(48, 48, 48, 0.25);
    margin-top: 35px;
    &:first-child {
      border-top: 0px;
      padding-top: 0px;
    }
  }
  .checkout__order__summary__title {
    color: #303030;
    font-size: 18px;
    font-weight: 600;
    line-height: 22.5px;
  }
  .checkout__order__summary__item__title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-clamp: 2;
    color: #303030;
    font-size: 15px;
    font-weight: 400;
    line-height: 22.5px;
    &.flex {
      display: flex;
      gap: 4px;
    }
  }
  .checkout__order__summary__item__quantity,
  .checkout__order__summary__item__totals {
    color: #303030;
    font-size: 15px;
    font-weight: 700;
    line-height: 22.5px;
  }
  .checkout__order__summary__handler {
    padding: 18px;
    margin-top: 35px;
    .checkout__order__summary__subtotals {
      display: flex;
      justify-content: space-between;
      .checkout__items__total__title {
        color: #303030;
        font-size: 12px;
        font-weight: 700;
        line-height: 18px;
      }
    }
    .checkout__now__button {
      color: #fff;
      text-align: center;
      font-size: 10px;
      font-weight: 700;
      line-height: 14px;
      border-radius: 5px;
      width: 250px;
      height: 38px;
      background: #ae0000;
      margin-top: 20px;
    }
  }
  @media (max-width: 768px) {
    padding: 15px;
    .checkout__order__summary__title {
      font-size: 16px;
    }
    .checkout__order__summary__item__list {
      padding-top: 8px;
    }
    .checkout__order__summary__item {
      margin-top: 12px;
      gap: 24px;
    }
    .checkout__order__summary__item__title {
      font-size: 14px;
    }
    .checkout__order__summary__item__quantity,
    .checkout__order__summary__item__totals {
      font-size: 14px;
      font-weight: 600;
    }
    .checkout__order__summary__handler .checkout__now__button {
      width: 100%;
      font-size: 14px;
      height: 42px;
    }
  }
`;

const CheckoutOrderSummary = ({ handleOrderNow }) => {
  return (
    <CheckoutOrderSummaryStyle>
      <h3 className="checkout__order__summary__title">Order Summary</h3>
      <div className="checkout__order__summary__item__list">
        {Array.from({ length: 5 }, (_, index) => index + 1).map((item) => (
          <div className="checkout__order__summary__item">
            <p className="checkout__order__summary__item__title">
              Rust-Oleum Varathane Ultra Thick Floor Finish...
            </p>
            <h4 className="checkout__order__summary__item__quantity">{item}</h4>
            <h4 className="checkout__order__summary__item__totals">
              $1,659.00
            </h4>
          </div>
        ))}
        <div className="checkout__order__summary__item">
          <p className="checkout__order__summary__item__title flex">
            Shipping Fee
            <sup>
              <InfoSvg className="shipping__info__icon" />
            </sup>
          </p>
          <h4 className="checkout__order__summary__item__totals">$1,659.00</h4>
        </div>
      </div>
      <div className="checkout__order__summary__handler">
        <div className="checkout__order__summary__subtotals">
          <div className="checkout__items__total__title">Total</div>
          <div className="checkout__order__summary__item__totals">
            $4,999.00
          </div>
        </div>
        <button className="checkout__now__button" onClick={handleOrderNow}>
          Order Now
        </button>
      </div>
    </CheckoutOrderSummaryStyle>
  );
};

export default CheckoutOrderSummary;