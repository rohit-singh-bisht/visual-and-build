import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const FooterLinksStyle = styled.div`
  .links__wrapper {
    display: flex;
    flex-direction: column;
    gap: 9px;
    .footer__link {
      color: #fff;
      font-size: 12px;
      font-weight: 400;
      line-height: 18px;
      display: inline-flex;
      gap: 9px;
    }
  }
`;

const FooterLinks = ({ title, links }) => {
  return (
    <FooterLinksStyle>
      <h2 className="title">{title}</h2>
      <div className="links__wrapper">
        {links?.map((item) => (
          <div key={item?.id}>
            <a href={item?.link} target="_self" className="footer__link">
              {item?.icon}
              {item?.title}
            </a>
          </div>
        ))}
      </div>
    </FooterLinksStyle>
  );
};

export default FooterLinks;
