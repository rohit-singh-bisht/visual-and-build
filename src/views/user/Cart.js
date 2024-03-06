import React, { useEffect } from "react";
import styled from "styled-components";
import IconWithTextList from "../../components/common/IconWithTextList";
import CartTable from "../../components/cart/CartTable";
import CartOrderSummary from "../../components/cart/CartOrderSummary";
import CollapsibleCart from "../../components/cart/CollapsibleCart";
import { useRequest } from "../../hooks/useRequest";

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
  @media (max-width: 768px) {
    padding-top: 30px;
    .page__title {
      font-size: 24px;
      line-height: 32px;
    }
    .cart__wrapper {
      flex-wrap: wrap;
      .cart__order__summary__hodler {
        width: 100%;
      }
    }
  }
`;

const Cart = () => {
  const [getCart, { isLoading, state: cartData }] = useRequest();

  useEffect(() => {
    (async function () {
      const path = ``;
      await getCart(``);
    })();
  }, []);

  console.log("cartData", cartData);

  return (
    <CartStyle>
      <div className="container">
        <div className="page__title">Your Cart</div>
        <div className="cart__wrapper">
          <CartTable cartData={cartData?.data?.docs} />
          <div className="cart__order__summary__hodler">
            <CartOrderSummary />
          </div>
        </div>
        <CollapsibleCart />
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
