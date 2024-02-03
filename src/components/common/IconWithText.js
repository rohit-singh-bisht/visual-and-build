import React from "react";
import styled from "styled-components";

const IconWithTextStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  .icon {
    svg {
      display: block;
    }
  }
  .content {
    * {
      color: #303030;
      font-size: 12px;
      line-height: 18px;
    }
    .title {
      font-weight: 700;
      margin-bottom: 1.5px;
    }
    .subtitle {
      font-weight: 400;
    }
  }
  @media (max-width: 768px) {
    .content {
      .subtitle {
        white-space: nowrap;
      }
    }
  }
`;

const IconWithText = ({ icon, title, subtitle }) => {
  return (
    <IconWithTextStyle>
      <div className="icon">{icon}</div>
      <div className="content">
        <h2 className="title">{title}</h2>
        <p className="subtitle">{subtitle}</p>
      </div>
    </IconWithTextStyle>
  );
};

export default IconWithText;
