import React, { useEffect, useState } from "react";
import ListCard from "../../../components/account/ListCard";
import styled from "styled-components";
import { ReactComponent as PlusIcon } from "../../../assets/plus.svg";
import CreateWishlistModal from "../../../components/modals/CreateWishlistModal";
import { useRequest } from "../../../hooks/useRequest";

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
  const [isAddWishlistActive, setIsAddWishlistActive] = useState(false);
  const [getWishlist, { state: wishlistData }] = useRequest(
    `/wishlist?limit=10&page=1`
  );
  const [isRefetchWishlist, setIsRefetchWishlist] = useState(false);

  useEffect(() => {
    getWishlist();
  }, [isRefetchWishlist]);

  return (
    <ListsStyle>
      {wishlistData?.data?.map((item) => (
        <ListCard key={item?._id} title={item?.name} />
      ))}
      <AddProjectWishlistStyle onClick={() => setIsAddWishlistActive(true)}>
        <PlusIcon className="icon" />
        <div className="add__project__wishlist__title">
          Add project wishlist
        </div>
      </AddProjectWishlistStyle>
      {isAddWishlistActive && (
        <CreateWishlistModal
          onMaskClick={() => {
            setIsRefetchWishlist(true);
            setIsAddWishlistActive(false);
          }}
        />
      )}
    </ListsStyle>
  );
};

export default Lists;
