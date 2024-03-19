import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as ArrowIcon } from "../../assets/arrow.svg";
import { useAppContext } from "../../context/useAppContext";
import BlogCard from "./BlogCard";
import { useRequest } from "../../hooks/useRequest";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomeBlogsStyle = styled.section`
  .blogs__title {
    color: #303030;
    font-size: 27px;
    font-weight: 600;
    line-height: 34.5px;
    margin-bottom: 17.5px;
  }
  .subtitle__holder {
    display: flex;
    justify-content: space-between;
    margin-bottom: 35.5px;
    gap: 40px;
    .subtitle {
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
      line-height: 22.5px;
      color: #303030;
    }
  }
  .view_all {
    color: #ae0000;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 18px;
    display: flex;
    align-items: center;
    gap: 12px;
    background-color: rgba(0, 0, 0, 0);
    white-space: nowrap;
    .icon {
      display: block;
    }
  }
  .blogs__wrapper {
    display: flex;
    gap: 48px;
    .main__blog {
      cursor: pointer;
      flex: 1;
      &:hover {
        .main__blog__title {
          text-decoration: underline;
        }
      }
      .main__blog__title {
        color: #303030;
        font-size: 27px;
        font-weight: 600;
        line-height: 34.5px;
        margin-bottom: 11.5px;
        text-transform: capitalize;
      }
      .main__blog__excerpt {
        color: #303030;
        font-size: 15px;
        font-weight: 400;
        line-height: 22.5px;
      }
      .blog__image {
        margin-bottom: 24px;
        img {
          width: 100%;
          height: 300px;
          object-fit: cover;
        }
      }
      .main__blog__metadata {
        margin-top: 24px;
        display: flex;
        gap: 12px;
        align-items: center;
      }
    }
    .other__blogs {
      width: 100%;
      max-width: 372px;
      .other__blogs__card {
        border-bottom: 0.75px solid rgba(48, 48, 48, 0.25);
        padding: 24px 0;
        &:first-child {
          padding-top: 0;
        }
        &:last-child {
          padding-bottom: 0;
          border-bottom: 0px solid rgba(48, 48, 48, 0.25);
        }
        .other__blogs__card__title {
          color: #303030;
          font-size: 18px;
          font-weight: 600;
          line-height: 22.5px;
          margin-bottom: 8px;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
        .other__blogs__card__desc {
          color: #838383;
          font-size: 14px;
          line-height: 22px;
          margin-bottom: 8px;
        }
        .other__blogs__card__category {
          margin-bottom: 18px;
        }
      }
    }
    .other__blogs__card__category {
      color: #fff;
      font-size: 12px;
      font-weight: 700;
      line-height: 18px;
      padding: 5px 15px;
      border-radius: 7.5px;
      background: #ae0000;
      display: inline-block;
    }
    .other__blogs__card__date {
      color: #303030;
      font-size: 10.5px;
      font-weight: 400;
      line-height: 15px;
    }
  }
  @media (max-width: 768px) {
    padding: 0 20px;
    .blogs__title {
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 10px;
    }
    .subtitle__holder {
      margin-bottom: 28px;
      .subtitle {
        font-size: 14px;
        line-height: 22px;
      }
    }
    .blogs__wrapper {
      overflow: auto;
      gap: 10px;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;

const HomeBlogs = () => {
  const { isDesktop } = useAppContext();
  const [getBlogs] = useRequest();
  const [blogsData, setBlogsData] = useState([]);
  const [isFetchingBlogs, setIsFetchingBlogs] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFetchingBlogs(true);
    const fetchBlogs = async () => {
      const path = `/blog?limit=4&page=1`;
      const response = await getBlogs({ path });
      setBlogsData(response?.data?.docs);
      setIsFetchingBlogs(false);
    };
    fetchBlogs();
  }, []);

  const handleBlogClick = (id) => {
    id && navigate(`/blog/${id}`);
  };

  return (
    <HomeBlogsStyle>
      <h2 className="blogs__title">Blogs</h2>
      <div className="subtitle__holder">
        <p className="subtitle">
          Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis.
        </p>
        {isDesktop && (
          <button className="view_all" onClick={() => navigate("/blogs")}>
            View all <ArrowIcon className="icon" />
          </button>
        )}
      </div>
      <div className="blogs__wrapper">
        {isDesktop ? (
          <>
            <div className="main__blog">
              <div className="blog__image">
                {isFetchingBlogs ? (
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={285}
                    style={{ borderRadius: "8px" }}
                  />
                ) : (
                  <img
                    src={
                      process.env.REACT_APP_MEDIA_ASSETS_URL +
                      "/" +
                      blogsData?.[0]?.banner
                    }
                    alt={"blog"}
                  />
                )}
              </div>
              <h2 className="main__blog__title">
                {isFetchingBlogs ? (
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={34}
                    style={{ borderRadius: "8px" }}
                  />
                ) : (
                  blogsData?.[0]?.title
                )}
              </h2>
              <p className="main__blog__excerpt">
                {isFetchingBlogs ? (
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={45}
                    style={{ borderRadius: "8px" }}
                  />
                ) : (
                  blogsData?.[0]?.description
                )}
              </p>
              <div className="main__blog__metadata">
                <span className="other__blogs__card__category">
                  {isFetchingBlogs ? (
                    <Skeleton
                      variant="rectangular"
                      width={102}
                      height={28}
                      style={{ borderRadius: "8px" }}
                    />
                  ) : (
                    blogsData?.[0]?.category
                  )}
                </span>
                <span className="other__blogs__card__date">
                  {new Date(blogsData?.[0]?.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
            <div className="other__blogs">
              {blogsData?.slice(1)?.map((item) => (
                <div
                  className="other__blogs__card"
                  onClick={() => handleBlogClick(item?.id)}
                >
                  <span className="other__blogs__card__category">
                    {item?.category}
                  </span>
                  <h3 className="other__blogs__card__title">{item?.title}</h3>
                  <p className="other__blogs__card__desc">
                    {item?.short_description}
                  </p>
                  <div className="other__blogs__card__date">
                    {new Date(item?.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {blogsData?.map((item) => (
              <BlogCard
                blogSrc={
                  process.env.REACT_APP_MEDIA_ASSETS_URL + "/" + item?.banner
                }
                blogTitle={item?.title}
                tag={item?.category}
                date={new Date(item?.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
                key={item?.id}
                id={item?.id}
              />
            ))}
          </>
        )}
      </div>
    </HomeBlogsStyle>
  );
};

export default HomeBlogs;
