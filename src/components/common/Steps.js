import React from "react";
import styled from "styled-components";

const StepsStyled = styled.div`
  display: flex;
  gap: 35px;
  justify-content: center;
  .step__holder {
    display: flex;
    align-items: center;
    gap: 12px;
    .count {
      width: 38px;
      height: 38px;
      color: #fff;
      font-size: 12px;
      font-weight: 700;
      line-height: 18px;
      font-family: Poppins;
      background: #ae0000;
      border-radius: 50%;
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }
  }
  .step {
    color: rgba(48, 48, 48, 0.25);
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22.5px;
    &.active {
      color: rgba(48, 48, 48, 1);
      position: relative;
      &::before {
        content: "";
        height: 3px;
        background: #ae0000;
        bottom: -5.5px;
        width: 100%;
        display: block;
        position: absolute;
      }
    }
  }
`;

const stepsData = [
  {
    id: 1,
    title: "Information",
  },
  {
    id: 2,
    title: "Payment",
  },
];

const Steps = ({ activeIndex }) => {
  return (
    <StepsStyled>
      {stepsData?.map((step, index) => (
        <div className="step__holder">
          {activeIndex === index + 1 && (
            <span className="count">{("0" + (index + 1)).slice(-2)}</span>
          )}
          <h3 className={`step ${activeIndex === index + 1 ? "active" : ""}`}>
            {step?.title}
          </h3>
        </div>
      ))}
    </StepsStyled>
  );
};

export default Steps;