import React from "react";
import styled from "styled-components";
import GroupBuy from "./GroupBuy";
import GroupBuySkeleton from "../skeleton/GroupBuySkeleton";
import { getProductImages } from "../../utils/helper";

const GroupBuyListStyle = styled.div`
  .group_buy {
    margin: 100px auto;
    .group__buy__title__wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 76px;
      .group__buy__title {
        color: #303030;
        font-size: 27px;
        font-weight: 600;
        line-height: 34.5px;
      }
      .group__buy__button {
        color: #ae0000;
        font-size: 16.5px;
        font-weight: 600;
        background: none;
      }
    }
    .group__buy__products {
      display: flex;
      flex-direction: column;
      gap: 100px;
    }
  }
`;

const GroupBuyList = ({ groupBuyList, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <div className="container">
          <GroupBuySkeleton className="group__buy__item" />
        </div>
      ) : (
        <GroupBuyListStyle>
          <div className="container group_buy">
            <div className="group__buy__title__wrapper">
              <p className="group__buy__title">Group By</p>
              <button className="group__buy__button">See all options</button>
            </div>
            <div className="group__buy__products">
              {groupBuyList?.map((item, index) => {
                const { name, price, numReviews } = item;
                const productImages = getProductImages(item);
                return (
                  <GroupBuy
                    key={item?.id}
                    reverse={index % 2 !== 0 ? "true" : "false"}
                    productTitle={name}
                    productPrice={price}
                    reviewsCount={numReviews}
                    images={productImages}
                  />
                );
              })}
            </div>
          </div>
        </GroupBuyListStyle>
      )}
    </>
  );
};

export default GroupBuyList;
