import React, { useEffect, useState } from "react";
import styled from "styled-components";
import IconWithTextList from "../../components/common/IconWithTextList";
import CartTable from "../../components/cart/CartTable";
import CartOrderSummary from "../../components/cart/CartOrderSummary";
import CollapsibleCart from "../../components/cart/CollapsibleCart";
import { useRequest } from "../../hooks/useRequest";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/common/Button";
import { useAppContext } from "../../context/useAppContext";

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

const MissingCartItems = styled.div`
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.2);
  max-width: 1260px;
  margin: 48px auto;
  padding: 40px;
  text-align: center;
  .title {
    font-size: 18px;
    font-weight: 500;
  }
  .subtitle {
    font-size: 14px;
    margin-top: 10px;
  }
  button {
    padding: 4px 30px;
    border-radius: 4px;
    margin-top: 24px;
  }
  .empty_cart {
    width: 300px;
    display: block;
    margin: -30px auto 0;
  }
`;

const Cart = () => {
  const [getCart, { isLoading: isFetchingCarts }] = useRequest();
  const auth = useAuth();
  const { setIsAuthForm } = useAppContext();
  const [isQtyChanged, setIsQtyChanged] = useState(false);
  const [cartData, setCartData] = useState();
  const [instacartData, setInstacartData] = useState([]);

  useEffect(() => {
    (async function () {
      const path = `/instacart?limit=20&page=1`;
      const response = await getCart({ path });
      if (response.success) {
        response.data.forEach((item) => {
          if (!item?.isInstabuild) {
            return setCartData(item);
          } else {
            return setInstacartData((prev) => [
              ...prev?.filter((data) => data?._id !== item?._id),
              item,
            ]);
          }
        });
      }
    })();

    // eslint-disable-next-line
  }, [isQtyChanged]);

  if (!auth) {
    return (
      <MissingCartItems>
        <img
          src="/images/empty_cart.png"
          className="empty_cart"
          alt="Empty Cart"
        />
        <h2 className="title">Missing Cart items?</h2>
        <p className="subtitle">Login to see the items you added previously</p>
        <Button title={"Login"} onClick={() => setIsAuthForm(true)} />
      </MissingCartItems>
    );
  }

  console.log("instacartData", instacartData);
  return (
    <CartStyle>
      <div className="container">
        <div className="page__title">Your Cart</div>
        <div className="cart__wrapper">
          <CartTable
            loading={isFetchingCarts}
            cartData={cartData?.items}
            setIsQtyChanged={setIsQtyChanged}
          />
          <div className="cart__order__summary__hodler">
            <CartOrderSummary isQtyChanged={isQtyChanged} cartData={cartData} />
          </div>
        </div>
        {instacartData?.map((item) => (
          <CollapsibleCart
            key={item?._id}
            loading={isFetchingCarts}
            title={item?.name}
            cartData={item}
            setIsQtyChanged={setIsQtyChanged}
          />
        ))}
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
