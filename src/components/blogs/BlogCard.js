import React from "react";
import styled from "styled-components";
import { ReactComponent as UserIcon } from "../../assets/user.svg";
import { ReactComponent as ClockIcon } from "../../assets/clock.svg";

const BlogCardStyle = styled.div`
  padding: 30px;
  border-radius: 18px;
  background: #fff;
  border: 0.75px solid rgba(48, 48, 48, 0);
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    border-color: rgba(48, 48, 48, 0.25);
    .blog__card__title {
      text-decoration: underline;
    }
  }
  .blog__card__image {
    margin-bottom: 18px;
    border-radius: 18px;
    overflow: clip;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .blog__card__tag {
      padding: 5px 15px;
      border-radius: 7.5px;
      background: #ae0000;
      color: #fff;
      font-size: 12px;
      font-weight: 700;
      line-height: 18px;
      position: absolute;
      top: 18px;
      left: 18px;
    }
  }
  .blog__card__title {
    color: #303030;
    font-size: 18px;
    font-weight: 600;
    line-height: 22.5px;
  }
  .blog__card_meta {
    margin-top: 14px;
    display: flex;
    gap: 24px;
    align-items: center;
    .blog__card__author,
    .blog__card__date {
      display: flex;
      gap: 9px;
      align-items: center;
      font-size: 12px;
      font-weight: 400;
      line-height: 20px;
    }
  }
  @media (max-width: 768px) {
    padding: 0;
    &:hover {
      border-color: #fff;
    }
    .blog__card__image {
      border-radius: 8px;
      margin-bottom: 8px;
      width: 250px;
      .blog__card__tag {
        font-size: 9px;
        line-height: normal;
        font-weight: 500;
        border-radius: 4px;
        top: 8px;
        left: 8px;
      }
    }
    .blog__card__title {
      font-size: 14px;
      line-height: normal;
    }
    .blog__card_meta {
      .blog__card__author,
      .blog__card__date {
        gap: 4px;
      }
    }
  }
`;

const BlogCard = ({ blogSrc, blogTitle, tag, author, date }) => {
  return (
    <BlogCardStyle>
      <div className="blog__card__image">
        <img src={blogSrc} alt={blogTitle} />
        <h4 className="blog__card__tag">{tag}</h4>
      </div>
      <h3 className="blog__card__title">{blogTitle}</h3>
      <div className="blog__card_meta">
        <div className="blog__card__author">
          <UserIcon /> {author}
        </div>
        <div className="blog__card__date">
          <ClockIcon /> {date}
        </div>
      </div>
    </BlogCardStyle>
  );
};

export default BlogCard;
