import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRequest } from "../../hooks/useRequest";
import { VscSend } from "react-icons/vsc";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getDate } from "../../utils/helper";

const SupportChatStyle = styled.div`
  padding: 40px;
  .container {
    display: flex;
    gap: 40px;
    flex-wrap: wrap;
  }
  .chat__wrapper {
    flex: 1;
  }
  .page__title {
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
    margin-bottom: 8px;
    color: #000000;
  }
  .page__subtitle {
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: #898989;
  }
  .chat__body {
    padding: 24px;
    margin-top: 20px;
    border: 0.75px solid #d9d9d9;
    border-radius: 8px;
    position: relative;
    .chat__item__overflow {
      height: 500px;
      overflow: auto;
      padding-bottom: 20px;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .chat__item__wrapper {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
    }
    .chat__item {
      max-width: 80%;
      margin: 8px 0;
      .chat,
      .chat__date {
        background-color: #faf9f9;
        padding: 16px 20px;
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
        text-align: left;
        color: #000;
        border-radius: 4px;
      }
      .chat__date {
        color: #989898;
        margin-top: 8px;
        background-color: #fff;
        padding: 0;
      }
      &.user {
        margin-left: auto;
        .chat {
          border: 0.75px solid #d9d9d9;
          background-color: #ffffff;
        }
        .chat__date {
          text-align: right;
        }
      }
    }
  }
  .chat__footer {
    display: flex;
    gap: 12px;
    .chat__input {
      flex: 1;
      input {
        height: 42px;
        border: 1px solid #d9d9d9;
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
        width: 100%;
        padding: 0 16px;
        border-radius: 4px;
      }
    }

    .send__message__btn {
      height: 42px;
      width: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #000000;
      border-radius: 4px;
      .icon {
        font-size: 20px;
        color: #fff;
      }
    }
  }
`;

const SupportChat = () => {
  const [getResponse] = useRequest();
  const { ticketId } = useParams();
  const [chatData, setChatData] = useState();
  const [chatText, setChatText] = useState();

  const fetchResponse = async (id) => {
    const path = `/ticket/${id}/show`;
    const response = await getResponse({ path });
    if (!response?.success) {
      return toast.error(response.message);
    }
    setChatData(response?.data);
  };

  useEffect(() => {
    fetchResponse(ticketId);
  }, [ticketId]);

  const handleReplyToTicket = async (ticketId, chatText) => {
    const path = `/ticket/${ticketId}/respond`;
    const formData = new FormData();
    formData.append("message", chatText);
    setChatText("");
    const response = await getResponse({ path, method: "PUT", body: formData });
    if (!response?.success) {
      return toast.error(response.message);
    }
    setChatData(response?.data);
  };

  return (
    <SupportChatStyle>
      <div className="container">
        <div className="chat__wrapper">
          <div className="page__title">V&B Support</div>
          <div className="page__subtitle">Raise your ticket</div>
          <div className="chat__body">
            <div
              className="chat__item__overflow"
              onMouseOver={() => (document.body.style.overflow = "hidden")}
              onMouseOut={() => (document.body.style.overflow = "inherit")}
            >
              <div className="chat__item__wrapper">
                {chatData?.responds?.length &&
                  chatData?.responds?.map((item) => (
                    <div
                      key={item?._id}
                      className={`chat__item ${item?.sender}`}
                    >
                      <div className="chat">{item?.message}</div>
                      <div className="chat__date">
                        {getDate(item?.createdAt)}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="chat__footer">
              <div className="chat__input">
                <input
                  type="text"
                  value={chatText}
                  onChange={(e) => setChatText(e.target.value)}
                  placeholder="Message..."
                />
              </div>
              <div
                className="send__message__btn"
                onClick={() => handleReplyToTicket(ticketId, chatText)}
              >
                <VscSend className="icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SupportChatStyle>
  );
};

export default SupportChat;
