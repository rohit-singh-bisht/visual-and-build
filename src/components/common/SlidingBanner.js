import React from "react";
import Slider from "react-slick";
import Banner from "./Banner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Skeleton } from "@mui/material";
import { useAppContext } from "../../context/useAppContext";

const SlidingBanner = ({
  bannerData,
  bannerSettings,
  dots = true,
  infinite = true,
  speed = 500,
  slidesToShow = 1,
  slidesToScroll = 1,
  leftdistance,
  arrows = false,
  loading,
}) => {
  var settings = bannerSettings || {
    dots,
    infinite,
    speed,
    slidesToShow,
    slidesToScroll,
    arrows,
  };
  const { isDesktop } = useAppContext();

  if (loading) {
    return (
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={isDesktop ? 375 : 250}
      />
    );
  }

  if (bannerData?.length > 1) {
    return (
      <Slider {...settings}>
        {bannerData?.map((item) => (
          <div>
            <Banner
              title={item?.heading}
              subtitle={item?.tagline}
              imageSrc={`${process.env.REACT_APP_MEDIA_ASSETS_URL}/${
                item.name || item?.image
              }`}
              leftdistance={leftdistance}
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
        leftdistance={leftdistance}
        textDark={true}
        buttonTitle={"Get Started"}
        buttonLink={bannerData?.[0]?.ctaUrl}
      />
    );
  }
};

export default SlidingBanner;
