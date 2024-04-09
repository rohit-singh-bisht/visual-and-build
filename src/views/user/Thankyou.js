import React, { useEffect } from "react";
import styled from "styled-components";
import Button from "../../components/common/Button";
import { useLocation, useNavigate } from "react-router-dom";
import IconWithTextList from "../../components/common/IconWithTextList";

const ThankyouStyle = styled.div`
  padding: 100px 0;
  .thank_you {
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
    text-align: center;
  }
  .subtext {
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    text-align: center;
  }
  .order__summary__wrapper {
    margin-top: 60px;
    .order__summary__header {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      .textt {
        font-size: 15px;
        font-weight: 600;
        line-height: 18px;
        text-align: left;
      }
    }
  }
  .boxx {
    padding: 28px;
    border: 1px solid #e0e0e0;
    box-shadow: 0px 4px 6.8px 0px #00000014;
    border-radius: 15px;
  }
  .order__summary__wrap {
    display: flex;
    gap: 60px;
  }
  .payment__method {
    flex: 0 0 250px;
  }
  .delivery__adrress {
    flex: 0 0 300px;
    .order__summary__content {
      font-size: 12px;
      font-weight: 400;
      line-height: 18px;
      text-align: left;
    }
  }
  .order__summary__wrap__title {
    font-size: 15px;
    font-weight: 600;
    line-height: 18px;
    text-align: left;
    margin-bottom: 26px;
  }
  .order__summary {
    flex: 1;
    .order__summary__data {
      .order__summary__data__item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 14px;
        .data {
          font-size: 12px;
          font-weight: 400;
          line-height: 20px;
          text-align: left;
          &.bold {
            font-weight: 700;
          }
        }
      }
    }
  }
  .order__details {
    margin-top: 24px;
    .order__details__ttitle {
      font-size: 15px;
      font-weight: 600;
      line-height: 18px;
      text-align: left;
    }
  }
  @media (max-width: 768px) {
    padding: 40px 0;
  }
`;

const Thankyou = () => {
  const location = useLocation();
  const { state } = location;
  const isFromCheckout = state && state.fromCheckout;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isFromCheckout) return navigate("/");
  }, [isFromCheckout]);

  return (
    <>
      <ThankyouStyle>
        <div className="container">
          <div className="wrapper">
            <div className="icon"></div>
            <div className="thank_you">
              Thank you! Your Order Placed Successfuly.
            </div>
            <p className="subtext">
              Your Request Has been successfully submitted and will be processed
              soon, Follow your Request status at PURCHASE HISTORY section in
              your profile
            </p>
            <div className="order__summary__wrapper ">
              <div className="order__summary__header">
                <div className="textt order__id">Order ID : 239238428349</div>
                <div className="textt order__date">Order Date : 23/3/2024</div>
              </div>
              <div className="order__summary__wrap boxx">
                <div className="delivery__adrress">
                  <div className="order__summary__wrap__title">
                    Delivery Address
                  </div>
                  <div className="order__summary__content">
                    Yorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc vulputate libero et velit interdum, ac aliquet odio
                    mattis.
                  </div>
                </div>
                <div className="payment__method">
                  <div className="order__summary__wrap__title">
                    Payment Method
                  </div>
                  <div className="order__summary__content">COD</div>
                </div>
                <div className="order__summary">
                  <div className="order__summary__wrap__title">
                    Order Summary
                  </div>
                  <div className="order__summary__data">
                    <div className="order__summary__data__item">
                      <div className="data">Delivery Fee</div>
                      <div className="data bold">$10.00</div>
                    </div>
                    <div className="order__summary__data__item">
                      <div className="data">Shipping Fee</div>
                      <div className="data bold">$10.00</div>
                    </div>
                    <div className="order__summary__data__item">
                      <div className="data bold">Total</div>
                      <div className="data bold">$4,999.00</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order__details boxx">
            <div className="order__details__ttitle">Order Details</div>
          </div>
        </div>
      </ThankyouStyle>
      <IconWithTextList />
    </>
  );
};

export default Thankyou;
