import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as ReviewStarsIcons } from "../../../assets/reviewStars.svg";
import ProductReviewCard from "../ProductReviewCard";
import ProductReviewForm from "../../forms/productReview/ProductReviewForm";
import { useAppContext } from "../../../context/useAppContext";
import { useRequest } from "../../../hooks/useRequest";
import { useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

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
    .product__reviews__pagination {
      width: 100%;
      display: flex;
      justify-content: center;
      margin: 30px 0;
    }
  }
  @media (max-width: 768px) {
    .avg__ratings__bars__wrapper {
      gap: 20px;
    }
    .product__ratings__bars__wrapper {
      flex: 1;
      justify-content: center;
      .product__ratings__bar {
        gap: 4px;
        margin-bottom: 4px;
        width: 100%;
        .product__ratings__number {
          font-size: 12px;
        }
        .product__ratings__line {
          width: 140px;
          height: 4px;
        }
      }
    }
    .product__average__ratings {
      width: 100px;
      .average__ratings__subtitle {
        font-size: 12px;
        text-align: center;
        margin-bottom: 8px;
        margin-top: 4px;
      }
      .average__ratings__number {
        font-size: 28px;
        margin-bottom: 4px;
      }
    }
    .product__reviews__wrapper {
      margin-top: 20px;
      .product__review__card {
        width: 100%;
      }
    }
  }
`;

const ProductReviews = () => {
  const { isDesktop } = useAppContext();
  const [fetchReviews] = useRequest();
  const [pageNumber, setPageNumber] = useState(1);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const productId = params.get("id");
  const [reviewData, setReviewData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const getReviews = async (productId, pageNumber) => {
    const path = `/review/${productId}?limit=6&page=${pageNumber}`;
    const response = await fetchReviews({ path });
    if (response.success) {
      setReviewData(response?.data?.docs);
      setTotalPages(response?.data?.totalPages);
    }
  };

  useEffect(() => {
    productId && pageNumber && getReviews(productId, pageNumber);
  }, [productId, pageNumber]);

  const handlePaginationChange = (e, value) => {
    setPageNumber(value);
  };

  return (
    <ProductReviewsStyle>
      <div className="avg__ratings__bars__wrapper">
        <div className="product__average__ratings">
          {isDesktop && (
            <p className="average__ratings__subtitle">What Users say</p>
          )}
          <div className="average__ratings__number">4.7</div>
          <ReviewStarsIcons />
          <div className="average__ratings__subtitle total__number__ratings">
            Based on 767 Ratings
          </div>
        </div>
        <div className="product__ratings__bars__wrapper">
          {Array.from({ length: 5 }, (_, index) => index + 1).map((item) => (
            <div className="product__ratings__bar" key={item}>
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
        {reviewData?.map((item) => (
          <ProductReviewCard
            key={item?._id}
            customerName={item?.name}
            customerRatingCount={item?.rating}
            customerReview={item?.comment}
            reviewDate={new Date(item?.updatedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          />
        ))}
        {isDesktop && (
          <div className="product__reviews__pagination">
            <Pagination
              className="pagination"
              count={totalPages}
              shape="rounded"
              onChange={handlePaginationChange}
            />
          </div>
        )}
      </div>
      <ProductReviewForm productId={productId} />
    </ProductReviewsStyle>
  );
};

export default ProductReviews;
