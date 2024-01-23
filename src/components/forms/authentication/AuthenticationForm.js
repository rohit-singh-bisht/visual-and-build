import React from "react";
import styled from "styled-components";

const AuthenticationFormStyle = styled.div`
  padding: 28px 42px 52px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 10px 24px 0px rgba(33, 52, 48, 0.08);
  display: flex;
  flex-direction: column;
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
    margin-bottom: 42px;
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
  .auth__form__body {
    .auth__form__group {
      margin-bottom: 46px;
      label {
        color: #464646;
        font-size: 16px;
        font-weight: 500;
        display: block;
        margin-bottom: 11px;
      }
      input {
        border-radius: 4.6px;
        border: 0.9px solid #d9d9d9;
        background: #fff;
        width: 100%;
        height: 58px;
        padding: 18px;
      }
    }
    .auth__form__button {
      button {
        background: none;
        color: #fff;
        font-size: 16px;
        font-weight: 600;
        border-radius: 4.6px;
        border: 0.9px solid #d9d9d9;
        background: #ae0000;
        height: 58px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
      }
    }
  }
  .auth__form__consent {
    color: #808082;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    max-height: 1120px;
    height: 100%;
    a {
      color: #111;
      text-decoration-line: underline;
    }
  }
`;

const AuthenticationForm = ({ formType = "login" }) => {
  return (
    <AuthenticationFormStyle>
      <div>
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
        <form className="auth__form__body">
          <div className="auth__form__group">
            <label>Email Address</label>
            <input type="email" className="auth__form__input" />
          </div>
          <div className="auth__form__group">
            <label>Password</label>
            <input type="password" className="auth__form__input" />
          </div>
          <div className="auth__form__button">
            <button type="submit">Sign In</button>
          </div>
        </form>
      </div>
      <p className="auth__form__consent">
        By continuing, you are agreeing to the{" "}
        <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy.</a>
      </p>
    </AuthenticationFormStyle>
  );
};

export default AuthenticationForm;
