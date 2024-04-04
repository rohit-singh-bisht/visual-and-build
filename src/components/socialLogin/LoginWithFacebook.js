import React, { useState, useEffect } from "react";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/useAppContext";
import { useRequest } from "../../hooks/useRequest";

const appId = process.env.REACT_APP_FB_APP_ID || "";

const LoginWithFacebook = ({ formType, setFormType, setIsAuthForm }) => {
  const [handleRequests] = useRequest();
  const { setUser } = useAppContext();
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    if (data && Object.keys(data)?.length && formType) {
      const { name, email, userID: sub } = data;
      setTimeout(() => {
        handleLoginWithFacebook(name, email, sub, formType);
      }, 0);
    }
  }, [data, formType]);

  const handleLoginWithFacebook = async (name, email, sub, formType) => {
    if (formType === "login") {
      const response = await handleRequests({
        path: `/login/facebook`,
        method: "POST",
        body: JSON.stringify({ email, facebookId: sub }),
      });
      setData();
      if (!response?.success) {
        return toast.error(response?.message);
      }
      setUser(response.data);
      const now = new Date();
      const expirationDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      localStorage.setItem("expirationDate", expirationDate.toISOString());
      navigate("/account");
      setIsAuthForm(false);
    } else {
      const response = await handleRequests({
        path: `/register/facebook`,
        method: "POST",
        body: JSON.stringify({ name, email, facebookId: sub }),
      });
      setData();
      if (!response?.success) {
        return toast.error(response?.message);
      }
      setFormType("login");
      return toast.success(response?.message);
    }
  };

  return (
    <LoginSocialFacebook
      appId={appId}
      onResolve={({ provider, data }) => {
        console.log({ provider, data });
        setData(data);
      }}
      onReject={(err) => {
        console.log(err);
      }}
    >
      <FacebookLoginButton
        style={{ fontSize: "14px", height: "38px" }}
        iconSize={"20px"}
      >
        <span>{formType === "login" ? "Log in" : "Sign up"} with Facebook</span>
      </FacebookLoginButton>
    </LoginSocialFacebook>
  );
};

export default LoginWithFacebook;
