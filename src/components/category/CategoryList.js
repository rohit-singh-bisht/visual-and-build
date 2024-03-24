import React, { useCallback } from "react";
import CategoryCard from "./CategoryCard";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";

const CategoryListStyle = styled.div`
  .title_wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
    .title {
      color: #303030;
      font-size: 27px;
      font-style: normal;
      font-weight: 600;
      line-height: 34.5px;
    }
  }
  .list_wrapper {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
    .view__all {
      .view__all__button {
        border-radius: 7.5px;
        background-color: #e8e8e8;
        font-size: 14px;
        font-weight: 400;
        line-height: 16px;
        text-align: center;
        height: 130px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
  }
  @media (max-width: 768px) {
    .title_wrapper {
      margin-bottom: 27px;
      .title {
        font-size: 18px;
        line-height: normal;
      }
    }
    .list_wrapper {
      gap: 20px;
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

const CategoryList = ({ title, allText, allLink, list, loading, type }) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const categoryId = searchParams.getAll("categories[]");

  const handleClick = useCallback(
    (id) => {
      if (!categoryId?.includes(id)) {
        searchParams.append("categories[]", id);
        const newUrl = `/search?${searchParams.toString()}`;
        navigate(newUrl);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [categoryId, searchParams]
  );

  return (
    <CategoryListStyle>
      <div className="title_wrapper">
        <h2 className="title">{title}</h2>
        {allLink && allText && <p className="all_button">{allText}</p>}
      </div>
      {loading ? (
        <div className="list_wrapper">
          {Array.from({ length: 6 }, (_, index) => index + 1)?.map((item) => (
            <Skeleton
              width={"100%"}
              height={130}
              variant="rectangular"
              className="skeleton"
              key={item}
            />
          ))}
        </div>
      ) : (
        <div className="list_wrapper">
          {list &&
            list?.length &&
            list?.map((item) => {
              return (
                <CategoryCard
                  key={item?.id}
                  {...item}
                  onClick={() => handleClick(item?._id)}
                  type={type}
                />
              );
            })}
          <div className="view__all" onClick={() => navigate(`/categories`)}>
            <div className="view__all__button">
              View All <br /> categories
            </div>
          </div>
        </div>
      )}
    </CategoryListStyle>
  );
};

export default CategoryList;
