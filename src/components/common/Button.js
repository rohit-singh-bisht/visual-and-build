import React from "react";
import styled from "styled-components";

const ButtonStyle = styled.button`
  padding: 16px 40px;
  border-radius: 10px;
  background: #ae0000;
  color: #fff;
  font-size: 20px;
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
