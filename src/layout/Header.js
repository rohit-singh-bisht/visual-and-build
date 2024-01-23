import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/logo.svg";
import Search from "../components/forms/search/Search";
import { navLinks } from "../constants/HeaderLinks";
import { Link } from "react-router-dom";
import { ReactComponent as Cart } from "../assets/cart.svg";

const HeaderStyle = styled.header`
  background-color: #ae0000;
  height: 74px;
  display: flex;
  align-items: center;
  padding: 0 50px;
  gap: 70px;
  nav {
    display: flex;
    gap: 20px;
  }
  .link {
    color: #fff;
    font-size: 12px;
    font-weight: 400;
    line-height: 100%;
  }
  .cart {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    line-height: 12px;
  }
  .other__links {
    display: flex;
    align-items: flex-end;
    gap: 25px;
    > div {
      cursor: pointer;
    }
  }
  .two__liners {
    color: #fff;
    font-size: 8.25px;
    font-weight: 400;
    line-height: 10.5px;
    span {
      font-size: 9.75px;
      font-weight: 700;
      line-height: 11.25px;
      display: block;
    }
  }
`;

const Header = ({ setIsAuthForm }) => {
  return (
    <HeaderStyle>
      <Link to={"/"} className="logo">
        <Logo />
      </Link>
      <nav>
        {navLinks?.map((link) => (
          <Link className="link" key={link?.id} to={link?.link}>
            {link?.title}
          </Link>
        ))}
      </nav>
      <Search />
      <div className="other__links">
        <div
          onClick={() => {
            setIsAuthForm(true);
          }}
          to={"/account"}
          className="two__liners"
        >
          Hello, sign in
          <span>Account & Lists</span>
        </div>
        <Link to={""} className="two__liners">
          Returns
          <span>& Orders</span>
        </Link>
        <Link to={"/cart"} className="cart">
          <Cart />
          Cart
        </Link>
      </div>
    </HeaderStyle>
  );
};

export default Header;
