import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProductList from "../../components/product/ProductList";
import { useAppContext } from "../../context/useAppContext";
import { useRequest } from "../../hooks/useRequest";
import CategoryList from "../../components/category/CategoryList";
import SlidingBanner from "../../components/common/SlidingBanner";
import { Skeleton } from "@mui/material";

const VendorStyle = styled.div`
  .vendor__logo {
    width: 185px;
    height: 185px;
    transform: translateY(-50%);
    border-radius: 14px;
    border: 0.75px solid #969696;
    background: #fff;
    overflow: clip;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .vendor__cover {
    height: 350px;
    img {
      object-fit: cover;
    }
  }
  .seller__categories {
    padding: 0 0 80px;
    .list_wrapper {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 40px;
    }
  }
  .products__list {
    padding: 60px 0;
  }
  @media (max-width: 768px) {
    .vendor__cover {
      margin-top: 0;
      height: 150px;
      img {
        object-fit: cover;
      }
    }
    .vendor__logo {
      width: 80px;
      height: 80px;
    }
    .seller__categories {
      .list_wrapper {
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
      }
    }
    .products__list {
      padding: 30px 0;
      .product__list__wrapper {
        padding-left: 0;
      }
    }
  }
`;

const Vendor = () => {
  const { sellerId } = useParams();
  const { isDesktop } = useAppContext();
  const [fetchSellerDetails, { isLoading: isFetchingSellerDetails }] =
    useRequest();
  const [sellerData, setSellerData] = useState();
  const {
    vendorCoverSrc = "/images/store-cover.jpg",
    shopLogo,
    vendorName,
    topBanner,
    sliderBanners,
  } = sellerData || {};
  const [
    fetchCategories,
    { isLoading: isFetchingCategories, state: category },
  ] = useRequest(`/category?limit=7&page=1`);

  useEffect(() => {
    const fetchSellerInfo = async (sellerId) => {
      const paths = [
        `/seller/${sellerId}/show`,
        `/seller/${sellerId}/products`,
      ];
      const results = await Promise.all(
        paths?.map((path) => fetchSellerDetails({ path }))
      );
      setSellerData(results[0]?.data);
    };
    fetchSellerInfo(sellerId);
  }, [sellerId]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <VendorStyle>
      <div className="vendor__cover">
        {isFetchingSellerDetails ? (
          <Skeleton width={"100%"} height={400} variant="rectangular" />
        ) : (
          <img
            className="w-100"
            src={process.env.REACT_APP_MEDIA_ASSETS_URL + "/" + topBanner}
            alt={vendorName}
          />
        )}
      </div>
      <div className="container">
        <div className="vendor__logo">
          <img
            className="w-100"
            src={process.env.REACT_APP_MEDIA_ASSETS_URL + "/" + shopLogo}
            alt={vendorName}
          />
        </div>
        <div className="seller__categories">
          <CategoryList
            title={"Shop by Categories"}
            list={category?.data?.docs}
            loading={isFetchingCategories}
            type={"text-in-image"}
          />
        </div>
      </div>
      <div>
        {sliderBanners?.length > 0 && (
          <SlidingBanner
            bannerData={sliderBanners}
            leftdistance={isDesktop ? 108 : 30}
            loading={isFetchingSellerDetails}
          />
        )}
      </div>
      <div className="container products__list">
        <ProductList apiPath={`/seller/${sellerId}/products`} />
      </div>
    </VendorStyle>
  );
};

export default Vendor;
