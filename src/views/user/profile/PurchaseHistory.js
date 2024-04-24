import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRequest } from "../../../hooks/useRequest";
import { Skeleton } from "@mui/material";
import { getDate } from "../../../utils/helper";
import TablePagination from "@mui/material/TablePagination";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import useDebounce from "../../../hooks/useDebounce";
import Sort from "../../../components/common/Sort";

const PurchaseHistoryStyle = styled.div`
  flex: 1;
  > .subtitle {
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
    table-layout: fixed;
    tr {
      th,
      td {
        padding: 10px;
        font-size: 12px;
        font-weight: 400;
        line-height: 22px;
        text-align: left;
        border: 1px solid #d2d1d1;
        width: 10%;
        text-transform: capitalize;
        &:nth-child(2) {
          width: 8%;
        }
        &:nth-last-child(2),
        &:nth-last-child(3) {
          text-align: center;
          text-transform: capitalize;
        }
        &:last-child {
          text-align: end;
        }
        &:nth-child(3) {
          width: 25%;
          word-break: break-word;
        }
        &.payment__ref {
          width: 18%;
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

const PurchaseHistorySort = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  background-color: #f2f2f2;
  padding: 12px;
  border: 0.77px solid #cccccc;
  .purchase__history__date__range,
  .purchase__history__search {
    flex: 1;
  }
  .filter__title {
    font-size: 10px;
    font-weight: 400;
    line-height: 18px;
    text-align: left;
    margin-bottom: 2px;
  }
  .date__filter {
    display: flex;
    gap: 4px;
    .date {
      height: 32px;
      padding: 4px 10px;
      border-radius: 3px;
      font-size: 12px;
      color: #303030;
      cursor: pointer;
    }
  }
  .purchase__history__clear {
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    text-align: left;
    color: #286fad;
    text-underline-offset: 1px;
    cursor: pointer;
    padding-right: 30px;
    &:hover {
      text-decoration: underline;
    }
  }
  .purchase__history__sorting__styled {
    background-color: #fff;
    border-radius: 3px;
    .product__current__sorting {
      height: 32px;
      padding: 4px 10px;
      font-weight: 400;
      color: #303030;
    }
    .products__sorting__dropdown__wrapper {
      width: 130px;
    }
  }
`;

const SearchbarStyle = styled.form`
  height: 32px;
  display: flex;
  position: relative;
  border-radius: 3px;
  overflow: clip;
  width: 100%;
  input {
    height: 32px;
    width: 100%;
    padding: 0 12px;
    font-size: 12px;
  }
  .search__button {
    width: 39px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ae0000;
    .icon {
      display: block;
      color: #fff;
      font-size: 18px;
    }
  }
`;

const sortingOptions = [
  {
    label: "Select Option",
    value: "",
  },
  {
    label: "Order Id (Ascending)",
    value: "orderId",
    sortOrder: "asc",
  },
  {
    label: "Order Id (Descending)",
    value: "orderId",
    sortOrder: "desc",
  },
  {
    label: "Subtotal",
    value: "subtotal",
  },
  {
    label: "Total",
    value: "total",
  },
];

const orderStatusOptions = [
  {
    label: "Select Option",
    value: "",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Processing",
    value: "processing",
  },
  {
    label: "Delivered",
    value: "delivered",
  },
  {
    label: "Cancelled",
    value: "cancelled",
  },
  {
    label: "Return",
    value: "return",
  },
];

