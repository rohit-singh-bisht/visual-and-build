import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as WhiteStarIcon } from "../../../assets/white-star.svg";
import Button from "../../common/Button";
import { useRequest } from "../../../hooks/useRequest";
import { toast } from "react-toastify";
import Progress from "../../common/Progress";

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
  .product__review__form__text {
    input {
      border-radius: 5px;
      border: 1px solid #d9d9d9;
      background: #fff;
      padding: 0 22px;
      width: 100%;
      line-height: 52px;
      height: 52px;
      margin-bottom: 10px;
      &:focus-visible {
        outline: 1px solid #353535;
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
      font-size: 14px;
      font-weight: 400;
      display: block;
      &:placeholder {
        color: #7d7d7d;
      }
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

const ProductReviewForm = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [postReview, { isLoading }] = useRequest();

  const handleSubmit = async (productId, rating, comment) => {
    if (!comment || rating === 0) {
      return toast.error("Please enter all the details");
    }

    const path = `/review/${productId}/post`;
    const response = await postReview({
      path,
      method: "POST",
      body: JSON.stringify({
        rating,
        comment,
      }),
    });
    if (!response.success) {
      return toast.error(response.message || "Can't add review to the product");
    }
    toast.success(response.message);
  };

  return (
    <ProductReviewFormStyle>
      <div className="product__review__form__title">Write a Review</div>
      <div className="product__review__form__stars__wrapper">
        {Array.from({ length: 5 }, (_, index) => index + 1).map((item) => (
          <div
            key={item}
            className={`star ${item <= rating ? "active" : ""}`}
            onClick={() => setRating(item)}
          >
            <WhiteStarIcon />
          </div>
        ))}
      </div>
      <div className="product__review__form__textarea">
        <textarea
          placeholder="Write Something.."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <div className="product__review__form__button">
        <Button
          type={"save"}
          title={"Comment"}
          onClick={() => handleSubmit(productId, rating, comment)}
        />
      </div>
      {isLoading && <Progress />}
    </ProductReviewFormStyle>
  );
};

export default ProductReviewForm;
