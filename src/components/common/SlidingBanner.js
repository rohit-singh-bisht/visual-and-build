import React from "react";
import Slider from "react-slick";
import Banner from "./Banner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Skeleton } from "@mui/material";

const SlidingBanner = ({
  bannerData,
  bannerSettings,
  dots = true,
  infinite = true,
  speed = 500,
  slidesToShow = 1,
  slidesToScroll = 1,
  leftDistance,
  loading,
}) => {
  var settings = bannerSettings || {
    dots,
    infinite,
    speed,
    slidesToShow,
    slidesToScroll,
  };

  if (loading) {
    return <Skeleton variant="rectangular" width={"100%"} height={270} />;
  }

  if (bannerData?.length > 1) {
    return (
      <Slider {...settings}>
        {bannerData?.map((item) => (
          <div>
            <Banner
              title={item?.heading}
              subtitle={item?.tagline}
              imageSrc={item?.url}
              leftDistance={leftDistance}
              textDark={true}
              buttonTitle={"Get Started"}
              buttonLink={item?.ctaUrl}
            />
          </div>
        ))}
      </Slider>
    );
  } else {
    return (
      <Banner
        title={bannerData?.[0]?.heading}
        subtitle={bannerData?.[0]?.tagline}
        imageSrc={bannerData?.[0]?.url}
        leftDistance={leftDistance}
        textDark={true}
        buttonTitle={"Get Started"}
        buttonLink={bannerData?.[0]?.ctaUrl}
      />
    );
  }
};

export default SlidingBanner;
