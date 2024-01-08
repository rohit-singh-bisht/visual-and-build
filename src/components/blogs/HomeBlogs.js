import React from "react";
import styled from "styled-components";
import { ReactComponent as ArrowIcon } from "../../assets/arrow.svg";

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
      .main__blog__title {
        color: #303030;
        font-size: 27px;
        font-weight: 600;
        line-height: 34.5px;
        margin-bottom: 11.5px;
      }
      .main__blog__excerpt {
        color: #303030;
        font-size: 15px;
        font-weight: 400;
        line-height: 22.5px;
      }
    }
    .other__blogs {
      width: 100%;
      max-width: 372px;
    }
  }
`;

const HomeBlogs = () => {
  return (
    <HomeBlogsStyle>
      <h2 className="blogs__title">Blogs</h2>
      <div className="subtitle__holder">
        <p className="subtitle">
          Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis.
        </p>
        <button className="view_all">
          View all <ArrowIcon className="icon" />
        </button>
      </div>
      <div className="blogs__wrapper">
        <div className="main__blog">
          <div className="blog__image">
            <img src="" alt={""} />
          </div>
          <h2 className="main__blog__title">
            Our Choices for Top 10 Lumber in 2023
          </h2>
          <p className="main__blog__excerpt">
            Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis.
          </p>
        </div>
        <div className="other__blogs"></div>
      </div>
    </HomeBlogsStyle>
  );
};

export default HomeBlogs;
