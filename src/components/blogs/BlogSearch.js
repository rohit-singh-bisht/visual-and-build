import React, { useState } from "react";
import styled from "styled-components";
import { GoSearch } from "react-icons/go";
import useDebounce from "../../hooks/useDebounce";

const BlogSearchStyle = styled.form`
  border-radius: 18px;
  background: #ae0000;
  padding: 30px;
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
      top: 50%;
      transform: translateY(-50%);
      right: 15px;
    }
  }
`;

const BlogSearch = ({ title = "Blog Search", setValue }) => {
  const [searchValue, setSearchValue] = useState();
  useDebounce(
    () => {
      setValue(searchValue);
    },
    [searchValue],
    300
  );

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
        <GoSearch className="blog__search__icon" />
      </div>
    </BlogSearchStyle>
  );
};

export default BlogSearch;
