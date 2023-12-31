import React from "react";
import Button from "./Button";
import styled from "styled-components";

const BannerStyle = styled.div`
  position: relative;
  img {
    width: 100%;
    display: block;
  }
  .content {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: ${({ leftDistance }) => leftDistance}px;
    .title {
      color: #fff;
      font-size: 36px;
      font-weight: 600;
      line-height: 46px;
    }
    .subtitle {
      color: #fff;
      font-size: 18px;
      font-weight: 500;
      line-height: normal;
      margin: 15px 0;
    }
    &.dark {
      .title,
      .subtitle {
        color: #000;
      }
    }
  }
`;

const Banner = ({
  imageSrc,
  onClick,
  title,
  textDark = false,
  subtitle,
  buttonType,
  titleSize,
  leftDistance,
  buttonTitle,
}) => {
  return (
    <BannerStyle leftDistance={leftDistance}>
      <img src={imageSrc} alt="Banner" />

      <div className={`content ${textDark ? "dark" : ""}`}>
        <h2 className={`title ${titleSize ? titleSize : ""}`}>{title}</h2>
        <p
          className="subtitle"
          dangerouslySetInnerHTML={{ __html: subtitle }}
        ></p>
        <Button title={buttonTitle} type={buttonType} onClick={onClick} />
      </div>
    </BannerStyle>
  );
};

export default Banner;
