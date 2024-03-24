import React, { useState } from "react";
import Filters from "../sortAndFilter/Filters";
import ProductCard from "../product/ProductCard";
import Pagination from "@mui/material/Pagination";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/useAppContext";

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
        height: 600px;
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

const FilterableProducts = ({
  products,
  isFetchingProducts,
  categoriesData,
  brandsData,
  title = "Products",
  handlePaginationChange,
}) => {
  const [searchInput, setSearchInput] = useState({ type: "", value: "" });
  const navigate = useNavigate();
  const { isDesktop } = useAppContext();

  const handleProductClick = (item) => {
    let slug = item?.slug;
    if (slug.endsWith(".")) {
      slug = slug.slice(0, -1);
    }
    navigate(`/product/${slug}?id=${item?._id}`);
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
          <p className="subtitle">
            Showing 1 - {products?.data?.docs?.length || 0} of{" "}
            {products?.data?.totalDocs || 0} results.
          </p>
          <div className="products__grid">
            {products?.data?.docs?.map((product) => (
              <ProductCard
                key={product?.id}
                isLoading={isFetchingProducts}
                productTitle={product?.name}
                productDiscountedPrice={product?.price}
                productImage={`${process.env.REACT_APP_MEDIA_ASSETS_URL}/${product.image}`}
                onClick={() => handleProductClick(product)}
                ratingCount={product?.numReviews}
                avgRating={product?.avgRating}
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
