import React, { useState } from "react";
import styled from "styled-components";
import { IoChevronDownOutline } from "react-icons/io5";
import StyledMask from "./StyledMask";

const SortStyle = styled.div`
  .products__sorting {
    display: flex;
    gap: 16px;
    align-items: center;
  }
  .products__sorting__dropdown__wrapper {
    width: 200px;
    position: relative;
  }
  .product__current__sorting {
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    text-align: left;
    color: #ae0000;
    display: flex;
    justify-content: space-between;
    padding: 4px;
    .icon {
      &.reverse {
        transform: rotateX(180deg);
      }
    }
  }
  .products__sorting__dropdown {
    position: absolute;
    left: 0;
    width: 100%;
    top: calc(100% + 10px);
    border: 1px solid #d0d0d0;
    z-index: 7;
    border-radius: 8px;
    overflow: clip;
    .products__sorting__dropdown__option {
      padding: 8px 12px;
      background-color: #fff;
      border-bottom: 1px solid #d0d0d0;
      font-size: 12px;
      font-weight: 500;
      line-height: 18px;
    }
  }
  .subtitle {
    color: #303030;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
  }
`;

const Sort = ({
  sortingOptions,
  onSortClick,
  label,
  sortTitle = "Sort By",
}) => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  return (
    <SortStyle>
      <div className="products__sorting subtitle">
        {sortTitle && sortTitle}
        <div className="products__sorting__dropdown__wrapper">
          <div
            className="product__current__sorting"
            onClick={() => setIsDropdownActive((prev) => !prev)}
          >
            {label}
            <IoChevronDownOutline
              className={`icon ${isDropdownActive ? "reverse" : ""}`}
            />
          </div>
          {isDropdownActive && (
            <>
              <StyledMask
                onClick={() => {
                  setIsDropdownActive(false);
                }}
                zIndex={2}
              />
              <div className="products__sorting__dropdown">
                {sortingOptions?.length > 0 &&
                  sortingOptions?.map((item) => (
                    <div
                      className="products__sorting__dropdown__option"
                      onClick={() => onSortClick(item)}
                    >
                      {item?.label}
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    </SortStyle>
  );
};

export default Sort;
