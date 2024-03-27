import React, { useState, useEffect } from "react";
import FilterableProducts from "../../components/search/FilterableProducts";
import { useRequest } from "../../hooks/useRequest";
import styled from "styled-components";

const GroupBuyStyle = styled.div`
  padding: 60px 0;
`;

const GroupBuy = () => {
  const [fetchCategories] = useRequest();
  const [fetchBrands] = useRequest();
  const [categoriesData, setCategoriesData] = useState([]);
  const [brandsData, setBrandsData] = useState([]);

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

  return (
    <GroupBuyStyle>
      <div className="container">
        <FilterableProducts
          categoriesData={categoriesData}
          brandsData={brandsData}
          apiPath="/product/groupby"
          title="Group Buy Products"
        />
      </div>
    </GroupBuyStyle>
  );
};

export default GroupBuy;
