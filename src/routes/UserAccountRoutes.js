import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ProfileInformation from "../views/user/profile/ProfileInformation";
import Address from "../views/user/profile/Address";
import Account from "../views/user/Account";
import AccountSidebar from "../components/account/AccoutSidebar";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Lists from "../views/user/profile/Lists";

const UserAccountRoutesStyle = styled.div`
  padding: 60px 0;
  .account__routes__wrapper {
    display: flex;
    gap: 30px;
  }
  .account__routes__page__title {
    color: #000;
    font-size: 27px;
    font-weight: 700;
    line-height: 33.75px;
    margin-bottom: 35px;
  }
  @media (max-width: 786px) {
    padding: 45px 0;
  }
`;

const routesInformation = [
  {
    id: 0,
    title: "Account",
    component: <Account />,
    path: "/",
    pathname: "/account",
  },
  {
    id: 1,
    title: "Profile Information",
    component: <ProfileInformation />,
    path: "/profile-information/",
    pathname: "/account/profile-information",
  },
  {
    id: 2,
    title: "My Addresses",
    component: <Address />,
    path: "/address",
    pathname: "/account/address",
  },
  {
    id: 3,
    title: "My List",
    component: <Lists />,
    path: "/lists",
    pathname: "/account/lists",
  },
];

const UserAccountRoutes = () => {
  const [activeRouteId, setActiveRouteId] = useState(0);
  const [pageTitle, setPageTitle] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const locationPath = location.pathname;
    const hasTrailingSlash = locationPath.endsWith("/");

    // Redirect if there's a trailing slash
    if (hasTrailingSlash && locationPath !== "/") {
      navigate(locationPath.slice(0, -1), { replace: true });
    }

    const filteredRoute = routesInformation?.find(
      (route) => route?.pathname === locationPath
    );

    setPageTitle(filteredRoute?.title);
    setActiveRouteId(filteredRoute?.id);
  }, [location.pathname, navigate]);

  return (
    <UserAccountRoutesStyle className="container">
      {pageTitle && activeRouteId !== 0 && (
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
