import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/logo.svg";
import Search from "../components/forms/search/Search";
import { navLinks } from "../constants/HeaderLinks";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Cart } from "../assets/cart.svg";
import { useAppContext } from "../context/useAppContext";
import { ReactComponent as HamburgerIcon } from "../assets/hamburger.svg";
import { useAuth } from "../hooks/useAuth";

const HeaderStyle = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 8;
  background-color: #ae0000;
  .header__wrapper {
    height: 74px;
    display: flex;
    align-items: center;
    padding: 0 50px;
    gap: 70px;
    width: 100%;
    max-width: 1440px;
    margin: auto;
  }
  nav {
    display: flex;
    gap: 40px;
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
    gap: 40px;
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
  @media (max-width: 768px) {
    .header__wrapper {
      padding: 0 24px;
      height: 60px;
      justify-content: space-between;
    }
    .logo {
      svg {
        width: 100px;
      }
    }
  }
`;

const Blank = styled.div`
  height: 74px;
  width: 100%;
`;

const Header = ({ setIsAuthForm }) => {
  const { isDesktop } = useAppContext();
  const isLoggedIn = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Blank />
      <HeaderStyle>
        <div className="header__wrapper">
          <Link to={"/"} className="logo">
            <Logo />
          </Link>
          {isDesktop ? (
            <>
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
                    !isLoggedIn ? setIsAuthForm(true) : navigate("/account/");
                  }}
                  className="two__liners"
                >
                  Hello, sign in
                  <span>Account & Lists</span>
                </div>
                <Link to={"/account/purchase-history"} className="two__liners">
                  Returns
                  <span>& Orders</span>
                </Link>
                <Link to={"/cart"} className="cart">
                  <Cart />
                  Cart
                </Link>
              </div>
            </>
          ) : (
            <HamburgerIcon />
          )}
        </div>
      </HeaderStyle>
    </>
  );
};

export default Header;
