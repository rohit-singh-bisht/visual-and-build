import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/logo.svg";
import Search from "../components/forms/search/Search";

const HeaderStyle = styled.header`
  background-color: #ae0000;
  height: 74px;
  display: flex;
  align-items: center;
  padding: 0 50px;
`;

const Header = () => {
  return (
    <HeaderStyle>
      <div className="logo">
        <Logo />
      </div>
      <Search />
      <div className="">
        <div className="cart"></div>
      </div>
    </HeaderStyle>
  );
};

export default Header;
