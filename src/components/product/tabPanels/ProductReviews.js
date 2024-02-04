import React from "react";
import styled from "styled-components";
import { ReactComponent as ReviewStarsIcons } from "../../../assets/reviewStars.svg";
import ProductReviewCard from "../ProductReviewCard";
import ProductReviewForm from "../../forms/productReview/ProductReviewForm";

const ProductReviewsStyle = styled.div`
  .avg__ratings__bars__wrapper {
    display: flex;
    gap: 70px;
  }
  .product__average__ratings {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-transform: capitalize;
    .average__ratings__subtitle {
      color: #898989;
      font-size: 16px;
      font-weight: 500;
      line-height: normal;
      margin-bottom: 20px;
    }
    .average__ratings__number {
      color: #898989;
      font-size: 54px;
      font-weight: 600;
      line-height: normal;
      margin-bottom: 12px;
    }
    .total__number__ratings {
      margin-top: 15px;
    }
  }
  .product__ratings__bars__wrapper {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    .product__ratings__bar {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 20px;
      .product__ratings__number {
        color: #898989;
        font-size: 16px;
        font-weight: 400;
        text-transform: capitalize;
      }
      .product__ratings__line {
        width: 360px;
        background: #e5e5e5;
        height: 12px;
        border-radius: 12px;
      }
      .product__ratings__line__filled {
        background-color: #f4bf42;
        height: 100%;
        border-radius: 12px;
        transition: all 0.3s;
      }
    }
  }
  .product__reviews__wrapper {
    display: flex;
    flex-wrap: wrap;
    column-gap: 50px;
    margin-top: 50px;
    .product__review__card {
      width: calc(50% - 25px);
      border-top: 1px solid #d9d9d9;
    }
  }
`;

const ProductReviews = () => {
  return (
    <ProductReviewsStyle>
      <div className="avg__ratings__bars__wrapper">
        <div className="product__average__ratings">
          <p className="average__ratings__subtitle">What students say</p>
          <div className="average__ratings__number">4.7</div>
          <ReviewStarsIcons />
          <div className="average__ratings__subtitle total__number__ratings">
            Based on 767 Ratings
          </div>
        </div>
        <div className="product__ratings__bars__wrapper">
          {Array.from({ length: 5 }, (_, index) => index + 1).map((item) => (
            <div className="product__ratings__bar">
              <div className="product__ratings__number">{item} Star</div>
              <div className="product__ratings__line">
                <div
                  className="product__ratings__line__filled"
                  style={{ width: item * 10 + "%" }}
                />
              </div>
              <div className="product__ratings__number">(5)</div>
            </div>
          ))}
        </div>
      </div>
      <div className="product__reviews__wrapper">
        {Array.from({ length: 5 }, (_, index) => index + 1)?.map((item) => (
          <ProductReviewCard
            customerName={"Nishant choudhary"}
            customerRatingCount={5}
          />
        ))}
      </div>
      <ProductReviewForm />
    </ProductReviewsStyle>
  );
};

export default ProductReviews;
