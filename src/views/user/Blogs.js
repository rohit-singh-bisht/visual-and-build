import React from "react";
import styled from "styled-components";
import BlogCard from "../../components/blogs/BlogCard";
import categoryDummy from "../../assets/category-dummy.jpg";

const BlogsStyle = styled.section``;

const Blogs = () => {
  return (
    <BlogsStyle>
      <div className="container">
        <BlogCard
          blogSrc={categoryDummy}
          blogTitle={"Sorem ipsum dolor sit amet, consectetur adipiscing elit."}
          tag={"Tips"}
          author={"Janet Polly"}
          date={"12th, April 2023"}
        />
      </div>
    </BlogsStyle>
  );
};

export default Blogs;
