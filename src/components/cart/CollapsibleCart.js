import React, { useRef, useState } from "react";
import styled from "styled-components";
import CartTable from "./CartTable";
import { IoChevronDown } from "react-icons/io5";
import CartOrderSummary from "./CartOrderSummary";

const CollapsibleCartStyle = styled.div`
  margin-top: 50px;
  .cart__main__title {
    color: #000;
    font-size: 22.5px;
    font-weight: 600;
    padding: 28px 56px;
    border-radius: 6.75px;
    background: #f4f4f4;
    display: flex;
    cursor: pointer;
    justify-content: space-between;
    margin-bottom: 35px;
    &.active {
      .icon {
        transform: rotate(0deg);
      }
    }
    .icon {
      transition: all 0.3s ease-in-out;
      transform: rotate(-180deg);
      font-size: 20px;
    }
  }
  .cart__wrapper {
    transition: all 0.3s ease-in-out;
    overflow: hidden;
  }
  @media (max-width: 768px) {
    margin-top: 40px;
    .cart__main__title {
      font-size: 16px;
      padding: 20px;
    }
  }
`;

const CollapsibleCart = ({
  title,
  cartData,
  loading,
  setIsQtyChanged,
  setIsCheckoutButtonDisabled,
  instabuildId,
  isCheckoutButtonDisabled,
  isQtyChanged,
}) => {
  const [isActive, setIsActive] = useState(false);
  const heightRef = useRef();

  return (
    <CollapsibleCartStyle>
      <div
        className={`cart__main__title ${isActive ? "active" : ""}`}
        onClick={() => setIsActive(!isActive)}
      >
        {title}
        <IoChevronDown className="icon" />
      </div>
      <div
        className="cart__wrapper"
        ref={heightRef}
        style={{ height: isActive ? heightRef?.current?.scrollHeight : 0 }}
      >
        <CartTable
          loading={loading}
          cartData={cartData?.items}
          isSchedule={true}
          setIsQtyChanged={setIsQtyChanged}
          setIsCheckoutButtonDisabled={setIsCheckoutButtonDisabled}
          instabuildId={instabuildId}
        />
        {cartData?.items?.length > 0 && (
          <div className="cart__order__summary__hodler">
            <CartOrderSummary
              cartData={cartData}
              isQtyChanged={isQtyChanged}
              isCheckoutButtonDisabled={isCheckoutButtonDisabled}
            />
          </div>
        )}
      </div>
    </CollapsibleCartStyle>
  );
};

export default CollapsibleCart;
