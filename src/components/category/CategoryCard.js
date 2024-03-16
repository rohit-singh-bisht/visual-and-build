import React from "react";
import styled from "styled-components";

const CategoryCardStyle = styled.div`
  cursor: pointer;
  &:hover {
    .image {
      img {
        transform: scale(1.2);
      }
    }
  }
  .image {
    margin-bottom: 18px;
    height: 130px;
    overflow: clip;
    border-radius: 7.5px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      overflow: clip;
      transition: all 0.3s;
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
      position: relative;
      transition: all 0.3s;
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
      z-index: 2;
    }
    &:hover {
      .image {
        transform: scale(1.1);
      }
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

const CategoryCard = ({ name, link, bannerUrl, type, onClick }) => {
  return (
    <CategoryCardStyle
      className={type === "text-in-image" ? "text__in__image" : ""}
      onClick={onClick}
    >
      <div className="image">
        <img src={bannerUrl} alt={name} />
        {type === "text-in-image" && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              backgroundColor: "rgba(0,0,0,0.35)",
            }}
          />
        )}
      </div>
      <div className="title">{name}</div>
    </CategoryCardStyle>
  );
};

export default React.memo(CategoryCard);
