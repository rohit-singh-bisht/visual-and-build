import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Steps from "../../components/common/Steps";
import Information from "../../components/checkout/tabs/Information";
import Payment from "../../components/checkout/tabs/Payment";
import { useAppContext } from "../../context/useAppContext";
import { useNavigate } from "react-router-dom";
import { useRequest } from "../../hooks/useRequest";
import IconWithTextList from "../../components/common/IconWithTextList";

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
  .icon_with_text {
    margin-top: 140px;
    padding: 60px 0 0;
    border-top: 1px solid rgba(48, 48, 48, 0.25);
    width: 100vw;
  }
  @media (max-width: 768px) {
    padding: 40px 0;
    .page__title {
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 15px;
    }
  }
`;

const tabsList = [
  {
    id: 1,
    title: "Specification",
    component: ({
      handleChangeBilling,
      handleOrderNow,
      orderSummaryData,
      checkoutAddress,
      setBillingType,
      billingType,
    }) => (
      <Information
        handleChangeBilling={handleChangeBilling}
        handleOrderNow={handleOrderNow}
        orderSummaryData={orderSummaryData}
        checkoutAddress={checkoutAddress}
        setBillingType={setBillingType}
        billingType={billingType}
      />
    ),
  },
  {
    id: 2,
    title: "Description",
    component: ({ createOrderData, orderSummaryData }) => (
      <Payment
        createOrderData={createOrderData}
        orderSummaryData={orderSummaryData}
      />
    ),
  },
];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(1);
  const { checkoutCartData, appliedCoupon } = useAppContext();
  const navigate = useNavigate();
  const [orderSummaryData, setOrderSummaryData] = useState([]);
  const [fetchOrderSummary] = useRequest("/order/checkout/summary");
  const checkoutCartId = checkoutCartData?._id;
  const [checkoutAddress, setCheckoutAddress] = useState({
    billing: "",
    shipping: "",
  });
  const [createOrderData, setCreateOrderData] = useState();
  const [billingType, setBillingType] = useState("deliver");

  useEffect(() => {
    if (!checkoutCartId) return navigate("/cart");
    async function getOrderSummary(cartId, coupon) {
      const path = `/order/checkout/summary`;
      const response = await fetchOrderSummary({
        path: path,
        method: "POST",
        body: JSON.stringify({
          cartId,
          coupon,
        }),
      });
      if (response.success) {
        setOrderSummaryData(response?.data);
      }
    }
    getOrderSummary(checkoutCartId, appliedCoupon);
  }, [checkoutCartId, appliedCoupon]);

  const handleChangeBilling = useCallback((e, address, addressType, method) => {
    setCheckoutAddress((prev) => ({ ...prev, [method]: address }));
  }, []);

  const handleOrderNow = () => {
    setActiveStep(activeStep + 1);
  };

  const handleStepClick = (step) => {
    if (step?.id > activeStep) {
      return;
    }
    setActiveStep(step?.id);
  };

  useEffect(() => {
    if (!checkoutCartId) return;
    const products = checkoutCartData.items.map((item) => ({
      productId: item.product._id,
      variation: "",
      qty: item.quantity,
      price: item.product.price,
    }));

    // New object in desired format
    const newObject = {
      products,
      subtotal: orderSummaryData?.totalAmount,
      coupon: appliedCoupon,
      deliveryType: billingType,
      paymentRefNumber: "",
      billingAddress: checkoutAddress?.billing,
      shippingAddress: checkoutAddress?.shipping,
    };

    setCreateOrderData(newObject);
  }, [checkoutAddress, orderSummaryData, checkoutCartData]);

  return (
    <>
      <CheckoutStyle>
        <div className="container">
          <div className="page__title">Checkout</div>
          <div className="checkout__steps">
            <Steps activeIndex={activeStep} handleStepClick={handleStepClick} />
          </div>
          {tabsList
            ?.find((item) => item?.id === activeStep)
            ?.component({
              handleChangeBilling,
              handleOrderNow,
              orderSummaryData,
              checkoutAddress,
              createOrderData,
              billingType,
              setBillingType,
            })}
        </div>
      </CheckoutStyle>
      {activeStep === 2 && <IconWithTextList />}
    </>
  );
};

export default Checkout;
