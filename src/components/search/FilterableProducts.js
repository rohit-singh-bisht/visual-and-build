import React, { useState, useEffect } from "react";
import Filters from "../sortAndFilter/Filters";
import ProductCard from "../product/ProductCard";
import Pagination from "@mui/material/Pagination";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/useAppContext";
import { useRequest } from "../../hooks/useRequest";
import { IoChevronDownOutline } from "react-icons/io5";
import StyledMask from "../common/StyledMask";

const FilterableProductsStyle = styled.div`
  .products__wrapper {
    padding-bottom: 60px;
    display: flex;
    gap: 38px;
    aside {
      width: 290px;
      .products__filters {
        border-radius: 11.25px;
        border: 0.75px solid #d9d9d9;
        background: #fcfcfc;
        min-height: 600px;
      }
    }
    .products {
      flex: 1;
      .title {
        color: #303030;
        font-size: 27px;
        font-weight: 600;
        line-height: 34.5px;
        margin-bottom: 15px;
      }
      .products__sorting__wrapper {
        display: flex;
        justify-content: space-between;
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
      }
      .subtitle {
        color: #303030;
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
      }
      .products__grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 7.5px;
        margin-top: 48px;
      }
      .product__list__pagination {
        margin-top: 35px;
        display: flex;
        justify-content: center;
      }
    }
  }
  @media (max-width: 768px) {
    .products__wrapper {
      padding-top: 20px;
      padding-bottom: 20px;
      .products {
        .title {
          margin-bottom: 20px;
        }
        .products__sorting__wrapper {
          flex-wrap: wrap;
          gap: 8px;
        }
      }
    }
  }
`;

const ProductsNotFound = styled.div`
  text-align: center;
  padding: 50px 0;
  .sad__emoji {
    font-size: 100px;
  }
  .not__found {
    font-size: 24px;
    font-weight: 500;
  }
`;

const sortingOptions = [
  {
    label: "Newest first",
    value: "newestFirst",
  },
  {
    label: "Price (low to high)",
    value: "price",
    sortOrder: "asc",
  },
  {
    label: "Price (high to low)",
    value: "price",
    sortOrder: "desc",
  },
  {
    label: "Name (A - Z)",
    value: "name",
    sortOrder: "asc",
  },
  {
    label: "Name (Z - A)",
    value: "name",
    sortOrder: "desc",
  },
  {
    label: "Date (Ascending)",
    value: "date",
    sortOrder: "asc",
  },
  {
    label: "Date (Descending)",
    value: "date",
    sortOrder: "desc",
  },
];

