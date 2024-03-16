import React, { useEffect } from "react";
import styled from "styled-components";
import Button from "../../components/common/Button";
import { useLocation, useNavigate } from "react-router-dom";

const ThankyouStyle = styled.div`
  padding: 100px 0;
  .wrapper {
    border: 1px solid rgb(224, 228, 232);
    background: rgb(255, 255, 255);
    margin: 0px auto;
    max-width: 760px;
    width: 100%;
    padding-top: 80px;
    padding-bottom: 80px;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    border-radius: 8px;
  }
  .thank_you {
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    color: rgb(11, 29, 23);
    height: 24px;
  }
  .subtext {
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    color: rgb(117, 126, 137);
    margin-bottom: 10px;
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
    <ThankyouStyle>
      <div className="wrapper">
        <div className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="95"
            height="94"
            viewBox="0 0 95 94"
            fill="none"
          >
            <circle cx="47.4982" cy="46.631" r="46.631" fill="#F5F7F8"></circle>
            <path
              d="M46.6623 24.4258C34.4272 24.4258 24.457 34.3959 24.457 46.631C24.457 58.8661 34.4272 68.8362 46.6623 68.8362C58.8973 68.8362 68.8675 58.8661 68.8675 46.631C68.8675 34.3959 58.8973 24.4258 46.6623 24.4258ZM57.2764 41.5238L44.686 54.1142C44.3751 54.425 43.9532 54.6027 43.5091 54.6027C43.065 54.6027 42.6431 54.425 42.3322 54.1142L36.0482 47.8301C35.4042 47.1861 35.4042 46.1203 36.0482 45.4763C36.6921 44.8324 37.758 44.8324 38.4019 45.4763L43.5091 50.5835L54.9226 39.1701C55.5666 38.5261 56.6324 38.5261 57.2764 39.1701C57.9203 39.814 57.9203 40.8577 57.2764 41.5238Z"
              fill="#000A2C"
            ></path>
          </svg>
        </div>
        <h2 class="thank_you">Thank you!</h2>
        <p class="subtext">Your order has been placed!</p>
        <Button
          title={"View Orders"}
          onClick={() => navigate("/account/purchase-history")}
        />
      </div>
    </ThankyouStyle>
  );
};

export default Thankyou;
