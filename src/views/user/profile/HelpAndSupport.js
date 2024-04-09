import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRequest } from "../../../hooks/useRequest";
import Pagination from "@mui/material/Pagination";
import CreateTicketModal from "../../../components/modals/CreateTicketModal";

const ProductCardStyle = styled.div`
  display: flex;
  gap: 20px;
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

const ProductListPaginationStyle = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const HelpSupportStyle = styled.div`
  flex: 1;
`;

const HelpAndSupport = () => {
  const [getOrderHistory, { isLoading }] = useRequest();
  const [pageNumber, setPageNumber] = useState(1);
  const [orderHistory, setOrderHistory] = useState([]);
  const [isCreateModal, setIsCreateModal] = useState(false);

  const fetchOrderSummary = async (pageNumber) => {
    const path = `/order?limit=5&${pageNumber ? `&page=${pageNumber}` : ""}`;
    const response = await getOrderHistory({ path });
    if (response.success) {
      setOrderHistory(response?.data);
    }
  };

  useEffect(() => {
    fetchOrderSummary(pageNumber);
  }, [pageNumber]);

  const handlePaginationChange = (e, value) => {
    setPageNumber(value);
  };

  return (
    <>
      {orderHistory && orderHistory?.docs?.length > 0 && (
        <HelpSupportStyle>
          {orderHistory?.docs?.map((item) => (
            <ProductCardStyle key={item?._id}>
              <div className="product__image">
                <img
                  src={`${process.env.REACT_APP_MEDIA_ASSETS_URL}/${item?.product?.image}`}
                />
              </div>
              <div className="product__details">
                <div className="product__title text">{item?.product?.name}</div>
                <div className="text">
                  <span className="bold">SKU</span> # {item?.product?.sku}
                </div>
              </div>
              <div
                className="product__need__help__btn"
                onClick={() => setIsCreateModal(true)}
              >
                Need Help for this
              </div>
            </ProductCardStyle>
          ))}
          <ProductListPaginationStyle>
            <Pagination
              className="pagination"
              count={orderHistory?.totalPages}
              shape="rounded"
              onChange={handlePaginationChange}
            />
          </ProductListPaginationStyle>
        </HelpSupportStyle>
      )}
      {isCreateModal && (
        <CreateTicketModal handleClose={() => setIsCreateModal(false)} />
      )}
    </>
  );
};

export default HelpAndSupport;
