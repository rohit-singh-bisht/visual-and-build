import React from "react";
import styled from "styled-components";
import BlogCard from "../../components/blogs/BlogCard";
import categoryDummy from "../../assets/category-dummy.jpg";
import BlogSearch from "../../components/blogs/BlogSearch";
import BlogCategoryList from "../../components/blogs/BlogCategoryList";
import BlogTags from "../../components/blogs/BlogTags";
import RecentBlogs from "../../components/blogs/RecentBlogs";
import Pagination from "@mui/material/Pagination";

const BlogsStyle = styled.section`
  .blogs__banner {
    margin: 60px 0;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .page__title {
      color: #fff;
      font-size: 42px;
      font-weight: 700;
      line-height: 51px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 82.5px;
    }
  }
  .blogs__body {
    display: flex;
    gap: 42px;
    aside {
      width: 330px;
    }
    .blogs__wrapper {
      flex: 1;
      .blogs__grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        row-gap: 12px;
      }
    }
    .blogs__list__pagination {
      margin-top: 30px;
      margin-bottom: 55px;
      display: flex;
      justify-content: center;
    }
  }
  @media (min-width: 1024px) {
    .gap-30 {
      height: 30px;
    }
  }
`;

const Blogs = () => {
  return (
    <BlogsStyle>
      <div className="container">
        <div className="blogs__banner">
          <img src="/images/blogs.jpg" alt="blogs" />
          <div className="page__title">Blogs</div>
        </div>
        <div className="blogs__body">
          <aside>
            <BlogSearch />
            <div className="gap-30" />
            <BlogCategoryList
              title={"Categories"}
              blogCategories={[
                "Categories",
                "Categories",
                "Categories",
                "Categories",
              ]}
            />
            <div className="gap-30" />
            <BlogTags
              blogTagsList={[
                "Categories",
                "Categories",
                "Categories",
                "Cat",
                "Dpgs",
              ]}
            />
            <div className="gap-30" />
            <RecentBlogs
              recentBlogsList={[
                {
                  src: categoryDummy,
                  blogTitle: "Rorem ipsum dolor sit",
                  blogDate: "April 14, 2023",
                },
                {
                  src: categoryDummy,
                  blogTitle: "Rorem ipsum dolor sit",
                  blogDate: "April 14, 2023",
                },
              ]}
            />
          </aside>
          <div className="blogs__wrapper">
            <div className="blogs__grid">
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
            <div className="blogs__list__pagination">
              <Pagination className="pagination" count={10} shape="rounded" />
            </div>
          </div>
        </div>
      </div>
    </BlogsStyle>
  );
};

export default Blogs;
