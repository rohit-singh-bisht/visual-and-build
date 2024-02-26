import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../common/Button";
import { useRequest } from "../../../hooks/useRequest";
import { toast } from "react-toastify";
import Progress from "../../common/Progress";

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
  @media (max-width: 768px) {
    margin-top: 30px;
    display: flex;
    flex-direction: column-reverse;
    .content {
      position: relative;
      left: auto;
      transform: translateY(0%);
      width: 100%;
      top: 15px;
    }
    .subscription__form .subscription__input {
      width: 100%;
    }
    .subscribtion__title {
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 8px;
    }
    .subscribtion__subtitle {
      font-size: 14px;
      margin-bottom: 12px;
    }
  }
`;

const CheckoutSubscribe = () => {
  const [email, setEmail] = useState();
  const [subscribeEmail, { isLoading }] = useRequest();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const path = `/newsletter`;
    const response = await subscribeEmail({ path });
    if (response.success) {
      toast.success(response?.message);
    }
  };

  return (
    <>
      <CheckoutSubscribeStyled className="container">
        <div className="content">
          <h2 className="subscribtion__title">Get Our Updates</h2>
          <p className="subscribtion__subtitle">
            Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum.
          </p>
          <form className="subscription__form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="subscription__input"
              placeholder="Enter your email address ..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button title={"Subscribe"} />
          </form>
        </div>
        <img src="/images/subscribe.jpg" alt="subscription" />
      </CheckoutSubscribeStyled>
      {isLoading && <Progress />}
    </>
  );
};

export default CheckoutSubscribe;
