import React, { useEffect } from "react";
import Banner from "../../components/common/Banner";
import CategoryList from "../../components/category/CategoryList";
import styled from "styled-components";
import ProductList from "../../components/product/ProductList";
import GroupBuy from "../../components/common/GroupBuy";
import FaqList from "../../components/common/FaqList";
import HomeBlogs from "../../components/blogs/HomeBlogs";
import IconWithTextList from "../../components/common/IconWithTextList";
import categoryDummy from "../../assets/category-dummy.jpg";
import { useAppContext } from "../../context/useAppContext";
import { useRequest } from "../../hooks/useRequest";
import SlidingBanner from "../../components/common/SlidingBanner";

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
  const [fetchBanner, { isLoading: isFetchingBanner, state: bannerState }] =
    useRequest(`/banner?limit=10&page=1&sequence=top&location=home`);

  const list = [
    {
      src: categoryDummy,
      title: "Bathroom, Kitchen & Storage",
    },
    {
      src: categoryDummy,
      title: "Bathroom, Kitchen & Storage",
    },
    {
      src: categoryDummy,
      title: "Bathroom, Kitchen & Storage",
    },
    {
      src: categoryDummy,
      title: "Bathroom, Kitchen & Storage",
    },
  ];

  useEffect(() => {
    fetchBanner();
  }, []);

  return (
    <HompageStyle>
      <SlidingBanner
        bannerData={bannerState?.data?.docs}
        leftDistance={isDesktop ? 188 : 30}
        loading={isFetchingBanner}
      />

      <div className="container category_list">
        <CategoryList title={"Shop by Categories"} list={list} />
      </div>

      <Banner
        title={"Elevate Your Space"}
        subtitle={"Discover the Art of Interior"}
        imageSrc={"images/log-banner.jpg"}
        leftDistance={isDesktop ? 108 : 30}
        buttonTitle={"Get Started"}
      />

      <div className="container product_list">
        <ProductList
          listTitle={"Interior"}
          buttonArrow={false}
          buttonText={"See all"}
        />
      </div>
      <div className="container group_buy">
        <GroupBuy isLoading={true} />
      </div>
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
