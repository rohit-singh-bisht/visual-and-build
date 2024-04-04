import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Login from "./Login";
import Register from "./Register";
import { Link } from "react-router-dom";
import LoginWithGoogle from "../../socialLogin/LoginWithGoogle";
import LoginWithFacebook from "../../socialLogin/LoginWithFacebook";
import LoginWithApple from "../../socialLogin/LoginWithApple";

const AuthenticationFormStyle = styled.div`
  padding: 28px 42px 52px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 10px 24px 0px rgba(33, 52, 48, 0.08);
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  height: 90vh;
  overflow: auto;
  position: relative;
  z-index: 9;
  .flex__wrapper {
    flex: 1;
  }
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
      font-size: 14px;
      font-weight: 500;
      padding: 12px;
      flex: 1;
      text-align: center;
      cursor: pointer;
      &.active {
        background: #f0f0f0;
      }
    }
  }
  .auth__form__body {
    .auth__form__group {
      margin-bottom: 24px;
      label {
        color: #464646;
        font-size: 14px;
        font-weight: 500;
        display: block;
        margin-bottom: 11px;
      }
      input {
        border-radius: 4.6px;
        border: 0.9px solid #d9d9d9;
        background: #fff;
        width: 100%;
        height: 48px;
        padding: 18px;
        &.error {
          border: 1px solid #ff0000;
        }
      }
    }
    .auth__form__button {
      button {
        background: none;
        color: #fff;
        font-size: 14px;
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
    max-width: 315px;
    margin: 110px auto 0;
    a {
      color: #111;
      text-decoration-line: underline;
    }
  }
  .other__login__options {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    text-align: center;
    margin-top: 40px;
    .other__account {
      margin-top: 28px;
      span {
        color: #00579f;
        text-decoration: underline;
        margin-left: 4px;
        cursor: pointer;
      }
    }
    .continue__with {
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      text-align: center;
      position: relative;
      margin-bottom: 28px;
      span {
        background-color: #fff;
        display: inline-block;
        padding: 0 8px;
        position: relative;
        z-index: 4;
      }
      &::before {
        content: "";
        width: 100%;
        height: 1px;
        background-color: #d7d2d2;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .with__google,
    .with__facebook,
    .with__apple {
      display: flex;
      justify-content: center;
      margin: 8px 0;
    }
  }
`;

const WrapStyle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const AuthenticationForm = ({ setIsAuthForm }) => {
  const [formType, setFormType] = useState("login");

  useEffect(() => {
    document.body.classList.add("bodyfixed");
    return () => document.body.classList.remove("bodyfixed");
  }, []);

  return (
    <>
      <WrapStyle onClick={() => setIsAuthForm(false)} />
      <AuthenticationFormStyle>
        <div className="flex__wrapper">
          {formType === "login" ? (
            <Login setIsAuthForm={setIsAuthForm} />
          ) : (
            <Register />
          )}
        </div>
        <div className="other__login__options">
          <div className="continue__with">
            <span>Or continue with</span>
          </div>
          <div className="with__google">
            <LoginWithGoogle
              formType={formType}
              setFormType={setFormType}
              setIsAuthForm={setIsAuthForm}
            />
          </div>
          <div className="with__facebook">
            <LoginWithFacebook
              formType={formType}
              setFormType={setFormType}
              setIsAuthForm={setIsAuthForm}
            />
          </div>
          {/* <div className="with__apple">
            <LoginWithApple formType={formType} setFormType={setFormType} />
          </div> */}
          {formType === "login" ? (
            <div
              className="other__account"
              onClick={() => setFormType("signup")}
            >
              Don’t have any account?
              <span>Signup</span>
            </div>
          ) : (
            <div
              className="other__account"
              onClick={() => setFormType("login")}
            >
              Already have any account?
              <span>Signin</span>
            </div>
          )}
        </div>

        <p className="auth__form__consent">
          By continuing, you are agreeing to the{" "}
          <Link to="#">Terms and Conditions</Link> and{" "}
          <Link to="#">Privacy Policy.</Link>
        </p>
      </AuthenticationFormStyle>
    </>
  );
};

export default AuthenticationForm;
