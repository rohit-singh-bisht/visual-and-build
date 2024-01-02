import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { ProductCardStyle } from "../components/ProductCard";

const ProductCardSkeleton = () => {
  return (
    <ProductCardStyle>
      <div className="image">
        <Skeleton animation="wave" variant="rounded" height={150} />
      </div>
      <div className="content">
        <p className="product__tag">
          <Skeleton animation="wave" variant="rounded" width={40} height={12} />
        </p>
        <p className="product__title">
          <Skeleton animation="wave" variant="rounded" height={32} />
        </p>
        <div className="product__price__wrapper">
          <div className="product__discounted__price">
            <Skeleton
              animation="wave"
              variant="rounded"
              width={62}
              height={22}
            />
          </div>
          <div className="product__price">
            <Skeleton
              animation="wave"
              variant="rounded"
              width={44}
              height={16}
            />
          </div>
        </div>
      </div>
    </ProductCardStyle>
  );
};

export default ProductCardSkeleton;
