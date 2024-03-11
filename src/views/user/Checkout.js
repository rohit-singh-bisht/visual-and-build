import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Steps from "../../components/common/Steps";
import Information from "../../components/checkout/tabs/Information";
import Payment from "../../components/checkout/tabs/Payment";

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
    component: (handleChangeBilling, handleOrderNow) => (
      <Information
        handleChangeBilling={handleChangeBilling}
        handleOrderNow={handleOrderNow}
      />
    ),
  },
  {
    id: 2,
    title: "Description",
    component: () => <Payment />,
  },
];

const Checkout = () => {
  // eslint-disable-next-line
  const [billingType, setBillingType] = useState();
  const [activeStep, setActiveStep] = useState(1);

  const handleChangeBilling = useCallback((e) => {
    setBillingType(e.target.value);
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

  return (
    <CheckoutStyle>
      <div className="container">
        <div className="page__title">Checkout</div>
        <div className="checkout__steps">
          <Steps activeIndex={activeStep} handleStepClick={handleStepClick} />
        </div>
        {tabsList
          ?.find((item) => item?.id === activeStep)
          ?.component(handleChangeBilling, handleOrderNow)}
      </div>
    </CheckoutStyle>
  );
};

export default Checkout;
