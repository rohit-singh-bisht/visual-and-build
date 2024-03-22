import React, { useEffect } from "react";
import styled from "styled-components";
import BlogSidebar from "../../components/blogs/BlogSidebar";
import { useAppContext } from "../../context/useAppContext";
import { useParams } from "react-router-dom";
import { useRequest } from "../../hooks/useRequest";
import { ReactComponent as ClockIcon } from "../../assets/clock.svg";
import { Skeleton } from "@mui/material";
import { getDate } from "../../utils/helper";

const BlogDetailsStyle = styled.div`
  padding: 60px 0;
  .blog__details__wrapper {
    display: flex;
    gap: 42px;
    aside {
      width: 330px;
    }
    .blog__details__body {
      flex: 1;
    }
  }
  .blog__details__title {
    font-size: 42px;
    font-weight: 700;
    line-height: 51px;
    text-align: left;
    text-transform: capitalize;
    color: #303030;
  }
  .blog__details__metadata {
    margin: 16px 0 36px;
    display: flex;
    gap: 36px;
  }
  .blog__details__metadata__item {
    display: flex;
    gap: 8px;
    align-items: center;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    text-align: right;
    .icon {
      fill: #303030;
    }
  }
  .blog__details__description {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    text-align: left;
    color: #303030;
    margin: 36px 0;
  }
  @media (min-width: 1024px) {
    .gap-30 {
      height: 30px;
    }
  }
`;

const BlogDetails = () => {
  const { isDesktop } = useAppContext();
  const { blogId } = useParams();
  const [fetchBlog, { isLoading, state: blogData }] = useRequest();
  const { title, date, banner, description } = blogData?.data || {};

  useEffect(() => {
    blogId && fetchBlog({ path: `/blog/${blogId}/show` });
  }, [blogId]);

  return (
    <BlogDetailsStyle>
      <div className="container">
        <div className="blog__details__wrapper">
          {isDesktop && <BlogSidebar />}
          {!isLoading ? (
            <div className="blog__details__body">
              <div className="blog__details__title">{title}</div>
              <div className="blog__details__metadata">
                <div className="blog__details__metadata__item">
                  <ClockIcon className="icon" /> {getDate(date)}
                </div>
              </div>
              <div className="blog__details__image">
                <img
                  src={process.env.REACT_APP_MEDIA_ASSETS_URL + "/" + banner}
                  alt={title}
                />
              </div>
              <div className="blog__details__description">{description}</div>
            </div>
          ) : (
            <div style={{ flex: 1 }}>
              <Skeleton
                width={"100%"}
                height={102}
                style={{ borderRadius: "5px" }}
                variant="rectangular"
              />
              <Skeleton
                width={"100%"}
                height={18}
                style={{ borderRadius: "5px", margin: "16px 0 36px" }}
                variant="rectangular"
              />
              <Skeleton
                width={"100%"}
                height={300}
                style={{ borderRadius: "5px", margin: "16px 0" }}
                variant="rectangular"
              />
              <Skeleton
                width={"100%"}
                height={450}
                style={{ borderRadius: "5px", margin: "16px 0" }}
                variant="rectangular"
              />
            </div>
          )}
        </div>
      </div>
    </BlogDetailsStyle>
  );
};

export default BlogDetails;
