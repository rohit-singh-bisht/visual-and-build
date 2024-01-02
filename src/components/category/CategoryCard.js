import React from "react";
import styled from "styled-components";

const CategoryCardStyle = styled.div`
  .image {
    margin-bottom: 26px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .title {
    color: #000;
    text-align: center;
    font-size: 19px;
    font-weight: 400;
    line-height: normal;
  }
`;

const CategoryCard = ({ title, link, src }) => {
  return (
    <CategoryCardStyle>
      <div className="image">
        <img src={src} alt={title} />
      </div>
      <div className="title">{title}</div>
    </CategoryCardStyle>
  );
};

export default CategoryCard;
