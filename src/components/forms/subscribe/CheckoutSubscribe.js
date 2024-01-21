import React from "react";
import styled from "styled-components";
import Button from "../../common/Button";

const CheckoutSubscribeStyled = styled.div`
  position: relative;
  margin-top: 200px;
  .content {
    width: 420px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 75px;
  }
  .subscribtion__title {
    color: #303030;
    font-size: 27px;
    font-weight: 600;
    line-height: 34.5px;
    margin-bottom: 11.5px;
  }
  .subscribtion__subtitle {
    color: #000;
    font-size: 15px;
    font-weight: 400;
    line-height: 22.5px;
    margin-bottom: 24px;
  }
  .subscription__form {
    display: display;
    .subscription__input {
      border-radius: 7.5px;
      border: 0.75px solid rgba(48, 48, 48, 0.5);
      background: rgba(255, 255, 255, 0.5);
      width: 370px;
      padding: 18px;
      height: 54px;
      margin-bottom: 12px;
      display: block;
      font-family: Poppins;
    }
  }
`;

const CheckoutSubscribe = () => {
  return (
    <CheckoutSubscribeStyled className="container">
      <div className="content">
        <h2 className="subscribtion__title">Get Our Updates</h2>
        <p className="subscribtion__subtitle">
          Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum.
        </p>
        <form className="subscription__form">
          <input
            type="email"
            className="subscription__input"
            placeholder="Enter your email address ..."
          />
          <Button title={"Subscribe"} />
        </form>
      </div>
      <img src="/images/subscribe.jpg" alt="subscription" />
    </CheckoutSubscribeStyled>
  );
};

export default CheckoutSubscribe;
