import React from "react";
import { GroupBuyStyle } from "../common/GroupBuy";
import { ReactComponent as ReviewStars } from "../../assets/reviewStars.svg";
import { Skeleton } from "@mui/material";

const GroupBuySkeleton = () => {
  return (
    <GroupBuyStyle>
      <div className="product__image">
        <Skeleton variant="rounded" height={"100%"} />
      </div>
      <div className="product__details">
        <div className="product__ratings">
          <ReviewStars />
          <Skeleton variant="rounded" width={102} height={23} />
        </div>
        <p className="product__title">
          <Skeleton variant="rounded" width={"100%"} height={35} />
        </p>
        <p className="product__description">
          <Skeleton variant="rounded" width={"100%"} height={64} />
        </p>
        <div className="product__price">
          <div className="product__selling__price">
            <Skeleton variant="rounded" width={161} height={51} />
          </div>
          <div className="product__cost__price">
            <Skeleton variant="rounded" width={65} height={23} />
          </div>
        </div>
        <div className="product__variants">
          <Skeleton variant="rounded" width={110} height={40} />
          <Skeleton variant="rounded" width={110} height={40} />
          <Skeleton variant="rounded" width={110} height={40} />
        </div>
        <Skeleton variant="rounded" width={327} height={42} />
      </div>
    </GroupBuyStyle>
  );
};

export default GroupBuySkeleton;
