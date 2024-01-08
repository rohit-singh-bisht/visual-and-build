import React, { useState } from "react";
import styled from "styled-components";
import { styled as muistyled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";

const commonStyles = `
    color: #303030;
    font-size: 10px;
    font-weight: 700;
    line-height: 15px;
`;

const RegisterStyle = styled.div`
  padding: 80px 0;
  .page__title {
    color: #303030;
    text-align: center;
    font-size: 36px;
    font-weight: 700;
    line-height: 44px;
    margin-bottom: 50px;
  }
  .container {
    max-width: 380px;
    border-radius: 16px;
    border: 0.75px solid #d9d9d9;
    background: #f9f9f9;
    padding: 30px 23px;
    * {
      font-family: "Montserrat", sans-serif;
    }
    .form__group {
      margin-bottom: 16px;
      label,
      input {
        color: #303030;
        font-size: 12.8px;
        font-weight: 400;
        line-height: 20px;
      }
      label {
        font-weight: 700;
        margin-bottom: 7px;
        display: block;
      }
      input {
        border-radius: 6px;
        background: #fff;
        padding-left: 20px;
        display: flex;
        align-items: center;
        display: block;
        height: 52px;
        width: 100%;
      }
    }
    .password__strength {
      ${commonStyles}
      margin-top: 5px;
      span {
        font-weight: 400;
      }
    }
    .notification__toggle {
      margin-bottom: 10px;
      display: flex;
      gap: 10px;
      .switch__icon {
        .MuiSwitch-root {
          margin: 0;
        }
      }
      .notification__content {
        ${commonStyles}
        cursor: pointer;
        user-select: none;
        .subtitle {
          font-weight: 400;
          margin-top: 2px;
        }
      }
    }
    .register__button {
      margin-top: 24px;
      button {
        color: #fff;
        font-size: 12px;
        font-weight: 700;
        line-height: 20px;
        border-radius: 6px;
        background: #ae0000;
        width: 100%;
        height: 50px;
      }
    }
    .have__an__account {
      ${commonStyles}
      font-weight: 400;
      text-align: center;
      padding: 30px 0 0;
      .span {
        color: #303030;
        font-weight: 700;
      }
    }
  }
`;

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    username: "",
    isNewsletterEnabled: false,
    isNotificationEnabled: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <RegisterStyle>
      <div className="page__title">Register</div>
      <div className="container">
        <form className="form">
          <div className="form__group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={userDetails?.email}
              onChange={handleChange}
            />
          </div>
          <div className="form__group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userDetails?.password}
              onChange={handleChange}
            />
            <div className="password__strength">
              Password Strength: <span>Perfect!</span>
            </div>
          </div>
          <div className="form__group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={userDetails?.username}
              onChange={handleChange}
            />
          </div>
          <div className="notification__toggle">
            <div className="switch__icon">
              <IOSSwitch
                sx={{ m: 1 }}
                checked={userDetails?.isNewsletterEnabled}
              />
            </div>
            <div
              className="notification__content"
              onClick={() =>
                setUserDetails((prev) => ({
                  ...prev,
                  isNewsletterEnabled: !prev.isNewsletterEnabled,
                }))
              }
            >
              <h3 className="title">Subscribe to Newsletter</h3>
              <p className="subtitle">Get monthly new updates via email.</p>
            </div>
          </div>
          <div className="notification__toggle">
            <div className="switch__icon">
              <IOSSwitch
                sx={{ m: 1 }}
                checked={userDetails?.isNotificationEnabled}
              />
            </div>
            <div
              className="notification__content"
              onClick={() =>
                setUserDetails((prev) => ({
                  ...prev,
                  isNotificationEnabled: !prev.isNotificationEnabled,
                }))
              }
            >
              <h3 className="title">Receive Notification</h3>
              <p className="subtitle">
                Get daily notification for promo & new products.
              </p>
            </div>
          </div>
          <div className="register__button">
            <button>Create Account</button>
          </div>
        </form>
        <div className="have__an__account">
          Already have an account?{" "}
          <Link className="span" to={"/signin"}>
            Sign In
          </Link>
        </div>
        <div className="login__with"></div>
      </div>
    </RegisterStyle>
  );
};

const IOSSwitch = muistyled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" {...props} />
))(({ theme }) => ({
  width: 42,
  height: 22,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    transitionDuration: "300ms",
    top: "50%",
    transform: "translate(4px, -50%)",
    "&.Mui-checked": {
      transform: "translate(22px, -50%)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#AE0000" : "#AE0000",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 16,
    height: 16,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export default Register;
