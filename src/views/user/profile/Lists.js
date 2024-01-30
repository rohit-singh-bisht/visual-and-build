import React from "react";
import ListCard from "../../../components/account/ListCard";
import styled from "styled-components";
import { ReactComponent as PlusIcon } from "../../../assets/plus.svg";

const ListsStyle = styled.div`
  display: grid;
  gap: 31px;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
`;

const AddProjectWishlistStyle = styled.div`
  border-radius: 3.75px;
  border: 0.75px solid #000;
  background: #fff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 230px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.05);
  }
  .add__project__wishlist__title {
    color: #6f7373;
    font-size: 13.5px;
    font-weight: 500;
    line-height: 22.5px;
  }
`;

const Lists = () => {
  return (
    <ListsStyle>
      {Array.from({ length: 3 }, (_, index) => index + 1)?.map((item) => (
        <ListCard />
      ))}
      <AddProjectWishlistStyle>
        <PlusIcon className="icon" />
        <div className="add__project__wishlist__title">
          Add project wishlist
        </div>
      </AddProjectWishlistStyle>
    </ListsStyle>
  );
};

export default Lists;
