import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRequest } from "../../../hooks/useRequest";
import { Skeleton } from "@mui/material";
import { getDate } from "../../../utils/helper";
import TablePagination from "@mui/material/TablePagination";
import { useNavigate } from "react-router-dom";

const PurchaseHistoryStyle = styled.div`
  flex: 1;
  .subtitle {
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    text-align: left;
    color: #666666;
    margin: 12px 0;
  }
  .purchases__found {
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    text-align: left;
    margin: 12px 0;
    span {
      font-weight: 700;
    }
  }
  .order__history__table {
    width: 100%;
    border-collapse: collapse;
    tr {
      th,
      td {
        padding: 10px;
        font-size: 12px;
        font-weight: 400;
        line-height: 22px;
        text-align: left;
        border: 1px solid #d2d1d1;
        &:nth-last-child(2),
        &:nth-last-child(3) {
          text-align: center;
          text-transform: capitalize;
        }
        &:last-child {
          text-align: end;
        }
      }
      .MuiTablePagination-root {
        padding: 0;
        P {
          font-size: 13px;
          font-weight: 400;
          line-height: 22px;
        }
      }
      th {
        font-size: 14px;
        font-weight: 600;
      }
    }
    .table__data__row {
      cursor: pointer;
      &:hover {
        background-color: #ffeeee;
      }
    }
  }
`;

const PurchaseHistory = () => {
  const [getOrderHistory, { isLoading }] = useRequest();
  const [pageNumber, setPageNumber] = useState(1);
  const [limitNumber, setLimitNumber] = useState(10);
  const [orderHistory, setOrderHistory] = useState([]);
  const navigate = useNavigate();

  const fetchOrderSummary = async (pageNumber, limitNumber) => {
    const path = `/order?limit=${limitNumber}&page=${pageNumber}&seach=&date=&orderStatus=&sort=`;
    const response = await getOrderHistory({ path });
    if (response.success) {
      setOrderHistory(response?.data);
    }
  };

  useEffect(() => {
    fetchOrderSummary(pageNumber, limitNumber);
  }, [pageNumber, limitNumber]);

  const handlePageChange = (event, newPage) => {
    setPageNumber(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setLimitNumber(+event.target.value);
    setPageNumber(1);
  };

  return (
    <PurchaseHistoryStyle>
      <p className="subtitle">Here is a history of all your purchases made.</p>
      {!isLoading && (
        <div className="purchases__found">
          {orderHistory?.totalDocs ? (
            <span>{orderHistory?.totalDocs}</span>
          ) : (
            "No"
          )}{" "}
          purchases found
        </div>
      )}
      <table className="order__history__table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Order Id</th>
            <th style={{ width: "350px" }}>Address</th>
            <th>Order Status</th>
            <th>Payment Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <>
              {Array.from({ length: 10 }, (_, index) => index + 1).map(
                (item) => (
                  <tr key={item}>
                    {Array.from({ length: 6 }, (_, index) => index + 1).map(
                      (item2) => (
                        <td key={item2}>
                          <Skeleton height={24} variant="rectangular" />
                        </td>
                      )
                    )}
                  </tr>
                )
              )}
            </>
          ) : (
            <>
              {orderHistory?.docs?.map((item) => (
                <tr
                  className="table__data__row"
                  key={item?._id}
                  onClick={() => navigate(`/account/transaction/${item?._id}`)}
                >
                  <td>{getDate(item?.date)}</td>
                  <td>{item?.orderId}</td>
                  <td>{item?.shippingAddress}</td>
                  <td>{item?.orderStatus}</td>
                  <td>{item?.paidStatus}</td>
                  <td>
                    {process.env.REACT_APP_PRICE_SYMBOL +
                      item?.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </>
          )}
          <tr>
            <TablePagination
              rowsPerPage={limitNumber}
              rowsPerPageOptions={[5, 10, 15, 20, 25, 100]}
              page={pageNumber - 1}
              count={orderHistory?.totalDocs}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tbody>
      </table>
    </PurchaseHistoryStyle>
  );
};

export default PurchaseHistory;
