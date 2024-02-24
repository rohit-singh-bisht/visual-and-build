import React from "react";
import CategoryCard from "./CategoryCard";
import styled from "styled-components";

const CategoryListStyle = styled.div`
  .title_wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
    .title {
      color: #303030;
      font-size: 27px;
      font-style: normal;
      font-weight: 600;
      line-height: 34.5px;
    }
  }
  .list_wrapper {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
    .view__all {
      .view__all__button {
        border-radius: 7.5px;
        background-color: #e8e8e8;
        font-size: 14px;
        font-weight: 400;
        line-height: 16px;
        text-align: center;
        height: 130px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
  }
  @media (max-width: 768px) {
    .title_wrapper {
      margin-bottom: 27px;
      .title {
        font-size: 18px;
        line-height: normal;
      }
    }
    .list_wrapper {
      display: flex;
      justify-content: space-between;
      gap: 20px;
    }
  }
`;

const CategoryList = ({ title, allText, allLink, list }) => {
  return (
    <CategoryListStyle>
      <div className="title_wrapper">
        <h2 className="title">{title}</h2>
        {allLink && allText && <p className="all_button">{allText}</p>}
      </div>
      <div className="list_wrapper">
        {list &&
          list?.length &&
          list?.map((item) => <CategoryCard key={item?.id} {...item} />)}
        <div className="view__all">
          <div className="view__all__button">
            View All <br /> categories
          </div>
        </div>
      </div>
    </CategoryListStyle>
  );
};

export default CategoryList;
