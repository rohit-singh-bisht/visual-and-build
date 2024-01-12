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
          list?.map((item) => <CategoryCard {...item} />)}
      </div>
    </CategoryListStyle>
  );
};

export default CategoryList;
