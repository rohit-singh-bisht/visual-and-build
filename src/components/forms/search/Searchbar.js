import React, { useState } from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { useRequest } from "../../../hooks/useRequest";
import { useNavigate } from "react-router-dom";
import StyledMask from "../../common/StyledMask";

const SearchbarStyle = styled.form`
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

const SearchbarStyleWrapper = styled.div`
  position: relative;
  max-width: 400px;
  width: 100%;
  z-index: 9;
  .search__results {
    max-height: 200px;
    overflow: scroll;
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    width: 100%;
    background-color: #fff;
    border: 0.75px solid #d2d1d1;
    border-radius: 4px;
    z-index: 5;
    .search__item {
      border: 0.75px solid #d2d1d1;
      padding: 12px;
      text-transform: capitalize;
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      text-align: left;
      cursor: pointer;
      &:hover {
        background: #ffeeee;
      }
    }
  }
`;

const Searchbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [fetchSearchResult] = useRequest();
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchValue) {
      return "";
    }
    const path = `/product/search?limit=20&page=1&search=${searchValue}`;
    const response = await fetchSearchResult({ path });
    setSearchResults(response?.data?.docs);
  };

  return (
    <SearchbarStyleWrapper>
      <SearchbarStyle>
        {/* category dropdown here */}
        <input
          type="search"
          placeholder="Search Products"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit" className="search__button" onClick={handleSubmit}>
          <FiSearch className="icon" />
        </button>
      </SearchbarStyle>
      {searchValue && searchResults?.length > 0 && (
        <>
          <div className="search__results">
            {searchResults?.map((item) => (
              <div
                className="search__item"
                onClick={() => {
                  setSearchValue("");
                  setSearchResults([]);
                  navigate(`/product/${item?.slug}?id=${item?._id}`);
                }}
              >
                {item?.name}
              </div>
            ))}
          </div>
          <StyledMask
            onClick={() => {
              setSearchValue("");
              setSearchResults([]);
            }}
          />
        </>
      )}
    </SearchbarStyleWrapper>
  );
};

export default Searchbar;
