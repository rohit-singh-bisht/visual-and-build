import React from "react";
import styled from "styled-components";

const ListCardStyled = styled.div`
  border-radius: 3.75px;
  border: 0.75px solid #000;
  background: #fff;
  .list__card__title {
    color: #000;
    font-size: 18px;
    font-weight: 700;
    line-height: 22.5px;
    margin-bottom: 4.75px;
  }
  .list__card__button {
    border-radius: 3.75px;
    border: 1.5px solid #ae0000;
    background: #fff;
    height: 42px;
    color: #ae0000;
    font-size: 13.5px;
    font-weight: 500;
    line-height: 22.5px;
  }
`;

const ListCard = ({ title, onClick }) => {
  return (
    <ListCardStyled>
      <div className="list__card__title">{title}</div>
      <div className="list__card__subtitle">Wishlist</div>
      <button className="list__card__button" onClick={onClick}>
        View
      </button>
    </ListCardStyled>
  );
};

export default ListCard;
