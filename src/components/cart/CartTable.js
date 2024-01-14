import React from "react";
import styled from "styled-components";
import CartCard from "./CartCard";

const CartTableStyle = styled.div`
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
`;

const CartTable = ({ isSchedule }) => {
  return (
    <CartTableStyle>
      <div className="cart__items">
        <div className="cart__items__title">Cart Items</div>
        <div className="cart__items__table__head">
          <div className="table__heading">Product Details</div>
          <div className="table__heading">Price</div>
          <div className="table__heading">Quantity</div>
          <div className="table__heading">Total</div>
        </div>
        <div>
          <CartCard isSchedule={isSchedule} />
          <hr style={{ border: "0px", borderBottom: "0.75px solid #CCC2C2" }} />
          <CartCard isSchedule={isSchedule} />
          <hr style={{ border: "0px", borderBottom: "0.75px solid #CCC2C2" }} />
          <CartCard isSchedule={isSchedule} />
          <hr style={{ border: "0px", borderBottom: "0.75px solid #CCC2C2" }} />
          <CartCard isSchedule={isSchedule} />
          <hr style={{ border: "0px", borderBottom: "0.75px solid #CCC2C2" }} />
          <CartCard isSchedule={isSchedule} />
          <hr style={{ border: "0px", borderBottom: "0.75px solid #CCC2C2" }} />
          <CartCard isSchedule={isSchedule} />
        </div>
      </div>
    </CartTableStyle>
  );
};

export default CartTable;
