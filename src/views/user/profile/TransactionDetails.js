import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useRequest } from "../../../hooks/useRequest";
import { getDate } from "../../../utils/helper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useAppContext } from "../../../context/useAppContext";
import ReturnProductModal from "../../../components/modals/ReturnProductModal";

const TransactionDetailsStyle = styled.div`
  flex: 1;
  .bold__title {
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    text-align: left;
    color: #333333;
    margin-bottom: 8px;
  }
  .transaction__header {
    border: 0.5px solid #cccccc;
    border-bottom: 0;
    padding: 12px 12px 0;
    .data {
      font-size: 12px;
      line-height: 20px;
      text-align: left;
      &.customer__name {
        text-transform: capitalize;
      }
    }
    .sales__info {
      font-size: 12px;
      line-height: 20px;
      color: #000000;
      padding: 12px 0;
      span {
        font-weight: 700;
      }
    }
  }
  .transaction__order__summary {
    border-left: 0.5px solid #cccccc;
    border-right: 0.5px solid #cccccc;
    border-bottom: 0.5px solid #cccccc;
    .transaction__order__summary__header {
      background: #f2f2f2;
      padding: 12px;
      display: flex;
      .transaction__order__th {
        font-size: 12px;
        font-weight: 700;
        line-height: 20px;
        text-align: center;
        flex: 1;
        &:first-child {
          text-align: left;
          flex: 0 0 500px;
        }
        &:last-child {
          text-align: right;
        }
      }
    }
    .transaction__order__summary__body {
      display: flex;
      padding: 12px;
      .transaction__order__td {
        flex: 1;
        &:last-child {
          text-align: right;
        }
      }
    }
    .transaction__order__td {
      font-size: 12px;
      font-weight: 400;
      line-height: 20px;
      text-align: center;
      &:first-child {
        flex: 0 0 500px;
      }
    }
    .transaction__item__details {
      display: flex;
      gap: 12px;
      .transaction__item__image {
        img {
          width: 108px;
        }
      }
      .transaction__item__info {
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
        text-align: left;
        color: #333333;
        .product__name {
          font-weight: 700;
          color: #000;
          margin: 4px 0;
          text-transform: capitalize;
        }
        .product__description {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          span {
            font-weight: 700;
          }
          &.sku {
            margin: 10px 0;
          }
        }
      }
    }
    .transaction__order__summary__footer {
      background: #f2f2f2;
      padding: 12px;
      font-size: 12px;
      font-weight: 400;
      line-height: 20px;
      display: flex;
      justify-content: flex-end;
      gap: 100px;
    }
    .transaction__payment__info {
      padding: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .transaction__payment__method {
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
        text-align: left;
        text-transform: capitalize;
        span {
          font-weight: 700;
        }
      }
      .transaction__order__total {
        font-size: 12px;
        font-weight: 700;
        line-height: 12px;
        text-align: left;
        display: flex;
        gap: 100px;
      }
    }
  }
  .transaction__order__status {
    border: 0.75px solid #d9d9d9;
    padding: 40px 0 32px;
    margin-top: 10px;
    .css-1vyamtt-MuiStepLabel-labelContainer {
      color: #898989;
    }
    .Mui-active,
    .Mui-completed {
      color: #3f8e00;
      .MuiStepConnector-line {
        border-color: #3f8e00;
      }
    }
    .MuiStepConnector-line {
      border-top-width: 2px;
    }
    .transaction__order__action {
      padding: 0 20px;
      margin-top: 32px;
      display: flex;
      gap: 20px;
      button {
        font-size: 12px;
        font-weight: 500;
        line-height: 20px;
        height: 36px;
        padding: 0 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        color: #ffffff;
        &.dark {
          background: #000000;
        }
        &.accent {
          background: #ae0000;
        }
      }
    }
  }
`;

const steps = ["Order Confirmed", "Order processing", "Shipped", "Delivered"];

