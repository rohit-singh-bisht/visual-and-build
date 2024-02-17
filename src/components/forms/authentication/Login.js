import React, { useState } from "react";
import { useRequest } from "../../../hooks/useRequest";

const Login = () => {
  const [loginType, setLoginType] = useState("email");
  const [login, { state, error }] = useRequest();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const path = `/auth/login`;
    const response = await login({
      path,
      method: "POST",
      body: JSON.stringify(),
    });
    if (!response.success) {
      throw new Error("Error");
    }
  };

  return (
    <>
      <div className="auth__form__title">Login</div>
      <div className="auth__form__subtitle">
        Enter your details to get started
      </div>
      <div className="auth__form__panels__wrapper">
        <div
          className={`auth__form__panel ${loginType === "email" && "active"}`}
          onClick={() => setLoginType("email")}
        >
          Email Address
        </div>
        <div
          className={`auth__form__panel ${loginType === "phone" && "active"}`}
          onClick={() => setLoginType("phone")}
        >
          Phone Number
        </div>
      </div>
      <form onSubmit={handleSignIn} className="auth__form__body">
        <div className="auth__form__group">
          <label>
            {loginType === "email" ? "Email Address" : "Phone Number"}
          </label>
          <input
            type={loginType === "email" ? "email" : "number"}
            pattern="/d*"
            className="auth__form__input"
          />
        </div>
        <div className="auth__form__group">
          <label>Password</label>
          <input type="password" className="auth__form__input" />
        </div>
        <div className="auth__form__button">
          <button type="submit">Sign In</button>
        </div>
      </form>
    </>
  );
};

export default Login;
