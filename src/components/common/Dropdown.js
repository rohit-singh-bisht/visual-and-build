import React from "react";
import styled from "styled-components";

const DropdownStyle = styled.div`
  position: absolute;
  border: 0.75px solid rgba(48, 48, 48, 0.5);
  border-radius: 6px;
  .dropdown__options {
    padding: 8px 12px;
    font-size: 11.25px;
    font-weight: 400;
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, 0.02);
    }
  }
`;

const Dropdown = ({ options, left, right, top, bottom, setValue, zIndex }) => {
  const handleDropdownClick = (val) => {
    setValue(val);
  };

  return (
    <DropdownStyle style={{ left, right, top, bottom, zIndex }}>
      {options &&
        options?.map((item) => {
          return (
            <div
              className="dropdown__options"
              onClick={() => handleDropdownClick(item?.value)}
            >
              {item?.label}
            </div>
          );
        })}
    </DropdownStyle>
  );
};

export default Dropdown;
