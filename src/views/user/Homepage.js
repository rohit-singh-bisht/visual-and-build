import React, { useEffect, useState } from "react";
import CategoryList from "../../components/category/CategoryList";
import styled from "styled-components";
import ProductList from "../../components/product/ProductList";
import FaqList from "../../components/common/FaqList";
import HomeBlogs from "../../components/blogs/HomeBlogs";
import IconWithTextList from "../../components/common/IconWithTextList";
import { useAppContext } from "../../context/useAppContext";
import { useRequest } from "../../hooks/useRequest";
import SlidingBanner from "../../components/common/SlidingBanner";
import GroupBuyList from "../../components/common/GroupBuyList";

const HompageStyle = styled.div`
  .category_list {
    padding-top: 72px;
    padding-bottom: 100px;
    .skeleton__flex {
      display: flex;
      gap: 12px;
      .skeleton {
        border-radius: 8px;
      }
    }
  }
  .product_list {
    padding: 86px 0;
    &:empty {
      display: none;
    }
  }
  .blogs {
    padding: 60px 0;
  }

  @media (max-width: 768px) {
    .category_list {
      padding: 60px 20px 30px;
    }
    .product_list {
      padding: 30px 0;
    }
    .blogs {
      padding: 30px 0 40px;
    }
  }
`;

const Homepage = () => {
  const { isDesktop, categoriesData } = useAppContext();
  const [fetchBanner, { isLoading: isFetchingBanner }] = useRequest();
  const [
    fetchGroupBuy,
    { isLoading: isFetchingGroupBuy, state: groupBuyState },
  ] = useRequest(`/product/groupby?limit=3&page=1`);
  const [
    fetchSlidingBanner,
    { isLoading: isFetchingSlidingBanner, state: slidingBanners },
  ] = useRequest(`/slider?limit=10&page=1`);
  const [topBanner, setTopBanner] = useState();
  const [midBanner, setMidBanner] = useState();
  const [bottomBanner, setBottomBanner] = useState();

  const getBanner = async (position) => {
    const path = `/banner?limit=10&page=1&sequence=${position}&location=home`;
    const response = await fetchBanner({ path });
    return response;
  };

  useEffect(() => {
    const fetchAllBanners = async () => {
      const positions = ["top", "mid", "bottom"];
      const results = await Promise.all(
        positions?.map((item) => getBanner(item))
      );
      setTopBanner(results?.[0]?.data?.docs);
      setMidBanner(results?.[1]?.data?.docs);
      setBottomBanner(results?.[2]?.data?.docs);
    };
    fetchSlidingBanner();
    fetchAllBanners();
    fetchGroupBuy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HompageStyle>
      <SlidingBanner
        bannerData={slidingBanners?.data?.docs}
        leftdistance={isDesktop ? 188 : 30}
        loading={isFetchingSlidingBanner || !slidingBanners?.data?.docs}
      />

      <div className="container category_list">
        <CategoryList
          title={"Shop by Categories"}
          list={categoriesData?.data?.docs}
          loading={!categoriesData?.data?.docs?.length}
        />
      </div>

      {topBanner?.length > 0 && (
        <SlidingBanner
          bannerData={topBanner}
          leftdistance={isDesktop ? 108 : 30}
          loading={isFetchingBanner}
        />
      )}

      <div className="container product_list">
        <ProductList
          listTitle={"Interior"}
          buttonArrow={false}
          apiPath={`/featured-category-products/top`}
        />
      </div>

      {midBanner?.length > 0 && (
        <SlidingBanner
          bannerData={midBanner}
          leftdistance={isDesktop ? 108 : 30}
          loading={isFetchingBanner}
        />
      )}

      <div className="container product_list">
        <ProductList
          listTitle={"Exterior"}
          buttonArrow={false}
          apiPath={`/featured-category-products/middle`}
        />
      </div>

      <GroupBuyList
        groupBuyList={groupBuyState?.data?.docs}
        isLoading={isFetchingGroupBuy}
      />

      {bottomBanner?.length > 0 && (
        <SlidingBanner
          bannerData={bottomBanner}
          leftdistance={isDesktop ? 108 : 30}
          loading={isFetchingBanner}
        />
      )}

      <FaqList />
      <div className="container blogs">
        <HomeBlogs />
      </div>
      <IconWithTextList />
    </HompageStyle>
  );
};

export default Homepage;
