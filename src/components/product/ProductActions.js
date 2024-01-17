import React from "react";
import styled from "styled-components";
import QuantityInput from "../common/QuantityInput";
import Button from "../common/Button";
import { ReactComponent as AddToCart } from "../../assets/add-to-cart.svg";
import { ReactComponent as AddToWishlist } from "../../assets/add-to-wishlist.svg";

const commonStyles = `
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ProductActionsStyle = styled.div`
  display: flex;
  gap: 12px;
  .product__details__quantity {
    .icon__wrapper {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background-color: #f4f2f2;
      ${commonStyles}
    }
    .icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
      &:focus,
      &:active,
      &:hover {
        outline: 0px solid rgb(48, 48, 48);
      }
    }
    .number__input {
      background-color: rgba(0, 0, 0, 0);
      color: #303030;
      font-size: 20px;
      font-weight: 600;
      line-height: 32px;
    }
  }
  .buy__now {
    height: 48px;
    padding: 0 30px;
  }
  .add__to__cart,
  .add__to__wishlist {
    border-radius: 7.5px;
    border: 0.75px solid #ae0000;
    background: #fff;
    width: 48px;
    height: 48px;
    ${commonStyles}
  }
`;

const ProductActions = () => {
  return (
    <ProductActionsStyle>
      <QuantityInput className={"product__details__quantity"} />
      <Button title={"Buy Now"} className="buy__now" />
      <div className="add__to__cart">
        <AddToCart />
      </div>
      <div className="add__to__wishlist">
        <AddToWishlist />
      </div>
    </ProductActionsStyle>
  );
};

export default ProductActions;
