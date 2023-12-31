import React from "react";
import Banner from "../../components/Banner";
import bannerImage from "../../assets/log-banner.jpg";
import CategoryList from "../../components/homepage/CategoryList";
import styled from "styled-components";

const HompageStyle = styled.div`
  .category_list {
    padding-top: 97px;
    padding-bottom: 133px;
  }
`;

const Homepage = () => {
  return (
    <HompageStyle>
      <Banner
        title={"Create your dream home"}
        subtitle={"An advanced and easy-to-use 2D/3D <br /> home design tool. "}
        imageSrc={bannerImage}
        leftDistance={251}
        textDark={true}
        buttonTitle={"Get Started"}
      />

      <div className="category_list">
        <CategoryList title={"Shop by Categories"} />
      </div>
    </HompageStyle>
  );
};

export default Homepage;
