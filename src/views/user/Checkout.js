import React, { useCallback, useState } from "react";
import styled from "styled-components";
import BillingDetails from "../../checkout/BillingDetails";

const CheckoutStyle = styled.div`
  padding: 70px 0;
  .page__title {
    color: #303030;
    text-align: center;
    font-size: 42px;
    font-weight: 700;
    line-height: 51px;
    margin-bottom: 27px;
  }
  .checkout__wrapper {
    display: flex;
    .checkout__billing__wrapper {
      flex: 1;
      .checkout__billing__title {
        color: #303030;
        font-size: 27px;
        font-weight: 600;
        line-height: 34.5px;
        margin-bottom: 32.5px;
      }
      .checkout__billing__details {
        margin-bottom: 15.75px;
      }
    }
    .checkout__order__summary__wrapper {
      width: 445px;
    }
    .checkout__add__new__address__wrapper {
      text-align: right;
    }
    .checkout__add__new__address {
      color: #ae0000;
      font-size: 12px;
      font-weight: 600;
      display: inline-block;
    }
    .checkout__order__notes {
      margin-top: 54px;
      .checkout__order__notes__title {
        color: #303030;
        font-size: 15px;
        font-weight: 700;
        line-height: 22.5px;
        margin-bottom: 8.5px;
      }
      .checkout__order__notes__textarea {
        padding: 18px 24px;
        width: 100%;
        border-radius: 7.5px;
        border: 0.75px solid rgba(48, 48, 48, 0.25);
        background: #fff;
        height: 130px;
        resize: vertical;
      }
    }
  }
`;

const Checkout = () => {
  // eslint-disable-next-line
  const [billingType, setBillingType] = useState();

  const handleChangeBilling = useCallback((e) => {
    setBillingType(e.target.value);
  }, []);

  return (
    <CheckoutStyle>
      <div className="container">
        <div className="page__title">Checkout</div>
        <div className="checkout__wrapper">
          <div className="checkout__billing__wrapper">
            <h2 className="checkout__billing__title">Billing Details</h2>
            <div className="checkout__billing__details">
              <BillingDetails
                billingMethod={"Choose Pickup"}
                billerName={"The mechanical Shop"}
                billingAddress={
                  "House no 11 Sawaswati colony naya pul sehatpur, Naya pul Faridabad - 121003, Haryana"
                }
                billingPhone={"7503063585, 7503063585"}
                billingType={"pickup"}
                onClick={handleChangeBilling}
                index={1}
              />
            </div>
            <div className="checkout__billing__details">
              <BillingDetails
                billingMethod={"Choose Pickup"}
                billerName={"The mechanical Shop"}
                billingAddress={
                  "House no 11 Sawaswati colony naya pul sehatpur, Naya pul Faridabad - 121003, Haryana"
                }
                billingPhone={"7503063585, 7503063585"}
                billingType={"delivery"}
                onClick={handleChangeBilling}
                index={2}
              />
            </div>
            <div className="checkout__add__new__address__wrapper">
              <div className="checkout__add__new__address">Add New Address</div>
            </div>

            <div className="checkout__order__notes">
              <h3 className="checkout__order__notes__title">Order Notes</h3>
              <textarea
                className="checkout__order__notes__textarea"
                placeholder="Enter your order notes ..."
              ></textarea>
            </div>
          </div>
          <div className="checkout__order__summary__wrapper"></div>
        </div>
      </div>
    </CheckoutStyle>
  );
};

export default Checkout;
