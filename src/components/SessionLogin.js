import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../context/useAppContext";
const baseUrl = process.env.REACT_APP_SERVER_URL;

const SessionLogin = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const authToken = params.get("auth");
  const navigate = useNavigate();
  const { setUser } = useAppContext();

  const fetchAccount = async (authToken) => {
    try {
      const res = await axios({
        method: "GET",
        url: baseUrl + "/account",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
      });
      if (!res?.data?.success) {
        return navigate("/");
      }
      setUser({
        user: res?.data?.data,
        token: authToken,
      });
      const now = new Date();
      const expirationDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      localStorage.setItem("expirationDate", expirationDate.toISOString());
      navigate("/account");
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  };

  useEffect(() => {
    if (!authToken) {
      return navigate("/");
    }
    fetchAccount(authToken);
  }, [authToken]);

  return (
    <div
      style={{
        width: "100vw",
        height: "calc(100vh - 74px - 623px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Authorization in progress...
    </div>
  );
};

export default SessionLogin;
