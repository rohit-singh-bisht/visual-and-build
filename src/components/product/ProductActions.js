import React from "react";
import styled from "styled-components";
import QuantityInput from "../common/QuantityInput";
import Button from "../common/Button";
import { ReactComponent as AddToCart } from "../../assets/add-to-cart.svg";
import { ReactComponent as AddToWishlist } from "../../assets/add-to-wishlist.svg";
import { useAppContext } from "../../context/useAppContext";

const commonStyles = `
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ProductActionsStyle = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 48px;
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
    cursor: pointer;
    transition: all 0.3s;
    ${commonStyles}
    &:hover {
      background-color: #ae0000;
      svg {
        path {
          fill: white;
        }
      }
    }
    svg {
      path {
        fill: #ae0000;
      }
    }
  }
  @media (max-width: 768px) {
    flex-wrap: wrap;
    margin-top: 32px;
    .buy__now {
      flex: 0 0 1;
      width: 100%;
    }
    .product__details__quantity {
      border-radius: 1px solid #dcdcdc;
      border-radius: 7.5px;
      .icon__wrapper {
        border-radius: 0px;
        width: 48px;
      }
      .number__input {
        width: 50px;
        font-size: 14px;
      }
    }
    .add__to__cart,
    .add__to__wishlist {
      width: 42px;
      height: 42px;
      svg {
        width: 18px;
      }
    }
  }
`;

const ProductActions = ({ onAddToCart, handleProductQuantity }) => {
  const { isDesktop } = useAppContext();
  return (
    <ProductActionsStyle>
      <QuantityInput
        handleProductQuantity={handleProductQuantity}
        className={"product__details__quantity"}
      />
      {isDesktop && <Button title={"Buy Now"} className="buy__now" />}
      <div className="add__to__cart" onClick={onAddToCart}>
        <AddToCart />
      </div>
      <div className="add__to__wishlist">
        <AddToWishlist />
      </div>
      {!isDesktop && <Button title={"Buy Now"} className="buy__now" />}
    </ProductActionsStyle>
  );
};

export default ProductActions;
