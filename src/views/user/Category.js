import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CategoryCard from "../../components/category/CategoryCard";
import ProductCard from "../../components/product/ProductCard";
import Pagination from "@mui/material/Pagination";
import { useRequest } from "../../hooks/useRequest";
import { Skeleton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import GroupBuyGrid from "../../components/common/GroupBuyGrid";
import Filters from "../../components/sortAndFilter/Filters";

const CategoryStyle = styled.div`
  .categories {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
    padding: 70px 0;
  }
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
  .products__related {
    padding: 50px 0;
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

const Category = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [fetchCategories, { isLoading: isFetchingCategories }] = useRequest();
  const [searchInput, setSearchInput] = useState({ type: "", value: "" });
  const [fetchBrands] = useRequest();
  const [fetchProducts, { isLoading: isFetchingProducts, state: products }] =
    useRequest();
  const [categoriesData, setCategoriesData] = useState([]);
  const [brandsData, setBrandsData] = useState([]);
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const [categoriesIdList, setCategoriesIdList] = useState();
  const [brandsIdList, setBrandsIdList] = useState();
  const searchParams = new URLSearchParams(search);

  useEffect(() => {
    (async function () {
      const categoryData = await fetchCategories({
        path: `/category?limit=100&page=1`,
      });
      const brandData = await fetchBrands({
        path: `/brand?limit=100&page=1`,
      });
      setCategoriesData(categoryData?.data?.docs);
      setBrandsData(brandData?.data?.docs);
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const categoryNames = params.getAll("categories[]");
    const brandNames = params.getAll("brands[]");
    // const categoriesIdList = getCategoriesId(categoriesData, categoryNames);
    // const brandsIdList = getCategoriesId(brandsData, brandNames);
    setCategoriesIdList(categoryNames);
    setBrandsIdList(brandNames);
  }, [search, categoriesData, brandsData]);

  const generateURL = (pageNumber, categories, brands) => {
    let url = `/product?limit=16&page=${pageNumber}`;
    categories.forEach((category) => {
      url += `&categories[]=${category}`;
    });
    brands?.forEach((brand) => {
      url += `&brands[]=${brand}`;
    });
    return url;
  };

  // function getCategoriesId(categoriesData, categoryNames) {
  //   return categoriesData
  //     ?.filter((category) => categoryNames.includes(category?.name))
  //     .map((category) => category?.id);
  // }

  useEffect(() => {
    if (categoriesIdList) {
      const path = generateURL(pageNumber, categoriesIdList, brandsIdList);
      fetchProducts({ path });
    }
    // eslint-disable-next-line
  }, [pageNumber, categoriesIdList, brandsIdList]);

  const handleCategoryClick = (item) => {
    if (!categoriesIdList?.includes(item?._id)) {
      searchParams.append("categories[]", item?._id);
      const newUrl = `${pathname}?${searchParams.toString()}`;
      navigate(newUrl);
    }
  };

  const handleProductClick = (item) => {
    let slug = item?.slug;
    if (slug.endsWith(".")) {
      slug = slug.slice(0, -1);
    }
    navigate(`/product/${slug}?id=${item?._id}`);
  };

  return (
    <CategoryStyle className="container">
      <div className="categories">
        {isFetchingCategories ? (
          <>
            {Array.from({ length: 4 }, (_, index) => index + 1)?.map((item) => (
              <Skeleton
                key={item}
                variant="rectangular"
                height={130}
                style={{ borderRadius: "7.5px" }}
              />
            ))}
          </>
        ) : (
          <>
            {categoriesData?.map((item) => (
              <CategoryCard
                key={item?.id}
                bannerUrl={item?.bannerUrl}
                name={item?.name}
                type={"text-in-image"}
                onClick={() => handleCategoryClick(item)}
              />
            ))}
          </>
        )}
      </div>
      {categoriesIdList?.length || brandsIdList?.length ? (
        <section className="products__wrapper">
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
          <div className="products">
            <h2 className="title">Products</h2>
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
                />
              </div>
            )}
          </div>
        </section>
      ) : (
        ""
      )}
      <div className="products__related">
        <GroupBuyGrid />
      </div>
    </CategoryStyle>
  );
};

export default Category;
