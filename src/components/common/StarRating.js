import React from "react";
import styled from "styled-components";

const StarRatingStyled = styled.div`
  display: flex;
  gap: 3px;
  align-items: center;
  .avgRating,
  .rating_count {
    font-size: 11px;
    font-weight: 400;
    line-height: 18px;
    text-align: left;
    display: inline-block;
  }
  .avgRating {
    margin-right: 4px;
  }
  .rating_count {
    margin-left: 4px;
  }
`;

const StarRating = ({ avgRating = 0, ratingCount = 0 }) => {
  const stars = [];
  const integerPart = Math.floor(avgRating);
  const decimalPart = avgRating - integerPart;

  if (integerPart === 0) {
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          className="star"
        >
          <path
            d="M12 2l3.09 6.32L22 9.24l-5.67 5.51 1.34 7.8L12 18.65 5.33 22.55l1.34-7.8L2 9.24l6.91-.92L12 2z"
            fill="#ffffff"
            stroke="black"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    }
  } else {
    for (let i = 0; i < integerPart; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="10"
          viewBox="0 0 11 10"
          fill="none"
          className="star filled-star"
        >
          <path
            d="M5.13849 0.647145C5.23532 0.450952 5.51508 0.450952 5.61191 0.647145L6.86535 3.18689C6.9038 3.2648 6.97813 3.3188 7.0641 3.33129L9.86688 3.73856C10.0834 3.77002 10.1698 4.03609 10.0132 4.18881L7.98507 6.16572C7.92285 6.22637 7.89446 6.31374 7.90915 6.39937L8.38792 9.19082C8.42491 9.40646 8.19857 9.5709 8.00492 9.46909L5.49804 8.15115C5.42114 8.11072 5.32927 8.11072 5.25237 8.15115L2.74549 9.46909C2.55183 9.5709 2.3255 9.40646 2.36248 9.19082L2.84125 6.39937C2.85594 6.31374 2.82755 6.22637 2.76534 6.16572L0.73723 4.18881C0.580561 4.03609 0.667013 3.77002 0.883525 3.73856L3.6863 3.33129C3.77228 3.3188 3.8466 3.2648 3.88505 3.18689L5.13849 0.647145Z"
            fill="#ffc107"
            stroke="black"
            strokeWidth="0.375"
            strokeLinejoin="round"
          />
        </svg>
      );
    }

    if (decimalPart > 0) {
      stars.push(
        <svg
          key="decimal"
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="10"
          viewBox="0 0 11 10"
          fill="none"
          className="star"
        >
          <path
            d="M5.13849 0.647145C5.23532 0.450952 5.51508 0.450952 5.61191 0.647145L6.86535 3.18689C6.9038 3.2648 6.97813 3.3188 7.0641 3.33129L9.86688 3.73856C10.0834 3.77002 10.1698 4.03609 10.0132 4.18881L7.98507 6.16572C7.92285 6.22637 7.89446 6.31374 7.90915 6.39937L8.38792 9.19082C8.42491 9.40646 8.19857 9.5709 8.00492 9.46909L5.49804 8.15115C5.42114 8.11072 5.32927 8.11072 5.25237 8.15115L2.74549 9.46909C2.55183 9.5709 2.3255 9.40646 2.36248 9.19082L2.84125 6.39937C2.85594 6.31374 2.82755 6.22637 2.76534 6.16572L0.73723 4.18881C0.580561 4.03609 0.667013 3.77002 0.883525 3.73856L3.6863 3.33129C3.77228 3.3188 3.8466 3.2648 3.88505 3.18689L5.13849 0.647145Z"
            fill="#ffffff"
            stroke="black"
            strokeWidth="0.375"
            strokeLinejoin="round"
          />
          <path
            d="M5.13849 0.647145C5.23532 0.450952 5.51508 0.450952 5.61191 0.647145L6.86535 3.18689C6.9038 3.2648 6.97813 3.3188 7.0641 3.33129L9.86688 3.73856C10.0834 3.77002 10.1698 4.03609 10.0132 4.18881L7.98507 6.16572C7.92285 6.22637 7.89446 6.31374 7.90915 6.39937L8.38792 9.19082C8.42491 9.40646 8.19857 9.5709 8.00492 9.46909L5.49804 8.15115C5.42114 8.11072 5.32927 8.11072 5.25237 8.15115L2.74549 9.46909C2.55183 9.5709 2.3255 9.40646 2.36248 9.19082L2.84125 6.39937C2.85594 6.31374 2.82755 6.22637 2.76534 6.16572L0.73723 4.18881C0.580561 4.03609 0.667013 3.77002 0.883525 3.73856L3.6863 3.33129C3.77228 3.3188 3.8466 3.2648 3.88505 3.18689L5.13849 0.647145Z"
            fill="#ffc107"
            stroke="black"
            strokeWidth="0.375"
            strokeLinejoin="round"
            style={{
              clipPath: `inset(0 ${100 - decimalPart * 100}% 0 0)`,
              overflow: "hidden",
            }}
          />
        </svg>
      );
    }

    for (let i = integerPart + 1; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="10"
          viewBox="0 0 11 10"
          fill="none"
          className="star"
        >
          <path
            d="M5.13849 0.647145C5.23532 0.450952 5.51508 0.450952 5.61191 0.647145L6.86535 3.18689C6.9038 3.2648 6.97813 3.3188 7.0641 3.33129L9.86688 3.73856C10.0834 3.77002 10.1698 4.03609 10.0132 4.18881L7.98507 6.16572C7.92285 6.22637 7.89446 6.31374 7.90915 6.39937L8.38792 9.19082C8.42491 9.40646 8.19857 9.5709 8.00492 9.46909L5.49804 8.15115C5.42114 8.11072 5.32927 8.11072 5.25237 8.15115L2.74549 9.46909C2.55183 9.5709 2.3255 9.40646 2.36248 9.19082L2.84125 6.39937C2.85594 6.31374 2.82755 6.22637 2.76534 6.16572L0.73723 4.18881C0.580561 4.03609 0.667013 3.77002 0.883525 3.73856L3.6863 3.33129C3.77228 3.3188 3.8466 3.2648 3.88505 3.18689L5.13849 0.647145Z"
            fill="#fffff"
            stroke="black"
            strokeWidth="0.375"
            strokeLinejoin="round"
          />
        </svg>
      );
    }
  }

  return (
    <StarRatingStyled>
      <span className="avgRating">{avgRating}</span>
      {stars} <span className="rating_count">({ratingCount})</span>
    </StarRatingStyled>
  );
};

export default StarRating;
