import React from "react";
// import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProductList from "../../components/product/ProductList";
import CategoryCard from "../../components/category/CategoryCard";
import categoryDummy from "../../assets/category-dummy.jpg";
import { useAppContext } from "../../context/useAppContext";

const VendorStyle = styled.div`
  .vendor__cover {
    margin-top: 60px;
  }
  .vendor__logo {
    width: 185px;
    height: 185px;
    transform: translateY(-50%);
    border-radius: 14px;
    border: 0.75px solid #969696;
    background: #fff;
  }
  .categories {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
    padding: 0 0 10px;
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
    .categories {
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }
    .products__list {
      padding: 30px 0;
      .product__list__wrapper {
        padding-left: 0;
      }
    }
  }
`;

const Vendor = (props) => {
  //   const { vendorId } = useParams();

  const {
    vendorCoverSrc = "/images/store-cover.jpg",
    vendorLogo,
    vendorName,
  } = props;
  const { isDesktop } = useAppContext();

  return (
    <VendorStyle>
      <div className="vendor__cover">
        <img className="w-100" src={vendorCoverSrc} alt={vendorName} />
      </div>
      <div className="container">
        <div className="vendor__logo">
          <img className="w-100" src={vendorLogo} alt={vendorName} />
        </div>
        <div className="categories">
          {Array.from({ length: 8 }, (_, index) => index + 1)?.map((item) => (
            <CategoryCard
              src={categoryDummy}
              title={"Bathroom & Kitchen"}
              type={isDesktop && "text-in-image"}
            />
          ))}
        </div>
        <div className="products__list">
          <ProductList pagination={false} />
        </div>
      </div>
      <div>
        <img className="w-100" src={vendorCoverSrc} alt={vendorName} />
      </div>
      <div className="container products__list">
        <ProductList pagination={false} />
      </div>
      <div>
        <img className="w-100" src={vendorCoverSrc} alt={vendorName} />
      </div>
    </VendorStyle>
  );
};

export default Vendor;
