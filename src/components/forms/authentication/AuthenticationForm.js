import React from "react";
import styled from "styled-components";

const AuthenticationFormStyle = styled.div`
  padding: 28px 42px 52px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 10px 24px 0px rgba(33, 52, 48, 0.08);
  .auth__form__title {
    color: #000;
    text-align: center;
    font-size: 23px;
    font-weight: 600;
    margin-bottom: 14px;
  }
  .auth__form__subtitle {
    color: #000;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 36px;
  }
  .auth__form__panels__wrapper {
    display: flex;
    border-radius: 4.609px;
    border: 1px solid #d9d9d9;
    background: #fff;
    .auth__form__panel {
      color: #000;
      font-size: 16.5px;
      font-weight: 500;
      padding: 18.5px;
      flex: 1;
      text-align: center;
      &.active {
        background: #f0f0f0;
      }
    }
  }
`;

const AuthenticationForm = ({ formType = "login" }) => {
  return (
    <AuthenticationFormStyle>
      <div className="auth__form__title">
        {formType === "login" ? "Login" : "Signup"}
      </div>
      <div className="auth__form__subtitle">
        Enter your details to get started
      </div>
      <div className="auth__form__panels__wrapper">
        <div className="auth__form__panel active">Email Address</div>
        <div className="auth__form__panel">Phone Number</div>
      </div>
      <form></form>
    </AuthenticationFormStyle>
  );
};

export default AuthenticationForm;
