import React, { useState } from "react";
import { useRequest } from "../../../hooks/useRequest";
import { toast } from "react-toastify";
import {
  registerUserObj,
  verifyPasswordStrength,
} from "../../../utils/constants";
import styled from "styled-components";
import Progress from "../../common/Progress";

const PasswordStyle = styled.div`
  color: #ff0000;
  font-size: 12px;
  margin-top: 6px;
`;

const Register = () => {
  const [register, { isLoading }] = useRequest();
  const [userInfo, setUserInfo] = useState(registerUserObj);
  const [weakPassword, setWeakPassword] = useState({});
  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      isLoading ||
      !weakPassword?.success ||
      !userInfo?.name ||
      !userInfo?.email ||
      !userInfo?.password
    ) {
      if (!userInfo?.name) {
        setError((prev) => ({ ...prev, name: true }));
      }
      if (!userInfo?.email) {
        setError((prev) => ({ ...prev, email: true }));
      }
      if (!userInfo?.password) {
        setError((prev) => ({ ...prev, password: true }));
      }
      return;
    }
    const path = `/auth/register`;
    const response = await register({
      path,
      method: "POST",
      body: JSON.stringify(userInfo),
    });
    if (!response.success) {
      return toast.error(response.message, { toastId: "register" });
    }
    return toast.success(response.message);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError((prev) => ({
      ...prev,
      [name]: false,
    }));

    if (name === "password") {
      const result = verifyPasswordStrength(value);
      setWeakPassword(result);
    }
  };

  return (
    <>
      <div className="auth__form__title">Register</div>
      <div className="auth__form__subtitle">
        Enter your details to get started
      </div>
      <form onSubmit={handleRegister} className="auth__form__body">
        <div className="auth__form__group">
          <label>Full Name</label>
          <input
            type={"text"}
            value={userInfo?.name}
            onChange={handleChange}
            className={`auth__form__input ${error?.name && "error"}`}
            name="name"
          />
          {error?.name && <PasswordStyle>Full name is required.</PasswordStyle>}
        </div>
        <div className="auth__form__group">
          <label>Email</label>
          <input
            type={"email"}
            value={userInfo?.email}
            onChange={handleChange}
            className={`auth__form__input ${error?.email && "error"}`}
            name="email"
          />
          {error?.email && <PasswordStyle>Email is required.</PasswordStyle>}
        </div>
        <div className="auth__form__group">
          <label>Password</label>
          <input
            type="password"
            value={userInfo?.password}
            onChange={handleChange}
            className={`auth__form__input ${
              (error?.password || !weakPassword?.success) && "error"
            }`}
            name="password"
          />
          {error?.password ? (
            <PasswordStyle>Password is required.</PasswordStyle>
          ) : (
            !weakPassword?.success && (
              <PasswordStyle>{weakPassword?.message}</PasswordStyle>
            )
          )}
        </div>
        <div className="auth__form__button">
          <button type="submit">Get started</button>
        </div>
      </form>
      {isLoading && <Progress />}
    </>
  );
};

export default Register;
