import React from "react";
import styled from "styled-components";

const BillingDetailsStyle = styled.div`
  border-radius: 4.5px;
  border: 1.5px solid #d9d9d9;
  background: #fff;
  .radio__icon {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: ;
  }
  .billing__details {
    .billing__method {
      color: #000;
      font-size: 12px;
      font-weight: 600;
    }
    .details {
      font-size: 11.25px;
      font-weight: 400;
    }
    .billing__details__name,
    .billing__details__phone__title {
      color: #000;
    }
    .billing__details__address,
    .billing__details__phone {
      color: #797979;
    }
  }
`;

const BillingDetails = ({
  billingMethod,
  billerName,
  billingAddress,
  billingPhone,
}) => {
  return (
    <BillingDetailsStyle>
      <div className="billing__radio__icon">
        <input type="radio" />
      </div>
      <div className="billing__details">
        <div className="billing__method">{billingMethod}</div>
        <div className="details billing__details__name">{billerName}</div>
        <div className="details billing__details__address">
          {billingAddress}
        </div>
        <div className="details billing__details__phone__title">
          Phone number
        </div>
        <div className="details billing__details__phone">{billingPhone}</div>
      </div>
    </BillingDetailsStyle>
  );
};

export default BillingDetails;
