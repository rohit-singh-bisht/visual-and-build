import React, { useCallback, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styled from "styled-components";
import Pagination from "@mui/material/Pagination";
import { ReactComponent as ArrowIcon } from "../../assets/arrow.svg";
import { useAppContext } from "../../context/useAppContext";
import { useRequest } from "../../hooks/useRequest";
import { useNavigate } from "react-router-dom";

const ProductListStyle = styled.div`
  .product__list__title__wrapper {
    margin-bottom: 46.75px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .product__list__title {
      color: #303030;
      font-size: 27px;
      font-weight: 600;
      line-height: 34.5px;
    }
    .product__list__button {
      color: #ae0000;
      font-size: 16.5px;
      font-weight: 600;
      background: none;
      display: flex;
      gap: 12px;
      align-items: center;
    }
  }
  .product__list__wrapper {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 18px;
  }
  .product__list__pagination {
    margin-top: 44.25px;
    display: flex;
    justify-content: center;
  }
  @media (max-width: 768px) {
    .product__list__title__wrapper {
      padding: 0 20px;
      margin-bottom: 15px;
      .product__list__title {
        font-size: 20px;
      }
      .product__list__button {
        font-size: 12px;
      }
    }
    .product__list__wrapper {
      padding: 0 20px;
      overflow: auto;
      gap: 10px;
      display: flex;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;

const ProductList = ({
  listTitle,
  buttonText,
  buttonArrow = false,
  handleButtonClick,
  pagination = true,
  productList,
  isLoading,
  apiPath,
}) => {
  const { isDesktop } = useAppContext();
  const [products, setProducts] = useState(productList);
  const [fetchProducts, { isLoading: fetchingProducts }] = useRequest();
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState();

  const getProducts = async (limit, pageNumber) => {
    const path = apiPath + `?limit=${limit}&page=${pageNumber}`;
    const response = await fetchProducts({ path });
    if (response.success) {
      setTotalPages(response?.data?.totalPages);
      setProducts(response?.data?.docs || response?.data);
    }
  };

  useEffect(() => {
    apiPath && !productList && getProducts(5, pageNumber);

    // eslint-disable-next-line
  }, [apiPath, pageNumber]);

  const handlePaginationChange = (e, value) => {
    setPageNumber(value);
  };

  const handleProductClick = useCallback((product) => {
    let slug = product?.slug;
    if (slug.endsWith(".")) {
      slug = slug.slice(0, -1);
    }
    navigate(`/product/${slug}?id=${product?._id}`);
  }, []);

  if (!products?.length) {
    return "";
  }

  return (
    <ProductListStyle>
      {listTitle && (
        <div className="product__list__title__wrapper">
          <p className="product__list__title">{listTitle}</p>
          {buttonText && (
            <button
              className="product__list__button"
              onClick={handleButtonClick}
            >
              {buttonText}
              {buttonArrow && <ArrowIcon className="icon" />}
            </button>
          )}
        </div>
      )}
      <div className="product__list__wrapper">
        {fetchingProducts || isLoading || !products?.length ? (
          <>
            {Array.from({ length: 5 }, (_, index) => index + 1)?.map((item) => (
              <ProductCard
                key={item}
                isLoading={isLoading || fetchingProducts}
              />
            ))}
          </>
        ) : (
          <>
            {products?.map((product) => (
              <ProductCard
                key={product?.id}
                productImage={`${process.env.REACT_APP_MEDIA_ASSETS_URL}/${product.image}`}
                productTitle={product?.name}
                productDiscountedPrice={product?.price}
                ratingCount={product?.numReviews}
                avgRating={product?.avgRating}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </>
        )}
      </div>
      {pagination && isDesktop && (
        <div className="product__list__pagination">
          <Pagination
            className="pagination"
            count={totalPages}
            shape="rounded"
            onChange={handlePaginationChange}
          />
        </div>
      )}
    </ProductListStyle>
  );
};

export default ProductList;
