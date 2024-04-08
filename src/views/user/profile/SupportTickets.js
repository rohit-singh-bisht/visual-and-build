import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRequest } from "../../../hooks/useRequest";
import TablePagination from "@mui/material/TablePagination";
import { Skeleton } from "@mui/material";
import CreateTicketModal from "../../../components/modals/CreateTicketModal";
import { FaRegEye } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SupportTicketsStyle = styled.div`
  flex: 1;
  position: relative;
  .create__new__ticket {
    position: absolute;
    top: -70px;
    right: 0;
    padding: 12px 24px;
    background-color: #ae0000;
    color: #fff;
    border-radius: 4px;
    font-weight: 600;
    &:hover {
      background-color: #880a0a;
    }
  }
  table {
    width: 100%;
    border-collapse: collapse;
    th,
    td {
      padding: 10px 16px;
      font-size: 12px;
      font-weight: 400;
      line-height: 22px;
      text-align: left;
      border: 1px solid #d2d1d1;
      width: 10%;
      text-transform: capitalize;
      p {
        font-size: 12px;
        font-weight: 400;
        line-height: 22px;
      }
      span {
        display: inline-block;
        padding: 0px 10px;
        height: 20px;
        line-height: 18px;
        font-size: 10px;
        border-radius: 2px;
      }
      .low {
        background-color: #f5f5f5;
        border: 1px solid #bebebe;
        color: #bebebe;
      }
      .medium {
        background-color: #fffacd;
        border: 1px solid #ffd700;
        color: #c3a400;
      }
      .high,
      .closed {
        background-color: #ffe4e1;
        border: 1px solid #ff6347;
        color: #fe0000;
      }
      .open {
        background-color: #e0eae3;
        border: 1px solid #228b22;
        color: #228b22;
      }
    }
    th {
      font-weight: 600;
      font-size: 14px;
    }
    .action__icons__wrapper {
      display: flex;
      gap: 20px;
      .icon {
        font-size: 16px;
        cursor: pointer;
        &.view {
          color: #5d99ff;
        }
        &.close {
          border: 0px;
          background: #fff;
        }
      }
    }
  }
`;

const SupportTickets = () => {
  const [handleRequest] = useRequest();
  const [ticketData, setTicketData] = useState([]);
  const [isFetchingTickets, setIsFetchingTickets] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [limitNumber, setLimitNumber] = useState(10);
  const [isCreateModal, setIsCreateModal] = useState(false);
  const navigate = useNavigate();

  const fetchTickets = async (pageNumber, limitNumber) => {
    setIsFetchingTickets(true);
    const path = `/ticket?limit=${limitNumber}&page=${pageNumber}`;
    // &search=&date=&status=
    const response = await handleRequest({ path });
    setIsFetchingTickets(false);
    if (response?.success) {
      setTicketData(response?.data);
    }
  };

  useEffect(() => {
    !isCreateModal && fetchTickets(pageNumber, limitNumber);
  }, [pageNumber, limitNumber, isCreateModal]);

  const handlePageChange = (event, newPage) => {
    setPageNumber(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setLimitNumber(+event.target.value);
    setPageNumber(1);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setIsCreateModal(true);
  };

  const handleCloseClick = async (ticketId) => {
    const path = `/ticket/${ticketId}/close`;
    const response = await handleRequest({ path, method: "PUT" });
    if (!response.success) {
      return toast.error(response.message);
    }
    toast.success(response.message);
    fetchTickets(pageNumber, limitNumber);
  };

  const handleViewClick = (ticketId) => {
    navigate(`/chat-support/${ticketId}`);
  };

  return (
    <SupportTicketsStyle>
      <button className="create__new__ticket" onClick={handleCreate}>
        Create Ticket
      </button>
      <table>
        <thead>
          <tr>
            <th>Ticket Id</th>
            <th>Subject</th>
            <th>Date</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {isFetchingTickets ? (
            <>
              {Array.from({ length: limitNumber }, (_, index) => index + 1).map(
                (item) => (
                  <tr key={item}>
                    {Array.from({ length: 6 }, (_, index) => index + 1).map(
                      (item2) => (
                        <td key={item2}>
                          <Skeleton
                            height={24}
                            width={"100%"}
                            variant="rectangular"
                          />
                        </td>
                      )
                    )}
                  </tr>
                )
              )}
            </>
          ) : (
            <>
              {ticketData?.docs?.map((item) => (
                <tr key={item?._id}>
                  <td>{item?.ticketId}</td>
                  <td>{item?.subject}</td>
                  <td>{item?.createdAt}</td>
                  <td>
                    <span className={item?.priority}>{item?.priority}</span>
                  </td>
                  <td>
                    <span className={item?.status}>{item?.status}</span>
                  </td>
                  <td>
                    <div className="action__icons__wrapper">
                      <FaRegEye
                        className="icon view"
                        title="View"
                        onClick={() => handleViewClick(item?._id)}
                      />
                      {item?.status === "open" && (
                        <RxCross2
                          className="icon close"
                          title="Close Ticket"
                          onClick={() => handleCloseClick(item?._id)}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {!ticketData?.docs?.length && (
                <tr key="no-tickets">
                  <td colSpan="6">No tickets found!</td>
                </tr>
              )}
            </>
          )}
          <tr>
            <TablePagination
              rowsPerPage={limitNumber}
              rowsPerPageOptions={[5, 10, 15, 20, 25, 100]}
              page={pageNumber - 1}
              count={ticketData?.totalDocs}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tbody>
      </table>
      {isCreateModal && (
        <CreateTicketModal handleClose={() => setIsCreateModal(false)} />
      )}
    </SupportTicketsStyle>
  );
};

export default SupportTickets;
