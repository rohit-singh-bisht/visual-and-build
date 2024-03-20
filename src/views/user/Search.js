import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CategoryCard from "../../components/category/CategoryCard";
import { useRequest } from "../../hooks/useRequest";
import { Skeleton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import GroupBuyGrid from "../../components/common/GroupBuyGrid";
import FilterableProducts from "../../components/search/FilterableProducts";

const CategoryStyle = styled.div`
  .categories {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
    padding: 70px 0;
  }
  .products__related {
    padding: 50px 0;
  }
`;

const Search = ({
  showCategory = true,
  showProducts = true,
  showRelated = true,
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [categoriesData, setCategoriesData] = useState([]);
  const [brandsData, setBrandsData] = useState([]);
  const [fetchCategories, { isLoading: isFetchingCategories }] = useRequest();
  const [fetchBrands] = useRequest();
  const [fetchProducts, { isLoading: isFetchingProducts, state: products }] =
    useRequest();
  const { search } = useLocation();
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
      const newUrl = `/search/?${searchParams.toString()}`;
      navigate(newUrl);
    }
  };

  const handlePaginationChange = (e, value) => {
    setPageNumber(value);
  };

  return (
    <CategoryStyle className="container">
      {showCategory && (
        <div className="categories">
          {isFetchingCategories ? (
            <>
              {Array.from({ length: 4 }, (_, index) => index + 1)?.map(
                (item) => (
                  <Skeleton
                    key={item}
                    variant="rectangular"
                    height={130}
                    style={{ borderRadius: "7.5px" }}
                  />
                )
              )}
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
      )}
      {showProducts && (
        <FilterableProducts
          products={products}
          isFetchingProducts={isFetchingProducts}
          categoriesData={categoriesData}
          brandsData={brandsData}
          handlePaginationChange={handlePaginationChange}
        />
      )}
      {showRelated && (
        <div className="products__related">
          <GroupBuyGrid />
        </div>
      )}
    </CategoryStyle>
  );
};

export default Search;