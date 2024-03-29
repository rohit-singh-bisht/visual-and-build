import React from "react";
import styled from "styled-components";
import categoryDummy from "../../assets/category-dummy.jpg";

const ProductReviewCardStyle = styled.div`
  display: flex;
  gap: 20px;
  padding: 35px 15px;
  .customer__pic {
    width: 70px;
    height: 70px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  .review__content {
    flex: 1;
    .customer__name__rating__wrapper {
      display: flex;
      gap: 24px;
    }
    .customer__name,
    .customer__review__date,
    .customer__rating {
      color: #898989;
      font-size: 16px;
      font-weight: 600;
      text-transform: capitalize;
    }
    .customer__name {
      color: #363636;
    }
    .customer__rating {
      display: flex;
      gap: 4px;
      align-items: center;
    }
    .customer__review__date {
      font-weight: 400;
      margin: 10px 0 18px;
    }
    .customer__review {
      color: #898989;
      font-size: 14px;
      font-weight: 400;
    }
  }
  @media (max-width: 768px) {
    padding: 20px 5px;
    .review__content {
      .customer__name__rating__wrapper {
        align-items: center;
      }
      .customer__rating {
        svg {
          width: 16px;
        }
      }
      .customer__name {
        font-size: 14px;
      }
      .customer__review__date {
        font-size: 14px;
        margin: 4px 0 12px;
      }
    }
  }
`;

const star = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="23"
    height="24"
    viewBox="0 0 23 24"
    fill="none"
  >
    <path
      d="M11.0954 2.76419C11.2905 2.3579 11.8544 2.3579 12.0496 2.76419L14.5762 8.02373C14.6537 8.18507 14.8035 8.2969 14.9768 8.32277L20.6263 9.16618C21.0627 9.23133 21.237 9.78234 20.9212 10.0986L16.8332 14.1926C16.7078 14.3182 16.6505 14.4991 16.6801 14.6764L17.6452 20.4572C17.7198 20.9038 17.2635 21.2443 16.8732 21.0335L11.8201 18.3042C11.6651 18.2204 11.4799 18.2204 11.3249 18.3042L6.27179 21.0335C5.88144 21.2443 5.42522 20.9038 5.49977 20.4572L6.46483 14.6764C6.49443 14.4991 6.43721 14.3182 6.3118 14.1926L2.22376 10.0986C1.90797 9.78234 2.08223 9.23133 2.51865 9.16618L8.16818 8.32277C8.34149 8.2969 8.4913 8.18507 8.5688 8.02373L11.0954 2.76419Z"
      fill="#F4BF42"
      stroke="#898989"
      stroke-width="0.896059"
      stroke-linejoin="round"
    />
  </svg>
);

const ProductReviewCard = ({
  imgSrc,
  customerName,
  customerReview,
  reviewDate,
  customerRatingCount = 0,
}) => {
  return (
    <ProductReviewCardStyle className="product__review__card">
      <div className="customer__pic">
        <img src={imgSrc || categoryDummy} alt={customerName} />
      </div>
      <div className="review__content">
        <div className="customer__name__rating__wrapper">
          {customerName && <div className="customer__name">{customerName}</div>}
          <div className="customer__rating">
            {star} {customerRatingCount}
          </div>
        </div>
        {reviewDate && (
          <div className="customer__review__date">{reviewDate}</div>
        )}
        <div className="customer__review">{customerReview}</div>
      </div>
    </ProductReviewCardStyle>
  );
};

export default ProductReviewCard;
