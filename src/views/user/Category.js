import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CategoryCard from "../../components/category/CategoryCard";
import ProductCard from "../../components/product/ProductCard";
import ProductList from "../../components/product/ProductList";
import Pagination from "@mui/material/Pagination";
import { useRequest } from "../../hooks/useRequest";
import { Skeleton } from "@mui/material";
import { useParams } from "react-router-dom";

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

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [
    fetchCategories,
    { isLoading: isFetchingCategories, state: category },
  ] = useRequest(`/category?limit=100&page=1`);
  const [fetchProducts, { state: products }] = useRequest();
  let { name } = useParams();
  const categoryList = name.split("/");
  const categoriesData = category?.data?.docs;

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const activeCategory = categoriesData?.find((item) => item?.name === name);
  }, [categoryList, categoriesData]);

  useEffect(() => {
    if (selectedCategory?.length) {
      const path = `/product?limit=16&page=${pageCount}&sortOrder=&categories[]=65c2a512b22e8c4ad75ae965&brands[]=65c2a73c0022cd80cbeaafea`;
      fetchProducts({ path });
    }
  }, [pageCount, selectedCategory]);

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
              />
            ))}
          </>
        )}
      </div>
      <section className="products__wrapper">
        <aside>
          <div className="products__filters"></div>
        </aside>
        <div className="products">
          <h2 className="title">Products</h2>
          <p className="subtitle">Showing 1 - 16 of 160 results.</p>
          <div className="products__grid">
            {Array.from({ length: 16 }, (_, index) => index + 1)?.map(
              (item) => (
                <ProductCard isLoading={true} />
              )
            )}
          </div>
          <div className="product__list__pagination">
            <Pagination className="pagination" count={10} shape="rounded" />
          </div>
        </div>
      </section>
      <div className="products__related">
        <ProductList listTitle="Group Buy Products" pagination={false} />
      </div>
    </CategoryStyle>
  );
};

export default Category;
