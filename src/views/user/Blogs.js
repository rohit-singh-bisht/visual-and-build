import React from "react";
import styled from "styled-components";
import BlogCard from "../../components/blogs/BlogCard";
import categoryDummy from "../../assets/category-dummy.jpg";
import BlogSearch from "../../components/blogs/BlogSearch";

const BlogsStyle = styled.section`
  .blogs__body {
    display: flex;
    gap: 42px;
    aside {
      width: 330px;
    }
    .blogs__wrapper {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      row-gap: 12px;
    }
  }
`;

const Blogs = () => {
  return (
    <BlogsStyle>
      <div className="container">
        <div className="blogs__body">
          <aside>
            <BlogSearch />
          </aside>
          <div className="blogs__wrapper">
            {Array.from({ length: 10 }, (_, index) => index + 1)?.map(
              (item) => (
                <BlogCard
                  blogSrc={categoryDummy}
                  blogTitle={
                    "Sorem ipsum dolor sit amet, consectetur adipiscing elit."
                  }
                  tag={"Tips"}
                  author={"Janet Polly"}
                  date={"12th, April 2023"}
                />
              )
            )}
          </div>
        </div>
      </div>
    </BlogsStyle>
  );
};

export default Blogs;
