import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const AccountSidebarStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  width: 160px;
  .link {
    color: #666;
    font-size: 11px;
    font-weight: 400;
    line-height: 18px;
    &.active {
      color: #ae0000;
    }
  }
`;

const AccountSidebar = () => {
  const location = useLocation();

  const links = [
    {
      title: "My Account",
      to: "/account",
      show: true,
    },
    {
      title: "Purchase History",
      to: "/account/purchase-history",
      sublinks: [{}],
      isActive:
        location?.pathname === "/account/purchase-history" ||
        location?.pathname.includes("/account/transaction"),
      show: true,
    },
    {
      title: "My List",
      to: "/account/lists",
      isActive: location?.pathname === "/account/lists",
      show: true,
    },
    {
      title: "Addresses",
      to: "/account/address",
      isActive: location?.pathname === "/account/address",
      show: true,
    },
    {
      title: "Profile Information",
      to: "/account/profile-information",
      isActive: location?.pathname === "/account/profile-information",
      show: true,
    },
    {
      title: "Transaction Details",
      to: "",
      isActive: location?.pathname === "/account/profile-information",
      show: false,
    },
    {
      title: "Support Tickets",
      to: "/account/tickets",
      isActive: location?.pathname === "/account/tickets",
      show: true,
    },
  ];

  return (
    <AccountSidebarStyle>
      {links?.map((items) => {
        if (items?.show) {
          return (
            <Link
              key={items?.to}
              to={items?.to}
              className={`link ${items?.isActive ? "active" : ""}`}
            >
              {items?.title}
            </Link>
          );
        }
      })}
    </AccountSidebarStyle>
  );
};

export default AccountSidebar;
