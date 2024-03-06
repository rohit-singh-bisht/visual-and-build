import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = (props) => {
  const auth = useAuth();

  return auth ? <Outlet {...props} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
