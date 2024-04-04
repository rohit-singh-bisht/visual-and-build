import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRequest } from "../../hooks/useRequest";
import { useAppContext } from "../../context/useAppContext";
import { toast } from "react-toastify";
import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const LoginWithGoogle = ({ formType, setFormType, setIsAuthForm }) => {
  const [handleRequests] = useRequest();
  const { setUser } = useAppContext();
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    if (data && Object.keys(data)?.length && formType) {
      const { name, email, picture, sub } = data;
      setTimeout(() => {
        handleLoginWithGoogle(name, email, picture, sub, formType);
      }, 0);
    }
  }, [data, formType]);

  const handleLoginWithGoogle = async (name, email, picture, sub, formType) => {
    if (formType === "login") {
      const response = await handleRequests({
        path: `/login/google`,
        method: "POST",
        body: JSON.stringify({ email, googleId: sub }),
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
        path: `/auth/register/google`,
        method: "POST",
        body: JSON.stringify({ name, email, profile: picture, googleId: sub }),
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
    <LoginSocialGoogle
      client_id={clientId}
      onResolve={({ provider, data }) => {
        console.log({ provider, data });
        setData(data);
      }}
      onReject={(err) => {
        console.log(err);
      }}
    >
      <GoogleLoginButton
        style={{ fontSize: "14px", height: "38px", padding: "0 18px" }}
        iconSize={"20px"}
      >
        <span>{formType === "login" ? "Log in" : "Sign up"} with Google</span>
      </GoogleLoginButton>
    </LoginSocialGoogle>
  );
};

export default LoginWithGoogle;
