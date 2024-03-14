import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import { useRequest } from "../../hooks/useRequest";

const FilterStyle = styled.div`
  .filter__wrapper {
    padding: 27px;
  }
  .search__input {
    background-color: #fff;
    width: 100%;
    height: 36px;
    border: 0.75px solid #d9d9d9;
    display: block;
    border-radius: 4px;
    padding: 4px 8px;
    &::placeholder {
      color: #b1b1b1;
      font-size: 12px;
    }
  }
  .filter__title {
    font-size: 15px;
    font-weight: 700;
    line-height: 24px;
    margin-bottom: 14px;
  }
  .input__dropdown__wrapper {
    position: relative;
    .dropdown {
      border-radius: 4px;
      border: 0.75px solid #d9d9d9;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background-color: #fff;
      z-index: 9;
      height: 150px;
      overflow: auto;
      box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.1);
      .filter__group {
        border: 0.75px solid #d9d9d9;
        margin: 0;
        padding: 10px;
        border-radius: 0px;
      }
      .not__found {
        label {
          font-size: 14px;
          text-align: center;
          padding: 12px;
          display: block;
        }
      }
    }
  }
  .filter__group {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 10px 0;
    input {
      &:selected {
        + label {
          font-weight: 700;
        }
      }
    }
    label {
      font-size: 12px;
      font-weight: 400;
      line-height: 18px;
      text-transform: capitalize;
      cursor: pointer;
      flex: 1;
    }
    .checkbox {
      accent-color: #ae0000;
    }
  }
`;

const Filters = ({
  categoriesData,
  brandsData,
  searchInput,
  setSearchInput,
}) => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const categoryNames = params.getAll("categories[]");
  const brandNames = params.getAll("brands[]");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [fetchSearch] = useRequest();

  useDebounce(
    async () => {
      if (searchInput?.type && searchInput?.value) {
        let endpoint = "";
        let setterFunction = null;

        if (searchInput.type === "category") {
          endpoint = `/category?limit=10&page=1&search=${searchInput.value}`;
          setterFunction = setCategories;
        } else if (searchInput.type === "brand") {
          endpoint = `/brand?limit=10&page=1&search=${searchInput.value}`;
          setterFunction = setBrands;
        }

        if (endpoint && setterFunction) {
          const response = await fetchSearch({ path: endpoint });
          setterFunction(response?.data?.docs);
        }
      }
    },
    [searchInput],
    300
  );

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    const searchParams = new URLSearchParams(search);
    if (name === "categories") {
      if (checked) {
        searchParams.append("categories[]", value);
      } else {
        searchParams.delete("categories[]");
        categoryNames
          .filter((name) => name !== value)
          .forEach((item) => searchParams.append("categories[]", item));
      }
    } else if (name === "brands") {
      if (checked) {
        searchParams.append("brands[]", value);
      } else {
        searchParams.delete("brands[]");
        brandNames
          .filter((name) => name !== value)
          .forEach((item) => searchParams.append("brands[]", item));
      }
    }
    const newUrl = `${pathname}?${searchParams.toString()}`;
    navigate(newUrl);
  };

  const handleMaskClick = (value) => {
    setSearchInput((prev) => ({ ...prev, value: "" }));
    if (value === "brands") {
      setBrands([]);
    }
    if (value === "category") {
      setCategories([]);
    }
  };

  return (
    <FilterStyle>
      <div className="filter__wrapper">
        <h3 className="filter__title">Categories</h3>
        <div className="input__dropdown__wrapper">
          <input
            type="search"
            className="search__input"
            placeholder="Search categories"
            value={searchInput?.type === "category" ? searchInput?.value : ""}
            onChange={(e) =>
              setSearchInput({
                type: "category",
                value: e?.target?.value,
              })
            }
          />
          {searchInput?.type === "category" &&
            searchInput?.value &&
            categories?.length > 0 && (
              <>
                <div
                  style={{ position: "fixed", inset: 0 }}
                  onClick={() => handleMaskClick("category")}
                />
                <div className="dropdown">
                  {categories?.length > 0 ? (
                    categories?.map((item) => (
                      <div className="filter__group">
                        <input
                          type="checkbox"
                          name="categories"
                          className="checkbox"
                          id={`category${item?._id}`}
                          value={item?._id}
                          checked={categoryNames?.includes(item?._id)}
                          onChange={handleChange}
                        />
                        <label htmlFor={`category${item?._id}`}>
                          {item?.name}
                        </label>
                      </div>
                    ))
                  ) : (
                    <div className="not__found">
                      <label>No category found.</label>
                    </div>
                  )}
                </div>
              </>
            )}
        </div>

        {categoriesData?.map((item) => (
          <div className="filter__group">
            <input
              type="checkbox"
              name="categories"
              className="checkbox"
              id={`category${item?._id}`}
              value={item?._id}
              checked={categoryNames?.includes(item?._id)}
              onChange={handleChange}
            />
            <label htmlFor={`category${item?._id}`}>{item?.name}</label>
          </div>
        ))}
      </div>
      <hr
        style={{
          border: 0,
          borderBottom: "0.75px solid rgb(48 48 48 / 25%)",
          margin: "0 27px",
        }}
      />
      <div className="filter__wrapper">
        <h3 className="filter__title">Brands</h3>
        <div className="input__dropdown__wrapper">
          <input
            type="search"
            className="search__input"
            placeholder="Search brands"
            value={searchInput?.type === "brand" ? searchInput?.value : ""}
            onChange={(e) => {
              setSearchInput({
                type: "brand",
                value: e?.target?.value,
              });
            }}
          />
          {searchInput?.type === "brand" &&
            searchInput?.value &&
            brands?.length > 0 && (
              <>
                <div
                  style={{ position: "fixed", inset: 0 }}
                  onClick={() => handleMaskClick("brands")}
                />
                <div className="dropdown">
                  {brands?.length > 0 ? (
                    brands?.map((item) => (
                      <div className="filter__group">
                        <input
                          type="checkbox"
                          name="brands"
                          className="checkbox"
                          id={`brand${item?._id}`}
                          value={item?._id}
                          checked={brandNames?.includes(item?._id)}
                          onChange={handleChange}
                        />
                        <label htmlFor={`category${item?._id}`}>
                          {item?.name}
                        </label>
                      </div>
                    ))
                  ) : (
                    <div className="not__found">
                      <label>No category found.</label>
                    </div>
                  )}
                </div>
              </>
            )}
        </div>
        {brandsData?.map((item) => (
          <div className="filter__group">
            <input
              type="checkbox"
              name="brands"
              className="checkbox"
              value={item?._id}
              id={`brand${item?._id}`}
              checked={brandNames?.includes(item?._id)}
              onChange={handleChange}
            />
            <label htmlFor={`brand${item?._id}`}>{item?.name}</label>
          </div>
        ))}
      </div>
    </FilterStyle>
  );
};

export default Filters;
