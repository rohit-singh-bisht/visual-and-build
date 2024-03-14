import React from "react";
import styled from "styled-components";
import { ReactComponent as HelpCircle } from "../../assets/help-circle.svg";
import { ReactComponent as RadioEmpty } from "../../assets/radio-empty.svg";
import { ReactComponent as RadioFilled } from "../../assets/radio-filled.svg";

const BillingDetailsStyle = styled.div`
  .billing__input {
    position: absolute;
    opacity: 0;
    visibility: hidden;
    &:checked {
      + .billing__details__wrapper {
        border: 1.5px solid #ae0000;
        background: #fff3f3;
        .billing__radio__icon {
          .empty {
            display: none;
          }
          .filled {
            display: block;
          }
        }
      }
    }
  }
  .billing__details__wrapper {
    border-radius: 4.5px;
    border: 1.5px solid #d9d9d9;
    background: #fff;
    display: inline-flex;
    align-items: center;
    padding: 22px;
    cursor: pointer;
    gap: 14.25px;
    width: 100%;
  }
  .billing__radio__icon {
    .empty {
      display: block;
    }
    .filled {
      display: none;
    }
  }
  .billing__details {
    text-transform: capitalize;
    .billing__method {
      color: #000;
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 10.5px;
    }
    .details {
      font-size: 11.25px;
      font-weight: 400;
      margin-bottom: 6.75px;
    }
    .billing__details__phone__title {
      margin-bottom: 0;
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
  .distance__from__home {
    color: #ae0000;
    font-size: 12px;
    font-weight: 500;
    margin-top: 15px;
    display: flex;
    gap: 5px;
  }
  @media (max-width: 768px) {
    .billing__details__wrapper {
      padding: 15px;
      .billing__radio__icon {
        .icon {
          width: 15px;
        }
      }
    }
  }
`;

const BillingDetails = ({
  billingTitle,
  billingMethod,
  billerName,
  billingAddress,
  billingPhone,
  billingType,
  onClick,
  index,
  isChecked,
}) => {
  return (
    <>
      <BillingDetailsStyle>
        <input
          id={"billing__address" + billingMethod + index}
          onChange={(e) =>
            onClick(e, billingAddress, billingType, billingMethod)
          }
          value={billingAddress}
          name={billingMethod}
          type="radio"
          className="billing__input"
          checked={isChecked}
        />
        <label
          className={"billing__details__wrapper"}
          htmlFor={"billing__address" + billingMethod + index}
        >
          <div className="billing__radio__icon">
            <RadioEmpty className="icon empty" />
            <RadioFilled className="icon filled" />
          </div>
          <div className="billing__details">
            <div className="billing__method">{billingTitle}</div>
            <div className="details billing__details__name">{billerName}</div>
            <div className="details billing__details__address">
              {billingAddress}
            </div>
            {billingPhone?.length > 0 && (
              <>
                <div className="details billing__details__phone__title">
                  Phone number
                </div>
                <div className="details billing__details__phone">
                  {billingPhone}
                </div>
              </>
            )}
            {billingType === "pickup" && (
              <p className="distance__from__home">
                <HelpCircle /> 5 km Far From Your House
              </p>
            )}
          </div>
        </label>
      </BillingDetailsStyle>
    </>
  );
};

export default BillingDetails;
