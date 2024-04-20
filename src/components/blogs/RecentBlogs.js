import React, { useEffect } from "react";
import styled from "styled-components";
import { useRequest } from "../../hooks/useRequest";
import { useNavigate } from "react-router-dom";
import { getDate } from "../../utils/helper";

const RecentBlogsStyle = styled.div`
  .recent__blogs__section__title {
    color: #303030;
    font-size: 18px;
    font-weight: 600;
    line-height: 22.5px;
    position: relative;
    margin-bottom: 32px;
    display: inline-block;
    &:after {
      content: "";
      width: 100%;
      height: 3px;
      position: absolute;
      left: 0;
      right: 0;
      bottom: -5px;
      background: #ae0000;
    }
  }
  .recent__blogs__wrapper {
    .recent__blog__card {
      margin-bottom: 15px;
      cursor: pointer;
      &:hover {
        .recent__blog__title {
          text-decoration: underline;
        }
      }
      .recent__blog__image {
        border-radius: 18px;
        margin-bottom: 18px;
        overflow: clip;
        img,
        iframe {
          width: 100%;
          height: 220px;
          object-fit: cover;
          border: none;
        }
      }
      .recent__blog__content {
        .recent__blog__title {
          color: #303030;
          font-size: 15px;
          font-weight: 600;
          line-height: 22.5px;
          margin-bottom: 5.5px;
        }
        .recent__blog__date {
          color: #303030;
          font-size: 12px;
          font-weight: 400;
          line-height: 18px;
        }
      }
    }
  }
`;

const RecentBlogs = ({ recentTitle = "Recent Blogs" }) => {
  const [fetchRecentBlogs, { state: recentBlogs }] =
    useRequest(`/blog?limit=2`);
  const recentBlogsList = recentBlogs?.data?.docs;
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecentBlogs();
  }, []);

  const handleBlogClick = (id) => {
    id && navigate(`/blog/${id}`);
  };

  return (
    <RecentBlogsStyle>
      <h2 className="recent__blogs__section__title">{recentTitle}</h2>
      <div className="recent__blogs__wrapper">
        {recentBlogsList?.map((blog) => {
          const { banner, title: blogTitle, date, id } = blog;
          return (
            <div
              className="recent__blog__card"
              onClick={() => handleBlogClick(id)}
              key={id}
            >
              <div className="recent__blog__image">
                {blog?.contentType === "image" ? (
                  <img
                    src={process.env.REACT_APP_MEDIA_ASSETS_URL + "/" + banner}
                    alt={blogTitle}
                  />
                ) : (
                  <iframe src={blog?.bannerUrl}></iframe>
                )}
              </div>
              <div className="recent__blog__content">
                <h3 className="recent__blog__title">{blogTitle}</h3>
                <div className="recent__blog__date">{getDate(date)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </RecentBlogsStyle>
  );
};

export default RecentBlogs;
