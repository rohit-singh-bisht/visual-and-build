import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRequest } from "../../hooks/useRequest";
import { VscSend } from "react-icons/vsc";

const SupportChatStyle = styled.div`
  padding: 40px;
  .container {
    display: flex;
    gap: 40px;
    flex-wrap: wrap;
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
    }
    .chat__item {
      width: 80%;
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
  const [activeChatId, setActiveChatId] = useState();
  const [chatText, setChatText] = useState();

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
                <div className="chat__item">
                  <div className="chat">
                    Gorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc vulputate libero et velit interdum, ac aliquet odio
                    mattis. Class aptent taciti sociosqu ad litora torquent per
                    conubia nostra, per inceptos himenaeos
                  </div>
                  <div className="chat__date">20/8/2023</div>
                </div>
                <div className="chat__item user">
                  <div className="chat">
                    Gorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc vulputate libero et velit interdum, ac aliquet odio
                    mattis. Class aptent taciti sociosqu ad litora torquent per
                    conubia nostra, per inceptos himenaeos
                  </div>
                  <div className="chat__date">20/8/2023</div>
                </div>
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
              <div className="send__message__btn">
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
