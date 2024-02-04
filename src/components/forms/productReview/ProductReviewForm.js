import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as WhiteStarIcon } from "../../../assets/white-star.svg";
import Button from "../../common/Button";

const ProductReviewFormStyle = styled.div`
  margin-top: 35px;
  .product__review__form__title {
    color: #898989;
    font-size: 16px;
    font-weight: 500;
    text-transform: capitalize;
  }
  .product__review__form__stars__wrapper {
    display: flex;
    margin: 18px 0;
    gap: 8px;
    .star {
      cursor: pointer;
    }
    .active {
      svg {
        path {
          fill: #f4bf42;
        }
      }
    }
  }
  .product__review__form__textarea {
    textarea {
      border-radius: 5px;
      border: 1px solid #d9d9d9;
      background: #fff;
      padding: 22px;
      width: 100%;
      resize: none;
      height: 160px;
      overflow: auto;
      color: #7d7d7d;
      font-size: 14px;
      font-weight: 400;
      display: block;
      &:focus-visible {
        outline: 1px solid #353535;
      }
    }
  }
  .product__review__form__button {
    text-align: right;
    margin-top: 16px;
  }
`;

const ProductReviewForm = () => {
  const [ratingCount, setRatingCount] = useState(0);

  return (
    <ProductReviewFormStyle>
      <div className="product__review__form__title">Write a Review</div>
      <div className="product__review__form__stars__wrapper">
        {Array.from({ length: 5 }, (_, index) => index + 1).map((item) => (
          <div
            className={`star ${item <= ratingCount ? "active" : ""}`}
            onClick={() => setRatingCount(item)}
          >
            <WhiteStarIcon />
          </div>
        ))}
      </div>
      <div className="product__review__form__textarea">
        <textarea placeholder="Write Something.."></textarea>
      </div>
      <div className="product__review__form__button">
        <Button type={"save"} title={"Comment"} />
      </div>
    </ProductReviewFormStyle>
  );
};

export default ProductReviewForm;
