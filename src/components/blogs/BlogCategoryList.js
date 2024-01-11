import React from "react";
import styled from "styled-components";

const BlogCategoryListStyle = styled.div`
  padding: 30px;
  border-radius: 18px;
  background: #303030;
  .blog__categories__title {
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    line-height: 22.5px;
    margin-bottom: 10px;
  }
  .blog__category {
    color: #fff;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    border-bottom: 0.75px solid rgba(255, 255, 255, 0.25);
    padding: 9px 0;
    cursor: pointer;
    margin-bottom: 6px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const BlogCategoryList = ({ title, blogCategories }) => {
  return (
    <BlogCategoryListStyle>
      <h2 className="blog__categories__title">{title}</h2>
      {blogCategories?.map((category) => (
        <p className="blog__category">{category}</p>
      ))}
    </BlogCategoryListStyle>
  );
};

export default BlogCategoryList;
