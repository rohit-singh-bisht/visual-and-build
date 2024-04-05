import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRequest } from "../../../hooks/useRequest";

const ProductCardStyle = styled.div`
  display: flex;
  gap: 16px;
  border: 0.75px solid #d9d9d9;
  padding: 12px;
  border-radius: 4px;
  margin: 20px 0;
  .product__image {
    width: 100px;
    height: 100px;
  }
  .product__details {
    flex: 1;
    .product__title {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      margin-bottom: 4px;
    }
  }
  .text {
    font-size: 12px;
    line-height: 20px;
    color: #333333;
  }
  .bold {
    font-weight: 700;
  }
  .product__need__help__btn {
    font-size: 13px;
    font-weight: 500;
    border: 1px solid #ae0000;
    color: #ae0000;
    line-height: 21px;
    height: 40px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background-color: #ae0000;
      color: #fff;
    }
  }
`;

const HelpAndSupport = () => {
  const [getOrderHistory, { isLoading }] = useRequest();
  const [pageNumber, setPageNumber] = useState(1);
  const [limitNumber, setLimitNumber] = useState(10);
  const [orderHistory, setOrderHistory] = useState([]);
  console.log("orderHistory", orderHistory);

  const fetchOrderSummary = async (pageNumber, limitNumber) => {
    const path = `/order?${limitNumber}${
      pageNumber ? `&page=${pageNumber}` : ""
    }`;
    const response = await getOrderHistory({ path });
    if (response.success) {
      setOrderHistory(response?.data);
    }
  };

  useEffect(() => {
    fetchOrderSummary(pageNumber, limitNumber);
  }, [pageNumber]);

  return (
    <>
      <div className="product__list__wrapper">
        {Array.from({ length: 5 }, (_, index) => index + 1)?.map((item) => (
          <ProductCardStyle key={item}>
            <div className="product__image">
              <img src="" />
            </div>
            <div className="product__details">
              <div className="product__title text">
                Castico 60L x 32W x 84H" Solid Composite Stone Shower Kit- Gr
                Picket Walls and L/RCastico 60L x 32W x 84H" Solid Composite
                Stone Shower Kit- Gr Picket Walls and L/R
              </div>
              <div className="text">
                <span className="bold">SKU</span> # 1001812254
              </div>
            </div>
            <div className="product__need__help__btn">Need Help for this</div>
          </ProductCardStyle>
        ))}
      </div>
    </>
  );
};

export default HelpAndSupport;
