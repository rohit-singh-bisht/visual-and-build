import React from "react";
import styled from "styled-components";
import CartCard from "../../components/cart/CartCard";
import IconWithTextList from "../../components/common/IconWithTextList";

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
  }
  .cart__items {
    flex: 1;
    border-radius: 12px;
    border: 0.75px solid #ccc2c2;
    background: #fff;
    .cart__items__title {
      color: #000;
      font-size: 22.5px;
      font-weight: 600;
      padding: 24px;
    }
    .cart__items__table__head {
      background-color: #ae0000;
      padding: 16px 30px 16px 24px;
      display: flex;
      gap: 10px;
      .table__heading {
        color: #fefefe;
        font-size: 16.5px;
        font-weight: 500;
        text-align: center;
        flex: 0 0 120px;
        &:first-child {
          flex: 1;
          text-align: left;
        }
        &:last-child {
          text-align: right;
          flex: 0 0 85px;
        }
      }
    }
  }
  .cart__order__summary {
    flex: 0 0 380px;
  }
  .icon__with__text {
    padding: 60px 0;
    margin-top: 60px;
  }
`;

const Cart = () => {
  return (
    <CartStyle>
      <div className="container">
        <div className="page__title">Your Cart</div>
        <div className="cart__wrapper">
          <div className="cart__items">
            <div className="cart__items__title">Cart Items</div>
            <div className="cart__items__table__head">
              <div className="table__heading">Product Details</div>
              <div className="table__heading">Price</div>
              <div className="table__heading">Quantity</div>
              <div className="table__heading">Total</div>
            </div>
            <div>
              <CartCard />
              <hr
                style={{ border: "0px", borderBottom: "0.75px solid #CCC2C2" }}
              />
              <CartCard />
              <hr
                style={{ border: "0px", borderBottom: "0.75px solid #CCC2C2" }}
              />
              <CartCard />
              <hr
                style={{ border: "0px", borderBottom: "0.75px solid #CCC2C2" }}
              />
              <CartCard />
              <hr
                style={{ border: "0px", borderBottom: "0.75px solid #CCC2C2" }}
              />
              <CartCard />
              <hr
                style={{ border: "0px", borderBottom: "0.75px solid #CCC2C2" }}
              />
              <CartCard />
            </div>
          </div>
          <div className="cart__order__summary"></div>
        </div>
        <div className="icon__with__text">
          <IconWithTextList />
        </div>
      </div>
    </CartStyle>
  );
};

export default Cart;
