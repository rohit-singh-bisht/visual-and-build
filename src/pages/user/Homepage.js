import React from "react";
import Banner from "../../components/Banner";
import bannerImage from "../../assets/log-banner.jpg";
import CategoryList from "../../components/homepage/CategoryList";
import styled from "styled-components";
import ProductList from "../../components/homepage/ProductList";

const HompageStyle = styled.div`
  .category_list {
    padding-top: 72px;
    padding-bottom: 100px;
  }
  .product_list {
    padding-top: 86px;
    padding-bottom: 86px;
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
    </HompageStyle>
  );
};

export default Homepage;
