import React from "react";
import styled from "styled-components";
import IconWithTextList from "../../components/common/IconWithTextList";
import CartTable from "../../components/cart/CartTable";
import CartOrderSummary from "../../components/cart/CartOrderSummary";

const CartStyle = styled.div`
  padding-top: 70px;
  .page__title {
    color: #303030;
    font-size: 42px;
    font-weight: 700;
    line-height: 51px;
    margin-bottom: 20px;
  }
  .cart__wrapper {
    display: flex;
    gap: 15px;
  }
  .icon__with__text {
    padding: 60px 0;
    margin-top: 60px;
    border-top: 1px solid rgba(48, 48, 48, 0.25);
  }
`;

const Cart = () => {
  return (
    <CartStyle>
      <div className="container">
        <div className="page__title">Your Cart</div>
        <div className="cart__wrapper">
          <CartTable />
          <div>
            <CartOrderSummary />
          </div>
        </div>
      </div>
      <div className="icon__with__text">
        <div className="container">
          <IconWithTextList />
        </div>
      </div>
    </CartStyle>
  );
};

export default Cart;
