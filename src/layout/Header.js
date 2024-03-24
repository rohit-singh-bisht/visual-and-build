import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/logo.svg";
import Search from "../components/forms/search/Search";
import { navLinks } from "../constants/HeaderLinks";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Cart } from "../assets/cart.svg";
import { useAppContext } from "../context/useAppContext";
import { ReactComponent as HamburgerIcon } from "../assets/hamburger.svg";
import { useAuth } from "../hooks/useAuth";
import StyledMask from "../components/common/StyledMask";

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
        width: 140px;
      }
    }
  }
`;

const Blank = styled.div`
  height: 74px;
  width: 100%;
  @media (max-width: 768px) {
    height: 60px;
  }
`;

const MobileNavStyle = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  width: 100vw;
  padding: 12px 0px;
  background-color: #fff;
  z-index: 5;
  box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.3);
  .link {
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    display: block;
    padding: 10px 20px;
    color: #303030;
  }
`;

const Header = ({ setIsAuthForm }) => {
  const { isDesktop } = useAppContext();
  const isLoggedIn = useAuth();
  const navigate = useNavigate();
  const [isNavActive, setIsNavActive] = useState(false);

  useEffect(() => {
    if (isNavActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "inherit";
    }
    return () => (document.body.style.overflow = "inherit");
  }, [isNavActive]);

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
            <HamburgerIcon onClick={() => setIsNavActive((prev) => !prev)} />
          )}
        </div>
      </HeaderStyle>
      {isNavActive && (
        <>
          <StyledMask
            onClick={() => setIsNavActive(false)}
            background={"rgba(0, 0, 0, 0.3)"}
          />
          <MobileNavStyle className="mobile__navigation">
            <nav>
              {navLinks?.map((link) => (
                <Link
                  onClick={() => setIsNavActive(false)}
                  className="link"
                  key={link?.id}
                  to={link?.link}
                >
                  {link?.title}
                </Link>
              ))}
            </nav>
            <div className="other__links">
              <div
                onClick={() => {
                  !isLoggedIn ? setIsAuthForm(true) : navigate("/account/");
                  setIsNavActive(false);
                }}
                className="link"
              >
                Account & Lists
              </div>
              <Link
                onClick={() => setIsNavActive(false)}
                to={"/account/purchase-history"}
                className="link"
              >
                Returns
                <span>& Orders</span>
              </Link>
              <Link
                onClick={() => setIsNavActive(false)}
                to={"/cart"}
                className="link"
              >
                Cart
              </Link>
            </div>
          </MobileNavStyle>
        </>
      )}
    </>
  );
};

export default Header;
