import React from "react";
import styled from "styled-components";

const BlogTagsStyle = styled.div`
  border-radius: 18px;
  background: #fcfcfc;
  padding: 30px;
  .tags__list__title {
    color: #303030;
    font-size: 18px;
    font-weight: 600;
    line-height: 22.5px;
    margin-bottom: 18px;
  }
  .blog__tags__wrapper {
    display: flex;
    column-gap: 9px;
    row-gap: 6px;
    flex-wrap: wrap;
    .blog__tag__pill {
      color: #303030;
      font-size: 10.5px;
      font-weight: 400;
      line-height: 15px;
      font-family: Poppins;
      padding: 9px 14px;
      border-radius: 3.75px;
      background: #fff;
      cursor: pointer;
    }
  }
`;

const BlogTags = ({ title = "Tags", blogTagsList }) => {
  return (
    <BlogTagsStyle>
      <h2 className="tags__list__title">{title}</h2>
      <div className="blog__tags__wrapper">
        {blogTagsList?.map((tag) => (
          <div className="blog__tag__pill" key={tag}>
            {tag}
          </div>
        ))}
      </div>
    </BlogTagsStyle>
  );
};

export default BlogTags;