const PurchaseHistory = () => {
  const [getOrderHistory, { isLoading }] = useRequest();
  const [fetchInstaCarts, { state: instacarts }] = useRequest(
    `/instacart?limit=10&page=1`
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [limitNumber, setLimitNumber] = useState(10);
  const [orderHistory, setOrderHistory] = useState([]);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState(sortingOptions[0]?.value);
  const [sortOrder, setSortOrder] = useState("");
  const [sortLabel, setSortLabel] = useState(sortingOptions[0]?.label);
  const [orderStatus, setOrderStatus] = useState("");
  const [project, setProject] = useState("");
  const [projectOptions, setProjectOptions] = useState([
    {
      label: "Select Option",
      value: "",
    },
  ]);
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });

  useDebounce(
    () => {
      pageNumber &&
        limitNumber &&
        fetchOrderSummary(
          pageNumber,
          limitNumber,
          searchValue,
          orderStatus,
          sortOrder,
          sortBy,
          date,
          project
        );
    },
    [
      pageNumber,
      limitNumber,
      searchValue,
      orderStatus,
      sortOrder,
      sortBy,
      date,
      project,
    ],
    500
  );

  const fetchOrderSummary = async (
    pageNumber,
    limitNumber,
    searchValue,
    orderStatus,
    sortOrder,
    sortBy,
    date,
    project
  ) => {
    const path = `/order?${limitNumber ? `limit=${limitNumber}` : ""}${
      pageNumber ? `&page=${pageNumber}` : ""
    }${searchValue ? `&search=${searchValue}&` : ""}${
      orderStatus ? `&orderStatus=${orderStatus}&` : ""
    }${sortBy ? `&sortBy=${sortBy}` : ""}${
      sortOrder ? `&sortOrder=${sortOrder}` : ""
    }${
      date?.startDate && date?.endDate
        ? `&startDate=${date?.startDate}&endDate=${date?.endDate}`
        : ""
    }${project && `&project=${project}`}`;
    const response = await getOrderHistory({ path });
    if (response.success) {
      setOrderHistory(response?.data);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPageNumber(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setLimitNumber(+event.target.value);
    setPageNumber(1);
  };

  const handleSortClick = (item) => {
    if (
      (item?.value === sortBy && item?.sortOrder === sortOrder) ||
      (!item?.value && !sortBy)
    ) {
      return;
    }
    setSortBy(item?.value);
    setSortOrder(item?.sortOrder);
    setSortLabel(item?.label);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClearAll = () => {
    setSortBy(sortingOptions[0]?.value);
    setSortOrder("");
    setSortLabel(sortingOptions[0]?.label);
    setOrderStatus("");
    setDate({
      startDate: "",
      endDate: "",
    });
    setSearchValue("");
    setProject("");
  };

  useEffect(() => {
    fetchInstaCarts();
  }, []);

  useEffect(() => {
    if (instacarts?.data?.length) {
      const options = instacarts?.data
        ?.filter((item) => item?.isInstabuild)
        ?.map((item) => ({
          label: item?.name,
          value: item?._id,
        }));
      setProjectOptions((prev) => [
        {
          label: "Select Option",
          value: "",
        },
        ...options,
      ]);
    }
  }, [instacarts]);

  return (
    <PurchaseHistoryStyle>
      <p className="subtitle">Here is a history of all your purchases made.</p>
      <PurchaseHistorySort className="purchase__history__sort__filters">
        <div className="purchase__history__date__range">
          <p className="filter__title">Date Range</p>
          <div className="date__filter">
            <input
              type="date"
              className="date"
              name="startDate"
              value={date?.startDate}
              onChange={(e) => handleDateChange(e)}
              max={date?.endDate}
              onKeyDown={(e) => e.preventDefault()}
            />
            <input
              type="date"
              className="date"
              name="endDate"
              value={date?.endDate}
              min={date?.startDate}
              onChange={(e) => handleDateChange(e)}
              onKeyDown={(e) => e.preventDefault()}
            />
          </div>
        </div>
        <div className="purchase__history__filter">
          <p className="filter__title">Project</p>
          <Sort
            sortTitle=""
            sortingOptions={projectOptions}
            label={
              projectOptions?.find((item) => item?.value === project)?.label
            }
            className={"purchase__history__sorting__styled"}
            onSortClick={(item) => setProject(item?.value)}
          />
        </div>
        <div className="purchase__history__filter">
          <p className="filter__title">Order Status</p>
          <Sort
            sortTitle=""
            sortingOptions={orderStatusOptions}
            label={
              orderStatusOptions?.find((item) => item?.value === orderStatus)
                ?.label
            }
            className={"purchase__history__sorting__styled"}
            onSortClick={(item) => setOrderStatus(item?.value)}
          />
        </div>
        <div className="purchase__history__filter">
          <p className="filter__title">Sort By</p>
          <Sort
            sortTitle=""
            sortingOptions={sortingOptions}
            label={sortLabel}
            className={"purchase__history__sorting__styled"}
            onSortClick={handleSortClick}
          />
        </div>
        <div className="purchase__history__search">
          <SearchbarStyle>
            <input
              type="search"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button type="submit" className="search__button">
              <FiSearch className="icon" />
            </button>
          </SearchbarStyle>
        </div>
        <div className="purchase__history__clear" onClick={handleClearAll}>
          Clear All
        </div>
      </PurchaseHistorySort>
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
            <th>Address</th>
            <th>Order Status</th>
            <th className="payment__ref">Payment Ref Number</th>
            <th>Payment Status</th>
            <th>Subtotal</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <>
              {Array.from({ length: limitNumber }, (_, index) => index + 1).map(
                (item) => (
                  <tr key={item}>
                    {Array.from({ length: 8 }, (_, index) => index + 1).map(
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
                  <td className="payment__ref">
                    {item?.paymentRefNumber || "N/A"}
                  </td>
                  <td>{item?.paidStatus}</td>
                  <td>
                    {process.env.REACT_APP_PRICE_SYMBOL +
                      item?.subtotal.toFixed(2)}
                  </td>
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
