import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProfileInformation from "../views/user/profile/ProfileInformation";
import Address from "../views/user/profile/Address";
import Account from "../views/user/Account";
import AccountSidebar from "../components/account/AccoutSidebar";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const UserAccountRoutesStyle = styled.div`
  padding: 60px 0;
  .account__routes__wrapper {
    display: flex;
  }
  .account__routes__page__title {
    color: #000;
    font-size: 27px;
    font-weight: 700;
    line-height: 33.75px;
    margin-bottom: 35px;
  }
`;

const routesInformation = [
  {
    id: 0,
    title: "",
    component: <Account />,
    path: "/",
    pathname: "/account",
  },
  {
    id: 1,
    title: "Profile Information",
    component: <ProfileInformation />,
    path: "/account/profile-information",
    pathname: "/account/profile-information",
  },
  {
    id: 2,
    title: "My Addresses",
    component: <Address />,
    path: "/account/address",
    pathname: "/account/address",
  },
];

const UserAccountRoutes = () => {
  const [activeRouteId, setActiveRouteId] = useState(0);
  const [pageTitle, setPageTitle] = useState("");
  const location = useLocation();

  useEffect(() => {
    const locationPath = location.pathname;
    const filteredRoute = routesInformation?.find(
      (route) => route?.pathname === locationPath
    );
    setPageTitle(filteredRoute?.title);
    setActiveRouteId(filteredRoute?.id);
  }, [location.pathname]);

  return (
    <UserAccountRoutesStyle className="container">
      {pageTitle && (
        <div className="account__routes__page__title">{pageTitle}</div>
      )}
      <div className="account__routes__wrapper">
        {activeRouteId !== 0 && <AccountSidebar />}
        <Routes>
          {routesInformation?.map((route) => (
            <Route path={route?.path} element={route?.component} />
          ))}
          <Route path="*" element={<Navigate to="/account/" />} />
        </Routes>
      </div>
    </UserAccountRoutesStyle>
  );
};

export default UserAccountRoutes;
