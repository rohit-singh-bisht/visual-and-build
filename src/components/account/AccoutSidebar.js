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
    },
    {
      title: "Purchase History",
      to: "/",
      sublinks: [{}],
    },
    {
      title: "My List",
      to: "/account/lists",
      isActive: location?.pathname === "/account/lists",
    },
    {
      title: "Shipping Addresses",
      to: "/account/address",
      isActive: location?.pathname === "/account/address",
    },
    {
      title: "Payment Methods",
      to: "/",
    },
    {
      title: "Profile Information",
      to: "/account/profile-information",
      isActive: location?.pathname === "/account/profile-information",
    },
  ];

  return (
    <AccountSidebarStyle>
      {links?.map((items) => (
        <Link
          to={items?.to}
          className={`link ${items?.isActive ? "active" : ""}`}
        >
          {items?.title}
        </Link>
      ))}
    </AccountSidebarStyle>
  );
};

export default AccountSidebar;
