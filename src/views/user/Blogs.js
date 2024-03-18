import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BlogCard from "../../components/blogs/BlogCard";
import categoryDummy from "../../assets/category-dummy.jpg";
import BlogSearch from "../../components/blogs/BlogSearch";
import BlogCategoryList from "../../components/blogs/BlogCategoryList";
import BlogTags from "../../components/blogs/BlogTags";
import RecentBlogs from "../../components/blogs/RecentBlogs";
import Pagination from "@mui/material/Pagination";
import { useAppContext } from "../../context/useAppContext";
import { useRequest } from "../../hooks/useRequest";
import { Skeleton } from "@mui/material";

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
  @media (max-width: 768px) {
    .container {
      padding: 0;
    }
    .blogs__banner {
      margin-top: 0;
      margin-bottom: 30px;
      .page__title {
        font-size: 20px;
        line-height: 28px;
        left: 20px;
      }
    }
    .blogs__body {
      padding: 0 15px;
      .blogs__wrapper {
        .blogs__grid {
          column-gap: 8px;
          row-gap: 20px;
          .blog__card__image {
            width: 100%;
          }
          .blog__card__title {
            font-size: 12px;
          }
          .blog__card_meta {
            margin-top: 6px;
            flex-direction: column;
            gap: 0;
            align-items: flex-start;
            .blog__card__author,
            .blog__card__date {
              font-size: 10px;
              line-height: 16px;
              svg {
                width: 12px;
              }
            }
          }
        }
      }
    }
  }
`;

const Blogs = () => {
  const { isDesktop } = useAppContext();
  const [getBlogs] = useRequest();
  const [blogsData, setBlogsData] = useState([]);
  const [isFetchingBlogs, setIsFetchingBlogs] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [category, setCategory] = useState();
  const [searchValue, setSearchValue] = useState();

  useEffect(() => {
    setIsFetchingBlogs(true);
    const fetchBlogs = async (pageNumber) => {
      const path = `/blog?limit=10&page=${pageNumber}${
        category ? `&category=${category}` : ""
      }${searchValue ? `&search=${searchValue}` : ""}`;
      const response = await getBlogs({ path });
      setTotalPages(response?.data?.totalPages);
      setBlogsData(response?.data?.docs);
      setIsFetchingBlogs(false);
    };
    fetchBlogs(pageNumber);
  }, [pageNumber, category, searchValue]);

  const handlePaginationChange = (e, value) => {
    setPageNumber(value);
  };

  const onCategoryClick = (category) => {
    setCategory(category.toLowerCase());
  };

  return (
    <BlogsStyle>
      <div className="container">
        <div className="blogs__banner">
          <img src="/images/blogs.jpg" alt="blogs" />
          <div className="page__title">Blogs</div>
        </div>
        <div className="blogs__body">
          {isDesktop && (
            <aside>
              <BlogSearch setValue={setSearchValue} />
              <div className="gap-30" />
              <BlogCategoryList
                title={"Categories"}
                blogCategories={["Tip", "Trend", "Growth", "Review"]}
                onClick={onCategoryClick}
                selected={category}
              />
              <div className="gap-30" />
              {/* <BlogTags
                blogTagsList={[
                  "Categories",
                  "Categories",
                  "Categories",
                  "Cat",
                  "Dpgs",
                ]}
              /> */}
              <div className="gap-30" />
              <RecentBlogs recentBlogsList={blogsData?.slice(0, 2)} />
            </aside>
          )}
          <div className="blogs__wrapper">
            <div className="blogs__grid">
              {isFetchingBlogs
                ? Array.from({ length: 4 }, (_, index) => index + 1)?.map(
                    (item) => (
                      <Skeleton
                        key={item}
                        variant="rectangular"
                        style={{
                          borderRadius: "8px",
                          display: "inline-block",
                          margin: "0 8px",
                        }}
                        height={200}
                      />
                    )
                  )
                : blogsData?.map((item) => (
                    <BlogCard
                      blogSrc={
                        process.env.REACT_APP_MEDIA_ASSETS_URL +
                        "/" +
                        item?.banner
                      }
                      blogTitle={item?.title}
                      tag={item?.category}
                      date={new Date(item?.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    />
                  ))}
            </div>
            <div className="blogs__list__pagination">
              <Pagination
                className="pagination"
                count={totalPages}
                shape="rounded"
                onChange={handlePaginationChange}
              />
            </div>
          </div>
        </div>
      </div>
    </BlogsStyle>
  );
};

export default Blogs;
