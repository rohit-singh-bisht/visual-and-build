import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../common/Button";
import { toast } from "react-toastify";
import { useRequest } from "../../../hooks/useRequest";
import Progress from "../../common/Progress";

const SubscribeStyle = styled.div`
  padding: 60px 0;
  background: #000;
  .title {
    color: #fff;
    text-align: center;
    font-size: 27px;
    font-weight: 600;
    line-height: 34.5px;
    margin-bottom: 41.5px;
  }
  .form__subscription {
    display: flex;
    justify-content: center;
    gap: 12px;
    .form__group {
      &:first-child {
        width: 100%;
        max-width: 605px;
      }
      .input {
        border-radius: 7.5px;
        background: #fff;
        height: 52px;
        line-height: 52px;
        padding-left: 30px;
        width: 100%;
      }
    }
  }
  @media (max-width: 768px) {
    padding: 0 20px;
    > .title {
      font-size: 18px !important;
      line-height: 26px;
      margin-bottom: 20px;
    }
    .form__subscription {
      flex-direction: column;
      .form__group {
        .input {
          padding: 0px 18px;
        }
        button {
          width: 100%;
          height: 52px;
        }
      }
    }
  }
`;

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [subscribeEmail, { isLoading }] = useRequest();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Email is required.", { toastId: "error" });
    }
    const path = `/newsletter`;
    const response = await subscribeEmail({
      path,
      method: "POST",
      body: JSON.stringify({ email }),
    });
    if (response.success) {
      toast.success(response?.message, { toastId: "success" });
      setEmail("");
    } else {
      toast.error(response.message, { toastId: "error" });
    }
  };

  return (
    <>
      <SubscribeStyle>
        <h2 className="title">Subscribe to get our updates</h2>
        <div className="form__wrapper">
          <form className="form__subscription" onSubmit={handleSubmit}>
            <div className="form__group">
              <input
                type="email"
                className="input"
                placeholder="Enter your email address ..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form__group">
              <Button title={"Subscribe"} />
            </div>
          </form>
        </div>
      </SubscribeStyle>
      {isLoading && <Progress />}
    </>
  );
};

export default Subscribe;
