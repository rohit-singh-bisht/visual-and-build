import React, { useState } from "react";
import styled from "styled-components";
import { useRequest } from "../../../hooks/useRequest";
import useRazorpay from "react-razorpay";
import { useAppContext } from "../../../context/useAppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
        width: 180px;
        &:disabled {
          background: #a7a7a7;
        }
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
          background-color: #ffecec;
        }
      }
    }
  }
  .coupon__and__subtotal {
    margin-top: 52px;
    display: flex;
    justify-content: flex-end;
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
    .payment__summary {
      flex: 0 0 450px;
      border-radius: 7.5px;
      border: 0.75px solid #d9d9d9;
      background: #fcfcfc;
      padding: 14px 20px;
    }
    .subtotal__amount {
      display: flex;
      padding: 6px 0;
      align-items: center;
      justify-content: space-between;
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

const Payment = ({ createOrderData, orderSummaryData }) => {
  const [handleRequest] = useRequest();
  const [Razorpay] = useRazorpay();
  const { user, checkoutCartData, appliedCoupon } = useAppContext();
  const [selectedMethod, setSelectedMethod] = useState();
  const navigate = useNavigate();

  const handleDeleteCart = async (cartId) => {
    const path = `/instacart/${cartId}/delete`;
    await handleRequest({ path, method: "DELETE" });
  };

  const handleCreateOrder = async (paymentId, orderData) => {
    const path = `/order/checkout/store`;
    const response = await handleRequest({
      path,
      method: "POST",
      body: JSON.stringify({
        ...orderData,
        paymentRefNumber: paymentId,
        paymentMethod: selectedMethod,
      }),
    });
    if (!response.success) {
      return toast.error(response.message);
    }
    handleDeleteCart(checkoutCartData?._id);
    navigate("/thankyou", { state: { fromCheckout: true } });
  };

  const handlePayment = (createOrderData) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: createOrderData?.subtotal * 100,
      name: "Visual And Build",
      handler: function (response) {
        const { razorpay_payment_id } = response;
        handleCreateOrder(razorpay_payment_id, createOrderData);
      },
      prefill: {
        name: user?.name,
        email: user?.email,
        // contact: "9999999999",
      },
      theme: {
        color: "#ae0000",
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  };

  return (
    <PaymentStyle>
      <h2 className="tittle">Payments</h2>
      <div className="payment__methods__list">
        <div className="payment__method__wrapper">
          <input
            id="method1"
            type="radio"
            name="payment_method"
            value={"stripe"}
            onChange={(e) => setSelectedMethod(e.target.value)}
            checked={selectedMethod === "stripe"}
          />
          <label htmlFor="method1" className="payment__method">
            <img src="/images/stripe.png" alt="stripe" />
          </label>
          <button
            className="pay__now"
            onClick={() => handlePayment(createOrderData)}
            disabled={selectedMethod !== "stripe"}
          >
            Pay Now
          </button>
        </div>
        <div className="payment__method__wrapper">
          <input
            id="method2"
            type="radio"
            name="payment_method"
            value={"cod"}
            onChange={(e) => setSelectedMethod(e.target.value)}
            checked={selectedMethod === "cod"}
          />
          <label htmlFor="method2" className="payment__method">
            Cash on delivery
          </label>
          <button
            className="pay__now"
            onClick={() => handleCreateOrder("", createOrderData)}
            disabled={selectedMethod !== "cod"}
          >
            Order Now
          </button>
        </div>
      </div>
      <div className="coupon__and__subtotal">
        {/* <div className="coupon__wrapper">
            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Enter coupon code (ex: FIRSTPAY)"
                value={createOrderData?.coupon}
              />
              <h2 className="apply__code" onClick={}>Apply Code</h2>
            </div>
          </div> */}
        <div className="payment__summary">
          <div className="subtotal__amount">
            <h3 className="title">SUB TOTAL</h3>
            <h2 className="amount">
              {process.env.REACT_APP_PRICE_SYMBOL}
              {orderSummaryData?.subtotal}
            </h2>
          </div>
          <div className="subtotal__amount">
            <h3 className="title">
              DISCOUNT
              {appliedCoupon && (
                <span style={{ fontSize: "10px", color: "#4caf50" }}>
                  ( {appliedCoupon} )
                </span>
              )}
            </h3>
            <h2 className="amount" style={{ color: "rgb(76, 175, 80)" }}>
              {process.env.REACT_APP_PRICE_SYMBOL}
              {orderSummaryData?.discountAmount}
            </h2>
          </div>
          <div className="subtotal__amount">
            <h3 className="title">SHIPPING</h3>
            <h2 className="amount">
              {process.env.REACT_APP_PRICE_SYMBOL}
              {orderSummaryData?.shippingCharges}
            </h2>
          </div>
          <div className="subtotal__amount">
            <h3 className="title">TAX</h3>
            <h2 className="amount">
              {process.env.REACT_APP_PRICE_SYMBOL}
              {orderSummaryData?.taxAmount}
            </h2>
          </div>
          <div className="subtotal__amount">
            <h3 className="title">TOTAL</h3>
            <h2 className="amount">
              {process.env.REACT_APP_PRICE_SYMBOL}
              {orderSummaryData?.totalAmount}
              <span>( incl. taxes & shipping )</span>
            </h2>
          </div>
        </div>
      </div>
    </PaymentStyle>
  );
};

export default Payment;
