import React from "react";
import styled from "styled-components";

const PaymentStyle = styled.div`
  .page__title {
    font-size: 27px;
    font-weight: 600;
    line-height: 35px;
    text-align: left;
    margin-top: 60px;
  }
  .payment__methods__list {
    .payment__method {
      border: 0.75px solid #d9d9d9;
      height: 75px;
      width: 100%;
      display: flex;
      align-items: center;
    }
  }
`;

const Payment = () => {
  return (
    <PaymentStyle>
      <h2 className="page__title">Payments</h2>
      <div className="payment__methods__list">
        <div className="payment__method">
          <input type="radio" name="payment_method" value={"stripe"} />
        </div>
      </div>
    </PaymentStyle>
  );
};

export default Payment;