const TransactionDetails = ({ setPageTitle }) => {
  const { transactionId } = useParams();
  const [fetchTransactions, { isLoading, state: transactionData }] =
    useRequest();
  const { isDesktop } = useAppContext();
  const navigate = useNavigate();
  const [isProductReturnActive, setIsProductReturnActive] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setPageTitle &&
      setTimeout(() => {
        setPageTitle("Transaction History");
      }, 0);
  }, []);

  useEffect(() => {
    transactionId &&
      fetchTransactions({ path: `/order/${transactionId}/show` });
  }, [transactionId]);

  useEffect(() => {
    if (transactionData?.data && Object.keys(transactionData?.data)?.length) {
      switch (transactionData?.data?.orderStatus) {
        case "pending":
          setActiveStep(0);
          break;
        case "processing":
          setActiveStep(1);
          break;
        case "shipped":
          setActiveStep(2);
          break;
        case "delivered":
          setActiveStep(3);
          break;
        default:
          setActiveStep(0);
      }
    }
  }, [transactionData]);

  return (
    <>
      <TransactionDetailsStyle>
        <div className="transaction__header">
          <div className="bold__title">Purchase Location:</div>
          {transactionData?.data?.customerId?.name && (
            <div className="data customer__name">
              {transactionData?.data?.customerId?.name}
            </div>
          )}
          {transactionData?.data?.shippingAddress && (
            <div className="data">{transactionData?.data?.shippingAddress}</div>
          )}
          {transactionData?.data?.date && (
            <div className="sales__info">
              <span>Sales Date:</span> {getDate(transactionData?.data?.date)}
            </div>
          )}
        </div>
        <div className="transaction__order__summary">
          <div className="transaction__order__summary__header">
            <div className="transaction__order__th">Order Summary</div>
            <div className="transaction__order__th">Price</div>
            <div className="transaction__order__th">Qty</div>
            <div className="transaction__order__th">Subtotal</div>
          </div>
          <div className="transaction__order__summary__body">
            {transactionData?.data?.items?.map((item) => (
              <>
                <div className="transaction__order__td">
                  <div className="transaction__item__details">
                    <div className="transaction__item__image">
                      <img
                        src={
                          process.env.REACT_APP_MEDIA_ASSETS_URL +
                          "/" +
                          item?.productId?.image
                        }
                        alt={item?.productId?.name}
                      />
                    </div>
                    <div className="transaction__item__info">
                      <div className="product__name">
                        {item?.productId?.name}
                      </div>
                      <div className="product__description">
                        {item?.productId?.description}
                      </div>
                      <div className="product__description sku">
                        <span>SKU: </span>
                        {item?.productId?.sku}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="transaction__order__td">
                  {process.env.REACT_APP_PRICE_SYMBOL}
                  {(item?.productId?.price - item?.productId?.discount).toFixed(
                    2
                  )}
                </div>
                <div className="transaction__order__td">{item?.qty}</div>
                <div className="transaction__order__td">
                  {process.env.REACT_APP_PRICE_SYMBOL}
                  {item?.price}
                </div>
              </>
            ))}
          </div>
          <div className="transaction__order__summary__footer">
            Subtotal:{" "}
            <span>
              {process.env.REACT_APP_PRICE_SYMBOL}
              {transactionData?.data?.subtotal}
            </span>
          </div>
          <div className="transaction__payment__info">
            <div className="transaction__payment__method">
              <span>Payment Method: </span>
              {transactionData?.data?.paymentMethod}
              <br />
              <span>Payment Ref Number: </span>
              {transactionData?.data?.paymentRefNumber}
            </div>
            <div className="transaction__order__total">
              <span>Order Total:</span>
              {process.env.REACT_APP_PRICE_SYMBOL}
              {transactionData?.data?.total}
            </div>
          </div>
        </div>
        <div className="transaction__order__status">
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div className="transaction__order__action">
            <button
              className="dark"
              onClick={() => setIsProductReturnActive(true)}
            >
              Return Product
            </button>
            {isDesktop && <div style={{ flex: 1 }} />}
            <button className="dark">Need Help?</button>
            <button
              className="accent"
              onClick={() =>
                navigate(
                  `/product/${transactionData?.data?.items[0]?.productId?.slug}?id=${transactionData?.data?.items[0]?.productId?.id}`
                )
              }
            >
              Rate & Review Product
            </button>
          </div>
        </div>
      </TransactionDetailsStyle>
      {isProductReturnActive && (
        <ReturnProductModal
          orderId={transactionId}
          onMaskClick={() => setIsProductReturnActive(false)}
        />
      )}
    </>
  );
};

export default TransactionDetails;