const FilterableProducts = ({
  categoriesData,
  brandsData,
  title = "Products",
  apiPath = "/product",
  setCategoriesList,
}) => {
  const [searchInput, setSearchInput] = useState({ type: "", value: "" });
  const [fetchProducts, { isLoading: isFetchingProducts, state: products }] =
    useRequest();
  const navigate = useNavigate();
  const { isDesktop } = useAppContext();
  const [categoriesIdList, setCategoriesIdList] = useState();
  const [brandsIdList, setBrandsIdList] = useState();
  const { search } = useLocation();
  const [pageNumber, setPageNumber] = useState(1);
  const [sortBy, setSortBy] = useState(sortingOptions[0]?.value);
  const [sortOrder, setSortOrder] = useState("");
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [sortLabel, setSortLabel] = useState(sortingOptions[0]?.label);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const categoryNames = params.getAll("categories[]");
    const brandNames = params.getAll("brands[]");
    setCategoriesIdList(categoryNames);
    setBrandsIdList(brandNames);
    setCategoriesList && setCategoriesList(categoryNames);
  }, [search, categoriesData, brandsData]);

  const generateURL = (pageNumber, categories, brands, sortBy, sortOrder) => {
    let url = `${apiPath}?limit=16&page=${pageNumber}`;
    categories.forEach((category) => {
      url += `&categories[]=${category}`;
    });
    brands?.forEach((brand) => {
      url += `&brands[]=${brand}`;
    });
    if (sortBy && sortOrder && sortBy !== "newestFirst") {
      url += `&sortBy=${sortBy}&sortOrder=${sortOrder}`;
    }
    return url;
  };

  useEffect(() => {
    if (categoriesIdList) {
      const path = generateURL(
        pageNumber,
        categoriesIdList,
        brandsIdList,
        sortBy,
        sortOrder
      );
      fetchProducts({ path });
    }
    // eslint-disable-next-line
  }, [pageNumber, categoriesIdList, brandsIdList, sortBy, sortOrder]);

  const handleProductClick = (item) => {
    let slug = item?.slug;
    if (slug.endsWith(".")) {
      slug = slug.slice(0, -1);
    }
    navigate(`/product/${slug}?id=${item?._id}`);
  };

  const handlePaginationChange = (e, value) => {
    setPageNumber(value);
  };

  const handleSortClick = (item) => {
    setIsDropdownActive(false);
    if (item?.value === sortBy) {
      return;
    }
    setSortBy(item?.value);
    setSortOrder(item?.sortOrder);
    setSortLabel(item?.label);
  };

  return (
    <FilterableProductsStyle>
      <section className="products__wrapper">
        {isDesktop && (
          <aside>
            <div className="products__filters">
              <Filters
                categoriesData={categoriesData}
                brandsData={brandsData}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
              />
            </div>
          </aside>
        )}
        <div className="products">
          <h2 className="title">{title}</h2>
          <div className="products__sorting__wrapper">
            <p className="subtitle">
              Showing 1 - {products?.data?.docs?.length || 0} of{" "}
              {products?.data?.totalDocs || 0} results.
            </p>
            <div
              className="products__sorting subtitle"
              onClick={() => setIsDropdownActive((prev) => !prev)}
            >
              Sort by
              <div className="products__sorting__dropdown__wrapper">
                <div className="product__current__sorting">
                  {sortLabel}
                  <IoChevronDownOutline
                    className={`icon ${isDropdownActive ? "reverse" : ""}`}
                  />
                </div>
                {isDropdownActive && (
                  <>
                    <StyledMask
                      onClick={() => setIsDropdownActive(false)}
                      zIndex={2}
                    />
                    <div className="products__sorting__dropdown">
                      {sortingOptions?.map((item) => (
                        <div
                          className="products__sorting__dropdown__option"
                          onClick={() => handleSortClick(item)}
                        >
                          {item?.label}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="products__grid">
            {products?.data?.docs?.map((product) => (
              <ProductCard
                key={product?.id}
                isLoading={isFetchingProducts}
                productTitle={product?.name}
                productImage={`${process.env.REACT_APP_MEDIA_ASSETS_URL}/${product.image}`}
                onClick={() => handleProductClick(product)}
                ratingCount={product?.numReviews}
                avgRating={product?.avgRating}
                productDiscountedPrice={(
                  product?.price - product?.discount
                ).toFixed(2)}
                productPrice={product?.price?.toFixed(2)}
              />
            ))}
            {isFetchingProducts &&
              Array.from({ length: 12 }, (_, index) => index + 1)?.map(
                (item) => <ProductCard key={item} isLoading={true} />
              )}
          </div>
          {!isFetchingProducts && products?.data?.docs?.length <= 0 && (
            <ProductsNotFound>
              <span className="sad__emoji">😞</span>
              <h2 className="not__found">No Products Found!</h2>
            </ProductsNotFound>
          )}
          {!isFetchingProducts && products?.data?.docs?.length > 0 && (
            <div className="product__list__pagination">
              <Pagination
                className="pagination"
                count={products?.data?.totalPages}
                shape="rounded"
                onChange={handlePaginationChange}
              />
            </div>
          )}
        </div>
      </section>
    </FilterableProductsStyle>
  );
};

export default FilterableProducts;
