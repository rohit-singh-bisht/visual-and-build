import React, { useState } from "react";
import styled from "styled-components";
import { GoSearch } from "react-icons/go";
import { useRequest } from "../../hooks/useRequest";
import { useNavigate } from "react-router-dom";

const BlogSearchStyle = styled.form`
  border-radius: 18px;
  background: #ae0000;
  padding: 30px;
  position: relative;
  .blog__search__title {
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    line-height: 22.5px;
    margin-bottom: 18px;
  }
  .blog__search__wrapper {
    position: relative;
    .blog__search__input {
      width: 100%;
      height: 42px;
      padding: 15px;
      border-radius: 7.5px;
      background: #fff;
      color: #303030;
      font-size: 12px;
      font-weight: 400;
      line-height: 15px;
    }
    .blog__search__icon {
      font-size: 12px;
      color: #303030;
      position: absolute;
      top: 0;
      right: 0;
      padding: 0 15px;
      height: 42px;
      cursor: pointer;
      display: flex;
      align-items: center;
      svg {
        font-size: 16px;
      }
    }
  }
  .dropdown {
    border-radius: 8px;
    border: 0.75px solid #d9d9d9;
    position: absolute;
    top: 120px;
    width: calc(100% - 60px);
    left: 30px;
    background-color: #fff;
    z-index: 9;
    height: 150px;
    overflow: auto;
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.1);
    .dropdown__item {
      border: 0.75px solid #d9d9d9;
      padding: 10px;
      font-size: 12px;
      font-weight: 400;
      line-height: 18px;
      text-transform: capitalize;
      cursor: pointer;
      &:hover {
        color: #ae0000;
      }
    }
  }
`;

const BlogSearch = ({ title = "Blog Search" }) => {
  const [searchValue, setSearchValue] = useState();
  const [fetchBlogs] = useRequest();
  const [blogs, setBlogs] = useState();
  const navigate = useNavigate();

  const searchBlogs = async (search) => {
    const path = `/blog?limit=5&page=1&search=${search}`;
    const response = await fetchBlogs({ path });
    if (response.success) {
      setBlogs(response.data.docs);
    }
  };

  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <BlogSearchStyle>
      <h3 className="blog__search__title">{title}</h3>
      <div className="blog__search__wrapper">
        <input
          type="text"
          className="blog__search__input"
          placeholder={"Search Article ..."}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div
          className="blog__search__icon"
          onClick={() => searchBlogs(searchValue)}
        >
          <GoSearch />
        </div>
      </div>
      {searchValue && blogs?.length && (
        <div className="dropdown">
          {blogs?.map((item) => (
            <div
              className="dropdown__item"
              onClick={() => handleBlogClick(item?.id)}
              key={item?.id}
            >
              {item?.title}
            </div>
          ))}
        </div>
      )}
    </BlogSearchStyle>
  );
};

export default BlogSearch;
