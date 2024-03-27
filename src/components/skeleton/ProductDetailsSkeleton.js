import React from "react";
import { Skeleton } from "@mui/material";
import { ReactComponent as ReviewStars } from "../../assets/reviewStars.svg";

const ProductDetailsSkeleton = () => {
  return (
    <div className="product__details">
      <div className="vendor__details__reviews">
        <Skeleton variant="rounded" width={74} height={22} />
        <div className="product__reviews">
          <Skeleton variant="rounded" width={84} height={22} />
        </div>
      </div>
      <Skeleton
        variant="rounded"
        width={"100%"}
        height={69}
        style={{ marginBottom: "20px" }}
      />
      <hr style={{ borderTop: "0.75px solid rgba(48, 48, 48, 0.25)" }} />
      <Skeleton
        variant="rounded"
        width={244}
        height={51}
        style={{ marginTop: "12px" }}
      />
      <div className="product__details__options">
        <div className="product__options">
          <h2 className="product__options__title">Brand</h2>
          <p className="product__options__value">The Drywall Company</p>
        </div>
        <div className="product__options">
          <h2 className="product__options__title">Model Number</h2>
          <p className="product__options__value">
            3D PVC Wall Panels Wave Design D026 (Pack of 6)
          </p>
        </div>
        <div className="product__options">
          <h2 className="product__options__title">Material</h2>
          <p className="product__options__value">PVC</p>
        </div>
        <div className="product__options">
          <h2 className="product__options__title">Finish</h2>
          <p className="product__options__value">Matte</p>
        </div>
        {/* <div className="product__options__variants">
          <ProductVariants name={"Variant"} />
        </div> */}
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
