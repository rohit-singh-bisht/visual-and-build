import React from "react";
import { LoginSocialApple } from "reactjs-social-login";
import { AppleLoginButton } from "react-social-login-buttons";

const client_id = process.env.REACT_APP_APPLE_ID || "";

const LoginWithApple = ({ formType, setFormType }) => {
  return (
    <LoginSocialApple
      client_id={client_id || ""}
      onResolve={({ provider, data }) => {
        console.log({ provider, data });
      }}
      onReject={(err) => {
        console.log(err);
      }}
    >
      <AppleLoginButton
        style={{ fontSize: "14px", height: "38px", padding: "0 22px" }}
        iconSize={"20px"}
      >
        <span>{formType === "login" ? "Log in" : "Sign up"} with Apple</span>
      </AppleLoginButton>
    </LoginSocialApple>
  );
};

export default LoginWithApple;
