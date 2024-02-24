import React from "react";
import styled from "styled-components";
import { ReactComponent as ArrowIcon } from "../../assets/arrow.svg";
import categoryDummy from "../../assets/category-dummy.jpg";
import { useAppContext } from "../../context/useAppContext";
import BlogCard from "./BlogCard";

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
      .blog__image {
        margin-bottom: 24px;
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
        .other__blogs__card__category {
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          line-height: 18px;
          padding: 5px 15px;
          border-radius: 7.5px;
          background: #ae0000;
          display: inline-block;
          margin-bottom: 18px;
        }
        .other__blogs__card__title {
          color: #303030;
          font-size: 18px;
          font-weight: 600;
          line-height: 22.5px;
          margin-bottom: 12px;
        }
        .other__blogs__card__date {
          color: #303030;
          font-size: 10.5px;
          font-weight: 400;
          line-height: 15px;
        }
      }
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

  return (
    <HomeBlogsStyle>
      <h2 className="blogs__title">Blogs</h2>
      <div className="subtitle__holder">
        <p className="subtitle">
          Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis.
        </p>
        {isDesktop && (
          <button className="view_all">
            View all <ArrowIcon className="icon" />
          </button>
        )}
      </div>
      <div className="blogs__wrapper">
        {isDesktop ? (
          <>
            <div className="main__blog">
              <div className="blog__image">
                <img src={categoryDummy} alt={"blog"} />
              </div>
              <h2 className="main__blog__title">
                Our Choices for Top 10 Lumber in 2023
              </h2>
              <p className="main__blog__excerpt">
                Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
              </p>
            </div>
            <div className="other__blogs">
              <div className="other__blogs__card">
                <span className="other__blogs__card__category">Review</span>
                <h3 className="other__blogs__card__title">
                  Rorem ipsum dolor sit amet, consectetur adipiscing elit.
                </h3>
                <div className="other__blogs__card__date">16 April 2023</div>
              </div>
              <div className="other__blogs__card">
                <span className="other__blogs__card__category">Review</span>
                <h3 className="other__blogs__card__title">
                  Rorem ipsum dolor sit amet, consectetur adipiscing elit.
                </h3>
                <div className="other__blogs__card__date">16 April 2023</div>
              </div>
              <div className="other__blogs__card">
                <span className="other__blogs__card__category">Review</span>
                <h3 className="other__blogs__card__title">
                  Rorem ipsum dolor sit amet, consectetur adipiscing elit.
                </h3>
                <div className="other__blogs__card__date">16 April 2023</div>
              </div>
            </div>
          </>
        ) : (
          <>
            {Array.from({ length: 10 }, (_, index) => index + 1)?.map(
              (item) => (
                <BlogCard
                  key={item}
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
          </>
        )}
      </div>
    </HomeBlogsStyle>
  );
};

export default HomeBlogs;
