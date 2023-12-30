import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/logo.svg";

const HeaderStyle = styled.header`
  background-color: #ae0000;
  height: 99px;
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
    </HeaderStyle>
  );
};

export default Header;
