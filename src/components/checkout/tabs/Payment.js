import React from "react";
import styled from "styled-components";
import IconWithTextList from "../../common/IconWithTextList";

const PaymentStyle = styled.div`
  .tittle {
    font-size: 27px;
    font-weight: 600;
    line-height: 35px;
    text-align: left;
    margin-top: 60px;
    margin-bottom: 30px;
  }
  .payment__methods__list {
    .payment__method__wrapper {
      position: relative;
      margin: 22px 0;
      .pay__now {
        font-size: 15px;
        font-weight: 700;
        line-height: 23px;
        text-align: center;
        height: 52px;
        padding: 0 52px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        background-color: #ae0000;
        color: #fff;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 26px;
      }
    }
    .payment__method {
      border: 0.75px solid #d9d9d9;
      height: 75px;
      width: 100%;
      display: flex;
      align-items: center;
      padding: 18px 18px 18px 50px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      line-height: 35px;
      text-align: left;
      img {
        width: auto;
      }
    }
    input {
      accent-color: #ae0000;
      position: absolute;
      top: 50%;
      transform: translateY(-59%);
      left: 18px;
      width: 20px;
      height: 20px;
      &:checked {
        + label {
          border: 0.75px solid #ae0000;
        }
      }
    }
  }
  .coupon__and__subtotal {
    margin-top: 52px;
    display: flex;
    justify-content: space-between;
    .coupon__wrapper {
      position: relative;
      flex: 0 0 450px;
      input {
        width: 100%;
        height: 70px;
        border: 0.75px solid #303030;
        border-radius: 7.5px;
        padding: 20px;
        font-family: "Poppins";
      }
      .apply__code {
        font-size: 15px;
        font-weight: 600;
        line-height: 23px;
        background: none;
        text-decoration: underline;
        text-underline-offset: 1px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 24px;
        cursor: pointer;
      }
    }
    .subtotal__amount {
      border: 0.75px solid #d9d9d9;
      background: #fcfcfc;
      display: flex;
      align-items: center;
      border-radius: 7.5px;
      padding: 20px;
      justify-content: space-between;
      flex: 0 0 450px;
      .title {
        font-size: 14px;
        font-weight: 700;
        line-height: 22px;
      }
      .amount {
        font-size: 18px;
        font-weight: 600;
        line-height: 23px;
        color: #ae0000;
        span {
          font-size: 11px;
          font-weight: 400;
          line-height: 15px;
          color: #303030;
          display: inline-block;
          margin-left: 15px;
        }
      }
    }
  }
`;

const Payment = () => {
  return (
    <>
      <PaymentStyle>
        <h2 className="tittle">Payments</h2>
        <div className="payment__methods__list">
          <div className="payment__method__wrapper">
            <input
              id="method1"
              type="radio"
              name="payment_method"
              value={"stripe"}
            />
            <label for="method1" className="payment__method">
              <img src="/images/stripe.png" alt="stripe" />
            </label>
            <button className="pay__now">Pay Now</button>
          </div>
          <div className="payment__method__wrapper">
            <input
              id="method2"
              type="radio"
              name="payment_method"
              value={"cod"}
            />
            <label for="method2" className="payment__method">
              Cash on delivery
            </label>
            <button className="pay__now">Pay Now</button>
          </div>
        </div>
        <div className="coupon__and__subtotal">
          <div className="coupon__wrapper">
            <input type="text" placeholder="Enter coupon code (ex: FIRSTPAY)" />
            <h2 className="apply__code">Apply Code</h2>
          </div>
          <div className="subtotal__amount">
            <h3 className="title">SUB TOTAL</h3>
            <h2 className="amount">
              $7,733.00
              <span>( excl. shipping fee )</span>
            </h2>
          </div>
        </div>
      </PaymentStyle>
      <div className="icon_with_text">
        <div className="container">
          <IconWithTextList />
        </div>
      </div>
    </>
  );
};

export default Payment;
