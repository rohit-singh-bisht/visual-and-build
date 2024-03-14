import React, { useEffect } from "react";
import styled from "styled-components";
import BillingDetails from "../BillingDetails";
import CheckoutOrderSummary from "../CheckoutOrderSummary";
import CheckoutSubscribe from "../../forms/subscribe/CheckoutSubscribe";
import { useRequest } from "../../../hooks/useRequest";
import { Skeleton } from "@mui/material";

const InformationStyle = styled.div`
  .checkout__wrapper {
    display: flex;
    gap: 36px;
    margin-top: 60px;
    .checkout__billing__wrapper {
      flex: 1;
      .checkout__billing__title,
      .checkout__shipping__title {
        color: #303030;
        font-size: 27px;
        font-weight: 600;
        line-height: 34.5px;
        margin-bottom: 32.5px;
      }
      .checkout__billing__title {
        margin-top: 30px;
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
  @media (max-width: 768px) {
    .checkout__wrapper {
      flex-wrap: wrap;
      margin-top: 40px;
      .checkout__billing__wrapper {
        .checkout__billing__title {
          font-size: 16px;
          line-height: 24px;
          margin-bottom: 15px;
        }
      }
    }
  }
`;

const Information = ({
  handleChangeBilling,
  handleOrderNow,
  orderSummaryData,
  checkoutAddress,
}) => {
  const [
    fetchAddresses,
    { isLoading: isFetchingAddresses, state: addressData },
  ] = useRequest(`/address?page=1&limit=10`);

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <>
      <InformationStyle>
        <div className="checkout__wrapper">
          <div className="checkout__billing__wrapper">
            <h2 className="checkout__shipping__title">Shipping Details</h2>
            {isFetchingAddresses && !addressData?.data?.docs && (
              <Skeleton
                variant="rectangular"
                width={"100%"}
                height={110}
                style={{ borderRadius: "10px" }}
              />
            )}
            {addressData?.data?.docs?.map((address) => (
              <div
                className="checkout__billing__details"
                key={"shipping" + address?.id}
              >
                <BillingDetails
                  billingTitle={"Choose Delivery"}
                  billerName={address?.label}
                  billingAddress={address?.format}
                  billingPhone={address?.phoneNumber}
                  billingType={"delivery"}
                  billingMethod={"shipping"}
                  onClick={handleChangeBilling}
                  index={address?.id}
                  isChecked={checkoutAddress?.shipping === address?.format}
                />
              </div>
            ))}
            {/* <div className="checkout__add__new__address__wrapper">
              <div className="checkout__add__new__address">Add New Address</div>
            </div> */}

            <h2 className="checkout__billing__title">Billing Details</h2>
            {isFetchingAddresses && !addressData?.data?.docs && (
              <Skeleton
                variant="rectangular"
                width={"100%"}
                height={110}
                style={{ borderRadius: "10px" }}
              />
            )}
            {addressData?.data?.docs?.map((address) => (
              <div
                className="checkout__billing__details"
                key={"billing" + address?.id}
              >
                <BillingDetails
                  billingTitle={"Choose Delivery"}
                  billingMethod={"billing"}
                  billerName={address?.label}
                  billingAddress={address?.format}
                  billingPhone={address?.phoneNumber}
                  billingType={"delivery"}
                  onClick={handleChangeBilling}
                  index={address?.id}
                  isChecked={checkoutAddress?.billing === address?.format}
                />
              </div>
            ))}

            <div className="checkout__order__notes">
              <h3 className="checkout__order__notes__title">Order Notes</h3>
              <textarea
                className="checkout__order__notes__textarea"
                placeholder="Enter your order notes ..."
              ></textarea>
            </div>
          </div>
          <div className="checkout__order__summary__wrapper">
            <CheckoutOrderSummary
              orderSummaryData={orderSummaryData}
              handleOrderNow={handleOrderNow}
              isCheckoutDisabled={
                !checkoutAddress?.shipping || !checkoutAddress?.billing
              }
            />
          </div>
        </div>
      </InformationStyle>
      <CheckoutSubscribe />
    </>
  );
};

export default Information;
