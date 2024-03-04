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
  }
  .product_list {
    padding: 86px 0;
  }
  .blogs {
    padding: 60px 0;
  }
  .icon_with_text {
    padding: 60px 0;
    border-top: 1px solid rgba(48, 48, 48, 0.25);
  }

  @media (max-width: 768px) {
    .category_list {
      padding: 35px 20px 40px;
    }
    .product_list {
      padding: 30px 0;
    }
    .icon_with_text {
      padding: 30px 0 40px;
    }
    .blogs {
      padding: 30px 0 40px;
    }
  }
`;

const Homepage = () => {
  const { isDesktop } = useAppContext();
  const [fetchBanner, { isLoading: isFetchingBanner }] = useRequest();
  const [fetchCategories, { state: category }] = useRequest(
    `/category?limit=5&page=1`
  );
  const [
    fetchGroupBuy,
    { isLoading: isFetchingGroupBuy, state: groupBuyState },
  ] = useRequest(`/product/groupby?limit=3&page=1`);
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
    fetchAllBanners();
    fetchCategories();
    fetchGroupBuy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HompageStyle>
      {topBanner?.length > 0 && (
        <SlidingBanner
          bannerData={topBanner}
          leftdistance={isDesktop ? 188 : 30}
          loading={isFetchingBanner}
        />
      )}

      <div className="container category_list">
        <CategoryList
          title={"Shop by Categories"}
          list={category?.data?.docs}
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
          listTitle={"Interior"}
          buttonArrow={false}
          buttonText={"See all"}
        />
      </div>

      <SlidingBanner
        bannerData={bottomBanner}
        leftdistance={isDesktop ? 108 : 30}
        loading={isFetchingBanner}
      />

      <div className="container product_list">
        <ProductList
          listTitle={"Exterior"}
          buttonArrow={false}
          buttonText={"See all"}
        />
      </div>

      <GroupBuyList
        groupBuyList={groupBuyState?.data?.docs}
        isLoading={isFetchingGroupBuy}
      />
      <FaqList />
      <div className="container blogs">
        <HomeBlogs />
      </div>
      <div className="icon_with_text">
        <div className="container">
          <IconWithTextList />
        </div>
      </div>
    </HompageStyle>
  );
};

export default Homepage;
