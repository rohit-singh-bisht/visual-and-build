import React from "react";
import Button from "./Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export const BannerStyle = styled.div`
  position: relative;
  max-height: 375px;
  height: 100%;
  img {
    width: 100%;
    display: block;
    height: 375px;
    object-fit: cover;
  }
  .content {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: ${({ leftdistance }) => leftdistance}px;
    .title {
      color: #fff;
      font-size: 36px;
      font-weight: 600;
      line-height: 46px;
      text-transform: capitalize;
    }
    .subtitle {
      color: #fff;
      font-size: 18px;
      font-weight: 500;
      line-height: normal;
      margin: 15px 0;
      text-transform: capitalize;
    }
    &.dark {
      .title,
      .subtitle {
        color: #000;
      }
    }
  }
  iframe {
    width: 100%;
    height: 375px;
    border: none;
  }
  @media (max-width: 768px) {
    min-height: 250px;
    img,
    iframe {
      height: 250px;
    }
    .content {
      top: 60%;
      width: 80%;
      .title {
        font-size: 18px;
        line-height: normal;
      }
      .subtitle {
        font-size: 14px;
        margin: 0 0 15px;
      }
    }
  }
`;

const Banner = ({
  imageSrc,
  buttonLink,
  title,
  textDark = false,
  subtitle,
  buttonType,
  titleSize,
  leftdistance,
  buttonTitle,
  contentType = "image",
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    buttonLink && navigate(buttonLink);
  };

  return (
    <BannerStyle leftdistance={leftdistance || 0}>
      {contentType !== "image" ? (
        <iframe src={imageSrc}></iframe>
      ) : (
        <>
          <img src={imageSrc} alt="Banner" />

          <div className={`content ${textDark ? "dark" : ""}`}>
            <h2 className={`title ${titleSize ? titleSize : ""}`}>{title}</h2>
            <p
              className="subtitle"
              dangerouslySetInnerHTML={{ __html: subtitle }}
            ></p>
            {buttonTitle && (
              <Button
                title={buttonTitle}
                type={buttonType}
                onClick={handleClick}
              />
            )}
          </div>
        </>
      )}
    </BannerStyle>
  );
};

export default Banner;
