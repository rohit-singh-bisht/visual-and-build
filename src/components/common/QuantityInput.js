import React, { useState } from "react";
import styled from "styled-components";
import { IoIosAdd } from "react-icons/io";
import { IoIosRemove } from "react-icons/io";

const QuantityInputStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  .icon {
    font-size: 12px;
    user-select: none;
    cursor: pointer;
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

const QuantityInput = () => {
  const [count, setCount] = useState(1);

  const handleClick = (e) => {
    if (e === "remove" && count.current !== 1) {
      setCount((prev) => prev - 1);
    }
    if (e === "add") {
      setCount((prev) => prev + 1);
    }
  };

  return (
    <QuantityInputStyle>
      <IoIosRemove className="icon" onClick={() => handleClick("remove")} />
      <input value={count} className="number__input" />
      <IoIosAdd className="icon" onClick={() => handleClick("add")} />
    </QuantityInputStyle>
  );
};

export default QuantityInput;
