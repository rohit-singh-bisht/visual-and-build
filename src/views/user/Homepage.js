import React from "react";
import Banner from "../../components/common/Banner";
import bannerImage from "../../assets/log-banner.jpg";
import CategoryList from "../../components/category/CategoryList";
import styled from "styled-components";
import ProductList from "../../components/product/ProductList";
import GroupBuy from "../../components/common/GroupBuy";
import FaqList from "../../components/common/FaqList";
import HomeBlogs from "../../components/blogs/HomeBlogs";
import IconWithTextList from "../../components/common/IconWithTextList";
import Footer from "../../layout/Footer";

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
`;

const Homepage = () => {
  return (
    <HompageStyle>
      <Banner
        title={"Create your dream home"}
        subtitle={"An advanced and easy-to-use 2D/3D <br /> home design tool. "}
        imageSrc={bannerImage}
        leftDistance={188}
        textDark={true}
        buttonTitle={"Get Started"}
      />

      <div className="container category_list">
        <CategoryList title={"Shop by Categories"} />
      </div>

      <Banner
        title={"Elevate Your Space"}
        subtitle={"Discover the Art of Interior"}
        imageSrc={bannerImage}
        leftDistance={108}
        buttonTitle={"Get Started"}
      />

      <div className="container product_list">
        <ProductList />
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
      <Footer />
    </HompageStyle>
  );
};

export default Homepage;
