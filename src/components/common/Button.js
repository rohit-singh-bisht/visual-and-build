import React from "react";
import styled from "styled-components";

const ButtonStyle = styled.button`
  padding: 12px 30px;
  border-radius: 7.5px;
  background: #ae0000;
  color: #fff;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;
  &.dark {
    background: #000;
  }
  &:hover {
    background: #880202;
  }
  @media (max-width: 768px) {
    font-size: 12px;
    line-height: normal;
  }
`;

const SaveButtonStyle = styled.button`
  color: #fff;
  text-align: center;
  font-size: 11.25px;
  font-weight: 400;
  line-height: 18px;
  width: 150px;
  height: 37.5px;
  border-radius: 3px;
  border: 0.75px solid #fff;
  background: #ae0000;
  transition: all 0.3s;
  &:hover {
    border: 0.75px solid #ae0000;
    color: #ae0000;
    background: #fff;
  }
`;

const Button = ({ title, onClick, type, ...props }) => {
  if (type === "save") {
    return (
      <SaveButtonStyle onClick={onClick} {...props}>
        {title}
      </SaveButtonStyle>
    );
  }
  return (
    <ButtonStyle className={type} onClick={onClick} {...props}>
      {title}
    </ButtonStyle>
  );
};

export default Button;
