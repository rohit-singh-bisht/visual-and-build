import React, { useState } from "react";
import { useRequest } from "../../../hooks/useRequest";
import styled from "styled-components";
import { loginUserObj } from "../../../utils/constants";
import { toast } from "react-toastify";
import Progress from "../../common/Progress";
import { useAppContext } from "../../../context/useAppContext";
import { useNavigate } from "react-router-dom";

const PasswordStyle = styled.div`
  color: #ff0000;
  font-size: 12px;
  margin-top: 6px;
`;

const Login = ({ setIsAuthForm }) => {
  const [loginType, setLoginType] = useState("email");
  const [login, { isLoading }] = useRequest();
  const [error, setError] = useState({
    username: false,
    password: false,
  });
  const [userInfo, setUserInfo] = useState(loginUserObj);
  const { setUser } = useAppContext();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!userInfo.username || !userInfo.password) {
      if (!userInfo.username) {
        setError((prev) => ({ ...prev, username: true }));
      }
      if (!userInfo.password) {
        setError((prev) => ({ ...prev, password: true }));
      }
      return;
    }
    const path = `/auth/login`;
    const response = await login({
      path,
      method: "POST",
      body: JSON.stringify(userInfo),
    });
    if (!response.success) {
      return toast.error(response.message);
    }
    toast.success(response.message);
    setUser(response.data);
    navigate("/account");
    setIsAuthForm(false);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError((prev) => ({
      ...prev,
      [name]: false,
    }));
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
            name="username"
            value={userInfo?.username}
            pattern={
              loginType !== "email"
                ? "/d*"
                : "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"
            }
            className={`auth__form__input ${error?.username && "error"}`}
            onChange={handleChange}
          />
          {error?.username && <PasswordStyle>Email is required.</PasswordStyle>}
        </div>
        <div className="auth__form__group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={userInfo?.password}
            className={`auth__form__input ${error?.password && "error"}`}
            onChange={handleChange}
          />
          {error?.password && (
            <PasswordStyle>Password is required.</PasswordStyle>
          )}
        </div>
        <div className="auth__form__button">
          <button type="submit">Sign In</button>
        </div>
      </form>
      {isLoading && <Progress />}
    </>
  );
};

export default Login;
