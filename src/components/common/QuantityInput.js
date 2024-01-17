import React, { useState } from "react";
import styled from "styled-components";
import { IoIosAdd } from "react-icons/io";
import { IoIosRemove } from "react-icons/io";

const QuantityInputStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  .icon__wrapper {
    cursor: pointer;
    user-select: none;
  }
  .icon {
    font-size: 14px;
    &:focus,
    &:active,
    &:hover {
      outline: 1px solid rgb(48, 48, 48);
    }
  }
  .number__input {
    width: 30px;
    height: 30px;
    background-color: #f2f1f1;
    line-height: 30px;
    border-radius: 30px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
  }
`;

const QuantityInput = ({ className }) => {
  const [count, setCount] = useState(1);

  const handleClick = (e) => {
    if (e === "remove" && count !== 1) {
      setCount((prev) => prev - 1);
    }
    if (e === "add") {
      setCount((prev) => prev + 1);
    }
  };

  return (
    <QuantityInputStyle className={className}>
      <div
        className="icon__wrapper remove"
        onClick={() => handleClick("remove")}
      >
        <IoIosRemove className="icon" />
      </div>
      <input value={count} className="number__input" />
      <div className="icon__wrapper add" onClick={() => handleClick("add")}>
        <IoIosAdd className="icon" />
      </div>
    </QuantityInputStyle>
  );
};

export default QuantityInput;
