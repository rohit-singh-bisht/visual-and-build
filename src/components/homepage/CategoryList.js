import React from "react";
import CategoryCard from "../CategoryCard";
import styled from "styled-components";

const CategoryListStyle = styled.div`
  .title_wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 69px;
    .title {
      color: #303030;
      font-size: 27px;
      font-style: normal;
      font-weight: 600;
      line-height: 34.5px;
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
        {list && list?.length && list?.map((item) => <CategoryCard />)}
      </div>
    </CategoryListStyle>
  );
};

export default CategoryList;
