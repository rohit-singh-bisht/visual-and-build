import React from "react";
import { Link } from "react-router-dom";
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
  }
`;

const AccountSidebar = () => {
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
      to: "/",
    },
    {
      title: "Shipping Addresses",
      to: "/account/address",
    },
    {
      title: "Payment Methods",
      to: "/",
    },
    {
      title: "Profile Information",
      to: "/profile-information",
    },
  ];

  return (
    <AccountSidebarStyle>
      {links?.map((items) => (
        <Link to={items?.to} className="link">
          {items?.title}
        </Link>
      ))}
    </AccountSidebarStyle>
  );
};

export default AccountSidebar;
