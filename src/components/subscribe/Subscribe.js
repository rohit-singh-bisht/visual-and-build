import React from "react";
import styled from "styled-components";
import Button from "../common/Button";

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
`;

const Subscribe = () => {
  return (
    <SubscribeStyle>
      <h2 className="title">Subscribe to get our updates</h2>
      <div className="form__wrapper">
        <form className="form__subscription">
          <div className="form__group">
            <input
              type="email"
              className="input"
              placeholder="Enter your email address ..."
            />
          </div>
          <div className="form__group">
            <Button title={"Subscribe"} />
          </div>
        </form>
      </div>
    </SubscribeStyle>
  );
};

export default Subscribe;
