import React from "react";
import styled from "styled-components";
import { ReactComponent as ReviewStars } from "../../assets/reviewStars.svg";
import IconWithTextList from "../../components/common/IconWithTextList";
import { productIcons } from "../../constants/IconsWithTextData";
import ProductVariants from "../../components/product/ProductVariants";
import ProductActions from "../../components/product/ProductActions";
import ImageGallery from "react-image-gallery";
import ProductList from "../../components/product/ProductList";
import AddToCartModal from "../../components/modals/AddToCartModal";

const ProductDetailsStyle = styled.div`
  padding: 70px 0;
  .product__details__wrapper {
    display: flex;
    gap: 42px;
  }
  .image__gallery,
  .product__details {
    width: 100%;
  }
  .image__gallery {
    .image-gallery-image {
      border-radius: 7.5px;
    }
    .image-gallery-icon:hover {
      color: #ae0000;
    }
    .image-gallery-fullscreen-button {
      top: 0;
      bottom: auto;
    }
    .image-gallery-thumbnails-container {
      text-align: left;
      margin-top: 20px;
      margin-bottom: 48px;
      .image-gallery-thumbnail {
        border-radius: 7.5px;
        border: 0px;
        overflow: clip;
      }
      .image-gallery-thumbnail + .image-gallery-thumbnail {
        margin-left: 18px;
      }
    }
  }
  .product__details {
    .vendor__details__reviews {
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      .vendor__details {
        color: #303030;
        font-size: 15px;
        font-weight: 400;
        line-height: 22.5px;
        text-decoration-line: underline;
        cursor: pointer;
      }
      .product__reviews {
        color: #303030;
        font-size: 15px;
        font-weight: 400;
        line-height: 22.5px;
        display: flex;
        align-items: center;
        gap: 6px;
      }
    }
    .product__title {
      color: #303030;
      font-size: 27px;
      font-weight: 600;
      line-height: 34.5px;
      margin-bottom: 20.5px;
    }
    .product__price {
      display: flex;
      align-items: center;
      gap: 19px;
      margin-top: 12px;
      .discounted__price {
        color: #ae0000;
        font-size: 42px;
        font-weight: 700;
        line-height: 51px;
      }
      .original__price {
        color: rgba(48, 48, 48, 0.5);
        font-size: 15px;
        font-weight: 400;
        line-height: 22.5px;
        text-decoration: line-through;
      }
    }
    .product__details__options {
      margin-top: 34px;
    }
    .product__options {
      display: flex;
      margin-bottom: 12px;
      .product__options__title {
        color: #303030;
        font-size: 15px;
        font-weight: 600;
        line-height: 22.5px;
        width: 125px;
      }
      .product__options__value {
        color: #303030;
        font-size: 15px;
        font-weight: 400;
        line-height: 22.5px;
      }
    }
  }
  .related__product {
    margin-top: 150px;
    padding: 48px 0;
    border-top: 0.75px solid rgba(48, 48, 48, 0.25);
  }
`;

const ProductDetails = () => {
  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];
  return (
    <>
      <ProductDetailsStyle>
        <div className="container">
          <div className="product__details__wrapper">
            <div className="image__gallery">
              <ImageGallery
                items={images}
                showBullets={false}
                showNav={false}
                showPlayButton={false}
              />
              <IconWithTextList data={productIcons} />
            </div>
            <div className="product__details">
              <div className="vendor__details__reviews">
                <div className="vendor__details">MS Trader</div>
                <div className="product__reviews">
                  <ReviewStars />
                  (142)
                </div>
              </div>
              <h2 className="product__title">
                Kayra Decor 3D PVC Wall Panels Wave Design D026 (Pack of 6)
                Drywall Panel (Pack of 6)
              </h2>
              <hr
                style={{ borderTop: "0.75px solid rgba(48, 48, 48, 0.25)" }}
              />
              <div className="product__price">
                <div className="discounted__price">$1999.00</div>
                <div className="original__price">$1999.00</div>
              </div>
              <div className="product__details__options">
                <div className="product__options">
                  <h2 className="product__options__title">Brand</h2>
                  <p className="product__options__value">The Drywall Company</p>
                </div>
                <div className="product__options">
                  <h2 className="product__options__title">Model Number</h2>
                  <p className="product__options__value">
                    3D PVC Wall Panels Wave Design D026 (Pack of 6)
                  </p>
                </div>
                <div className="product__options">
                  <h2 className="product__options__title">Material</h2>
                  <p className="product__options__value">PVC</p>
                </div>
                <div className="product__options">
                  <h2 className="product__options__title">Finish</h2>
                  <p className="product__options__value">Matte</p>
                </div>
                <div className="product__options__variants">
                  <ProductVariants name={"Variant"} />
                </div>
                <ProductActions />
              </div>
            </div>
          </div>
          <div className="related__product">
            <ProductList
              listTitle={"Related Products"}
              buttonText={"View All"}
              pagination={false}
              buttonArrow={true}
            />
          </div>
          <ProductList
            listTitle={"Group Buy Products"}
            buttonText={"View All"}
            pagination={false}
            buttonArrow={true}
          />
        </div>
      </ProductDetailsStyle>
      <AddToCartModal />
    </>
  );
};

export default ProductDetails;
