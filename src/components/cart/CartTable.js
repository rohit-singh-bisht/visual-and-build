import React from "react";
import styled from "styled-components";
import CartCard from "./CartCard";
import { useAppContext } from "../../context/useAppContext";
import { Skeleton } from "@mui/material";

const CartTableStyle = styled.div`
  flex: 1;
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
    .no_items_found {
      padding: 30px;
      text-align: center;
      color: #000;
      font-size: 16px;
      font-weight: 500;
    }
  }
  @media (max-width: 768px) {
    .cart__items {
      .cart__items__title {
        padding: 12px;
        font-size: 16px;
        border-bottom: 0.75px solid rgb(204, 194, 194);
      }
    }
  }
`;

const SkeletonStyle = styled.div`
  display: flex;
  gap: 10px;
  padding: 30px 24px;
  .skeleton {
    flex: 1;
    height: 70px;
    border-radius: 7.5px;
  }
`;

const CartTable = ({
  setIsCheckoutButtonDisabled,
  isSchedule,
  cartData,
  loading,
  setIsQtyChanged,
  instabuildId = "",
}) => {
  const { isDesktop } = useAppContext();

  return (
    <CartTableStyle>
      <div className="cart__items">
        <div className="cart__items__title">Cart Items</div>
        {isDesktop && (
          <div className="cart__items__table__head">
            <div className="table__heading">Product Details</div>
            <div className="table__heading">Price</div>
            <div className="table__heading">Quantity</div>
            <div className="table__heading">Total</div>
          </div>
        )}
        <div>
          {loading && !cartData ? (
            <SkeletonStyle>
              {Array?.from({ length: 5 }, (_, index) => index + 1)?.map(
                (item) => (
                  <Skeleton
                    key={item}
                    variant="rectangular"
                    className="skeleton"
                  />
                )
              )}
            </SkeletonStyle>
          ) : (
            <>
              {cartData && cartData?.length ? (
                cartData?.map((item, index) => {
                  if (item?.quantity > 0) {
                    return (
                      <div key={item?._id}>
                        <CartCard
                          src={
                            process.env.REACT_APP_MEDIA_ASSETS_URL +
                            "/" +
                            item?.product?.image
                          }
                          title={item?.product?.name}
                          isSchedule={isSchedule}
                          price={item?.product?.price}
                          itemQuantity={item?.quantity}
                          total={item?.quantity * item?.product?.price}
                          itemId={item?.product?.id}
                          setIsQtyChanged={setIsQtyChanged}
                          setIsCheckoutButtonDisabled={
                            setIsCheckoutButtonDisabled
                          }
                          product={item?.product}
                          instabuildId={instabuildId}
                        />
                        <hr
                          style={{
                            border: "0px",
                            borderBottom: "0.75px solid #CCC2C2",
                          }}
                        />
                      </div>
                    );
                  }
                  return "";
                })
              ) : (
                <div className="no_items_found">
                  No items found in your cart
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </CartTableStyle>
  );
};

export default CartTable;
