import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";
import ProfileInformation from "../views/user/profile/ProfileInformation";
import Address from "../views/user/profile/Address";
import Account from "../views/user/Account";
import AccountSidebar from "../components/account/AccoutSidebar";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Lists from "../views/user/profile/Lists";
import PrivateRoute from "./PrivateRoute";
import PurchaseHistory from "../views/user/profile/PurchaseHistory";
import TransactionDetails from "../views/user/profile/TransactionDetails";
import HelpAndSupport from "../views/user/profile/HelpAndSupport";
import SupportTickets from "../views/user/profile/SupportTickets";

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
  @media (max-width: 768px) {
    padding: 45px 0;
  }
`;

const routesInformation = [
  {
    id: 0,
    title: "Account",
    component: () => <Account />,
    path: "/",
    pathname: "/account",
  },
  {
    id: 1,
    title: "Profile Information",
    component: () => <ProfileInformation />,
    path: "/profile-information/",
    pathname: "/account/profile-information",
  },
  {
    id: 2,
    title: "My Addresses",
    component: () => <Address />,
    path: "/address",
    pathname: "/account/address",
  },
  {
    id: 3,
    title: "My List",
    component: () => <Lists />,
    path: "/lists",
    pathname: "/account/lists",
  },
  {
    id: 4,
    title: "Purchase History",
    component: () => <PurchaseHistory />,
    path: "/purchase-history",
    pathname: "/account/purchase-history",
  },
  {
    id: 5,
    title: "Transaction History",
    component: ({ setPageTitle }) => (
      <TransactionDetails setPageTitle={setPageTitle} />
    ),
    path: "/transaction/:transactionId",
    pathname: "/account/transaction/",
  },
  {
    id: 6,
    title: "Support Tickets",
    component: () => <SupportTickets />,
    path: "/tickets",
    pathname: "/account/tickets",
  },
  {
    id: 7,
    title: "Which item are you facing an issue with?",
    component: () => <HelpAndSupport />,
    path: "/help-support",
    pathname: "/account/help-support",
  },
];

const UserAccountRoutes = () => {
  const [activeRouteId, setActiveRouteId] = useState(0);
  const [pageTitle, setPageTitle] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const locationPath = location.pathname;
  const hasTrailingSlash = locationPath.endsWith("/");

  useEffect(() => {
    // Redirect if there's a trailing slash
    if (hasTrailingSlash && locationPath !== "/") {
      navigate(locationPath.slice(0, -1), { replace: true });
    }

    const filteredRoute = routesInformation?.find((route) => {
      return route?.pathname === locationPath;
    });

    setPageTitle(filteredRoute?.title);
    setActiveRouteId(filteredRoute?.id);
  }, [hasTrailingSlash, locationPath, navigate]);

  return (
    <UserAccountRoutesStyle className="container">
      {pageTitle && activeRouteId !== 0 && (
        <div className="account__routes__page__title">{pageTitle}</div>
      )}
      <div className="account__routes__wrapper">
        {activeRouteId !== 0 && <AccountSidebar />}
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            {routesInformation?.map((route) => (
              <Route
                key={route?.id}
                path={route?.path}
                element={route?.component({ setPageTitle })}
              />
            ))}
            <Route path="*" element={<Navigate to="/account/" />} />
          </Route>
        </Routes>
      </div>
    </UserAccountRoutesStyle>
  );
};

export default UserAccountRoutes;
