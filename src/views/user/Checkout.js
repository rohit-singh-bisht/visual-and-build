import React from "react";
import styled from "styled-components";
import BillingDetails from "../../checkout/BillingDetails";

const CheckoutStyle = styled.div`
  .page__title {
    color: #303030;
    text-align: center;
    font-size: 42px;
    font-weight: 700;
    line-height: 51px; /* 121.429% */
  }
  .checkout__wrapper {
    display: flex;
    .checkout__billing__wrapper {
      .checkout__billing__title {
        color: #303030;
        font-size: 27px;
        font-weight: 600;
        line-height: 34.5px;
      }
    }
  }
`;

const Checkout = () => {
  return (
    <CheckoutStyle>
      <div className="page__title">Checkout</div>
      <div className="checkout__wrapper">
        <div className="checkout__billing__wrapper">
          <h2 className="checkout__billing__title">Billing Details</h2>
          <BillingDetails
            billingMethod={"Choose Pickup"}
            billerName={"The mechanical Shop"}
          />
        </div>
      </div>
    </CheckoutStyle>
  );
};

export default Checkout;
