import React, { useEffect } from "react";
import styled from "styled-components";
import Button from "../../components/common/Button";
import { useLocation, useNavigate } from "react-router-dom";
import IconWithTextList from "../../components/common/IconWithTextList";
import { useAppContext } from "../../context/useAppContext";

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
      text-transform: capitalize;
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
  .order__details__item {
    margin: 32px 0;
    display: flex;
    align-items: center;
    gap: 32px;
    .order__details__item__image {
      width: 72px;
      height: 90px;
    }
    .order__details__item__desc {
      .tag {
        font-size: 12px;
        font-weight: 400;
        line-height: 15px;
        text-align: left;
        color: #303030;
        margin-bottom: 6px;
        text-transform: lowercase;
      }
      .product__name {
        font-size: 15px;
        font-weight: 600;
        line-height: 23px;
        text-align: left;
        color: #303030;
        width: 400px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin-bottom: 6px;
        text-transform: capitalize;
      }
      .product__quantity {
        font-size: 12px;
        font-weight: 600;
        line-height: 18px;
        text-align: left;
        color: #303030;
        span {
          font-weight: 400;
        }
      }
    }
    .order__details__item__price {
      font-size: 15px;
      font-weight: 600;
      line-height: 24px;
      text-align: center;
      flex: 1;
      color: #303030;
    }
  }
  .more__shopping__button {
    text-align: right;
    margin-top: 22px;
    button {
      width: 166px;
      height: 52px;
      background-color: #ae0000;
      border-radius: 5px;
      font-size: 15px;
      font-weight: 700;
      line-height: 22.5px;
      color: #fff;
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
  const { thankyouData, setThankyouData } = useAppContext();

  useEffect(() => {
    if (!isFromCheckout || !(thankyouData && Object.keys(thankyouData)?.length))
      return navigate("/");
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
                <div className="textt order__id">
                  Order ID : {thankyouData?.orderId}
                </div>
                <div className="textt order__date">
                  Order Date : {thankyouData?.orderDate}
                </div>
              </div>
              <div className="order__summary__wrap boxx">
                <div className="delivery__adrress">
                  <div className="order__summary__wrap__title">
                    Delivery Address
                  </div>
                  <div className="order__summary__content">
                    {thankyouData?.address}
                  </div>
                </div>
                <div className="payment__method">
                  <div className="order__summary__wrap__title">
                    Payment Method
                  </div>
                  <div className="order__summary__content">
                    {thankyouData?.paymentMethod}
                  </div>
                </div>
                <div className="order__summary">
                  <div className="order__summary__wrap__title">
                    Order Summary
                  </div>
                  <div className="order__summary__data">
                    <div className="order__summary__data__item">
                      <div className="data">Subtotal</div>
                      <div className="data bold">
                        {process.env.REACT_APP_PRICE_SYMBOL}
                        {thankyouData?.subtotal?.subtotal.toFixed(2)}
                      </div>
                    </div>
                    <div className="order__summary__data__item">
                      <div className="data">Shipping Fee</div>
                      <div className="data bold">
                        {process.env.REACT_APP_PRICE_SYMBOL}
                        {thankyouData?.subtotal?.shippingCharges.toFixed(2)}
                      </div>
                    </div>
                    <div className="order__summary__data__item">
                      <div className="data bold">Total</div>
                      <div className="data bold">
                        {process.env.REACT_APP_PRICE_SYMBOL}
                        {thankyouData?.subtotal?.totalAmount.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order__details boxx">
            <div className="order__details__ttitle">Order Details</div>
            {thankyouData?.products?.map((item) => (
              <div className="order__details__item">
                <div className="order__details__item__image">
                  <img
                    src={`${process.env.REACT_APP_MEDIA_ASSETS_URL}/${item?.product?.image}`}
                  />
                </div>
                <div className="order__details__item__desc">
                  <div className="tag">{item?.product?.tags?.join(", ")}</div>
                  <div className="product__name">{item?.product?.name}</div>
                  <div className="product__quantity">
                    Quantity: <span>{item?.quantity}</span>
                  </div>
                </div>
                <h4 className="order__details__item__price">
                  {process.env.REACT_APP_PRICE_SYMBOL}
                  {(item?.product?.price - item?.product?.discount).toFixed(2)}
                </h4>
              </div>
            ))}
          </div>
          <div className="more__shopping__button">
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
                setThankyouData();
              }}
            >
              More Shopping
            </button>
          </div>
        </div>
      </ThankyouStyle>
      <IconWithTextList />
    </>
  );
};

export default Thankyou;
