import React from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";

const SearchStyle = styled.form`
  height: 39px;
  display: flex;
  position: relative;
  border-radius: 3px;
  overflow: clip;
  max-width: 400px;
  width: 100%;
  input {
    height: 39px;
    width: 100%;
    padding-left: 12px;
  }
  .search__button {
    width: 39px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #000;
    position: absolute;
    right: 0;
    .icon {
      display: block;
      color: #fff;
      font-size: 18px;
    }
  }
`;

const Search = () => {
  return (
    <SearchStyle>
      {/* category dropdown here */}
      <input type="search" placeholder="Search Products" />
      <button type="submit" className="search__button">
        <FiSearch className="icon" />
      </button>
    </SearchStyle>
  );
};

export default Search;
