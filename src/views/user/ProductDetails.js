import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { ReactComponent as ReviewStars } from "../../assets/reviewStars.svg";
import IconWithTextList from "../../components/common/IconWithTextList";
import { productIcons } from "../../constants/IconsWithTextData";
import ProductVariants from "../../components/product/ProductVariants";
import ProductActions from "../../components/product/ProductActions";
import ImageGallery from "react-image-gallery";
import ProductList from "../../components/product/ProductList";
import AddToCartModal from "../../components/modals/AddToCartModal";
import ProductInformationTabs from "../../components/product/ProductInformationTabs";
import { useAppContext } from "../../context/useAppContext";
import { useRequest } from "../../hooks/useRequest";
import { Skeleton } from "@mui/material";
import { useLocation } from "react-router-dom";
import ProductDetailsSkeleton from "../../components/skeleton/ProductDetailsSkeleton";
import GroupBuyGrid from "../../components/common/GroupBuyGrid";

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
      text-transform: capitalize;
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
    margin-top: 100px;
    padding: 48px 0;
    border-top: 0.75px solid rgba(48, 48, 48, 0.25);
  }
  @media (max-width: 768px) {
    padding: 0px 0 40px;
    .container {
      padding: 0 !important;
    }
    .product__details__wrapper {
      flex-wrap: wrap;
      gap: 20px;
    }
    .image__gallery .image-gallery-image {
      border-radius: 0px;
    }
    .image__gallery .image-gallery-thumbnails-container {
      margin-top: 4px;
      margin-bottom: 0px;
      .image-gallery-thumbnail {
        border-radius: 0px;
        margin-left: 4px !important;
      }
    }
    .product__details {
      padding: 0 15px;
      .vendor__details__reviews {
        margin-bottom: 4px;
        .vendor__details,
        .product__reviews {
          font-size: 12px;
          line-height: 20px;
        }
        .product__reviews {
          svg {
            width: 80px;
          }
        }
      }
      .product__title {
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 10px;
      }
      .product__price .discounted__price {
        font-size: 24px;
        line-height: 32px;
      }
      .product__options {
        .product__options__title,
        .product__options__value {
          font-size: 14px;
          line-height: 22px;
        }
        .product__options__value {
          flex: 1;
        }
      }
    }
    .related__product {
      margin-top: 0;
      padding: 30px 0;
    }
  }
`;

const ProductDetails = () => {
  const [isAddToCartActive, setIsAddToCartActive] = useState(false);
  const { isDesktop } = useAppContext();
  const [
    fetchProductDetails,
    { isLoading: isFetchingProductsDetails, state: productDetailsState },
  ] = useRequest();
  const [
    fetchRelatedProducts,
    { isLoading: isFetchingRelatedProducts, state: relatedProducts },
  ] = useRequest();
  const { search } = useLocation();
  const { data: productDetails } = productDetailsState || {};
  const priceSymbol = process.env.REACT_APP_PRICE_SYMBOL;

  useEffect(() => {
    const params = new URLSearchParams(search);
    const productId = params.get("id");
    if (productId) {
      const path = `/product/${productId}/`;
      fetchProductDetails({ path: path + "show" });
      fetchRelatedProducts({ path: path + "related" });
    }
  }, [search]);

  const getProductImages = (product) => {
    if (!(product && Object.keys(product).length)) return [];
    let itemImages = [];
    const baseUrl = process.env.REACT_APP_MEDIA_ASSETS_URL + "/";
    if (product?.image) {
      itemImages.push({
        original: baseUrl + product.image,
        thumbnail: baseUrl + product.image,
      });
    }
    if (
      product &&
      product?.additionalImages &&
      product?.additionalImages.length > 0
    ) {
      product?.additionalImages?.forEach((image) => {
        itemImages.push({
          original: baseUrl + image.name,
          thumbnail: baseUrl + image.name,
        });
      });
    }
    return itemImages;
  };

  const productImages = useMemo(
    () => getProductImages(productDetails),
    [productDetails]
  );

  return (
    <>
      <ProductDetailsStyle>
        <div className="container">
          <div className="product__details__wrapper">
            <div className="image__gallery">
              {isFetchingProductsDetails ? (
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={350}
                  style={{ marginBottom: "142px" }}
                />
              ) : (
                <ImageGallery
                  items={productImages}
                  showBullets={false}
                  showNav={false}
                  showPlayButton={false}
                />
              )}
              {isDesktop && <IconWithTextList data={productIcons} />}
            </div>
            {isFetchingProductsDetails &&
            !(productDetails && Object.keys(productDetails)?.length) ? (
              <ProductDetailsSkeleton />
            ) : (
              <div className="product__details">
                <div className="vendor__details__reviews">
                  <div className="vendor__details">MS Trader</div>
                  <div className="product__reviews">
                    <ReviewStars />({productDetails?.numReviews})
                  </div>
                </div>
                <h2 className="product__title">{productDetails?.name}</h2>
                <hr
                  style={{ borderTop: "0.75px solid rgba(48, 48, 48, 0.25)" }}
                />
                <div className="product__price">
                  <div className="discounted__price">
                    {priceSymbol +
                      (productDetails?.discount
                        ? productDetails.discount
                        : productDetails?.price.toFixed(2))}
                  </div>
                  {productDetails?.discount && (
                    <div className="original__price">
                      {priceSymbol + productDetails?.price.toFixed(2)}
                    </div>
                  )}
                </div>
                <div className="product__details__options">
                  <div className="product__options">
                    <h2 className="product__options__title">Brand</h2>
                    <p className="product__options__value">
                      The Drywall Company
                    </p>
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
                  <ProductActions
                    onAddToCart={() => setIsAddToCartActive(true)}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="product__information__tab__wrapper">
            <ProductInformationTabs description={productDetails?.description} />
          </div>
          <div className="related__product">
            <ProductList
              listTitle={"Related Products"}
              buttonText={"View All"}
              pagination={false}
              buttonArrow={true}
              isLoading={isFetchingRelatedProducts}
              productList={relatedProducts?.data?.docs}
            />
          </div>
          <GroupBuyGrid />
        </div>
      </ProductDetailsStyle>
      {isAddToCartActive && (
        <AddToCartModal onMaskClick={() => setIsAddToCartActive(false)} />
      )}
    </>
  );
};

export default ProductDetails;
