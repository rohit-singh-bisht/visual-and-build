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
    .product__list__wrapper {
      width: 55%;
    }
    .chat__wrapper {
      width: calc(45% - 40px);
    }
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

const SupportChat = () => {
  const [getOrderHistory, { isLoading }] = useRequest();
  const [pageNumber, setPageNumber] = useState(1);
  const [limitNumber, setLimitNumber] = useState(10);
  const [orderHistory, setOrderHistory] = useState([]);
  const [activeChatId, setActiveChatId] = useState();
  const [chatText, setChatText] = useState();

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
    <SupportChatStyle>
      <div className="container">
        <div className="product__list__wrapper">
          <div className="page__title">
            Which item are you facing an issue with?
          </div>
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
