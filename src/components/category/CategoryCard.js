import React from "react";
import styled from "styled-components";

const CategoryCardStyle = styled.div`
  cursor: pointer;
  .image {
    margin-bottom: 18px;
    height: 130px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 7.5px;
      overflow: clip;
    }
  }
  .title {
    font-size: 14.25px;
    font-style: normal;
    font-weight: 400;
    text-align: center;
    text-transform: capitalize;
  }
  &.text__in__image {
    border-radius: 6px;
    overflow: clip;
    border: 0.75px solid #d9d9d9;
    position: relative;
    .image {
      margin-bottom: 0;
    }
    .title {
      color: #fff;
      text-align: center;
      font-size: 16.5px;
      font-weight: 600;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      white-space: nowrap;
    }
  }
  @media (max-width: 768px) {
    .title {
      font-size: 12px;
    }
    .image {
      margin-bottom: 10px;
    }
  }
`;

const CategoryCard = ({ name, link, bannerUrl, type }) => {
  return (
    <CategoryCardStyle
      className={type === "text-in-image" ? "text__in__image" : ""}
    >
      <div className="image">
        <img src={bannerUrl} alt={name} />
      </div>
      <div className="title">{name}</div>
    </CategoryCardStyle>
  );
};

export default React.memo(CategoryCard);
