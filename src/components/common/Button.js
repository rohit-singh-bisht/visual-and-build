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
`;

const Button = ({ title, onClick, type, ...props }) => {
  return (
    <ButtonStyle className={type} onClick={onClick} {...props}>
      {title}
    </ButtonStyle>
  );
};

export default Button;
