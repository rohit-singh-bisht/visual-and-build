import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { supportLinks, links, aboutLinks } from "../constants/FooterLinks";
import FooterLinks from "../components/common/FooterLinks";
import { Link } from "react-router-dom";
import { ReactComponent as VisaIcon } from "../assets/visa.svg";
import { ReactComponent as MasterCardIcon } from "../assets/masterCard.svg";
import { ReactComponent as PaypalIcon } from "../assets/paypal.svg";
import { ReactComponent as ApplePayIcon } from "../assets/applePay.svg";
import { socialLinks } from "../constants/FooterLinks";
import { ReactComponent as LogoIcon } from "../assets/logo-square.svg";
import Subscribe from "../components/forms/subscribe/Subscribe";
import { useRequest } from "../hooks/useRequest";
import { useAppContext } from "../context/useAppContext";

const FooterStyle = styled.footer`
  background: #000;
  .title {
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    line-height: 22.5px;
    margin-bottom: 17.5px;
  }
  .payment__icons {
    display: flex;
    gap: 6px;
    margin-bottom: 47.25px;
  }
  .links__holder {
    display: flex;
    justify-content: space-between;
    padding-top: 30px;
    padding-bottom: 60px;
  }
  .bottom__footer {
    padding-top: 6px;
    border-top: 0.75px solid rgba(255, 255, 255, 0.25);
    display: flex;
    justify-content: space-between;
    color: rgba(255, 255, 255, 0.75);
    font-size: 10.5px;
    font-weight: 400;
    line-height: 15px;
    padding-bottom: 60px;
  }
  .other__links {
    display: flex;
    gap: 4px;
    .links {
      color: rgba(255, 255, 255, 0.75);
    }
  }
  .footer__logo {
    margin-top: 45px;
  }
  @media (max-width: 768px) {
    padding: 30px 0px 0px;
    .title {
      margin-top: 28px;
    }
    .payment__icons {
      margin-bottom: 0;
    }
    .links__holder {
      flex-direction: column;
      padding-bottom: 40px;
    }
    .columns:nth-of-type(1) {
      display: flex;
      flex-direction: column-reverse;
    }
    .footer__logo {
      margin-top: 15px;
    }
    .bottom__footer {
      flex-direction: column;
      gap: 4px;
      padding-bottom: 30px;
      padding-top: 14px;
    }
  }
`;

const Footer = () => {
  const [categoriesLinks, setCategoriesLinks] = useState();
  const { categoryData, setCategoriesData } = useAppContext();
  const [
    fetchCategories,
    { isLoading: isFetchingCategories, state: category },
  ] = useRequest(`/category?limit=6&page=1&parent=true`);

  useEffect(() => {
    !categoryData && fetchCategories();
  }, []);

  useEffect(() => {
    setCategoriesData(category);
    const finalCategories = category?.data?.docs?.reduce((acc, curr) => {
      const data = {
        id: curr?.id,
        title: curr?.name,
        link: `/search?categories%5B%5D=${curr?.id}`,
      };
      return acc.concat(data);
    }, []);
    setCategoriesLinks(finalCategories);
  }, [category]);

  return (
    <FooterStyle>
      <Subscribe />
      <div className="container links__holder">
        <div className="columns">
          <FooterLinks title={"Contact Us"} links={aboutLinks} />
          <LogoIcon className="footer__logo" />
        </div>
        <div className="columns">
          <FooterLinks title={"Categories"} links={categoriesLinks} />
        </div>
        <div className="columns">
          <FooterLinks title={"Supports"} links={supportLinks} />
        </div>
        <div className="columns">
          <FooterLinks title={"Links"} links={links} />
        </div>
        <div className="columns">
          <h2 className="title">Payments</h2>
          <div className="payment__icons">
            <VisaIcon />
            <MasterCardIcon />
            <PaypalIcon />
            <ApplePayIcon />
          </div>
          <FooterLinks
            title={"Follow Us"}
            links={socialLinks}
            linksType={"social"}
          />
        </div>
      </div>
      <div className="container bottom__footer">
        <p>Copyright © 2023 V&B visual and Build All Rights Reserved.</p>
        <div className="other__links">
          <Link to={"/privacy-policy"} className="links">
            Privacy Policy
          </Link>{" "}
          |<Link className="links">Terms & Condition</Link> |
          <Link className="links">Sitemap</Link>
        </div>
      </div>
    </FooterStyle>
  );
};

export default Footer;
