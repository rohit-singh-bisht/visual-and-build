import React, { useState } from "react";
import styled from "styled-components";
import GenericModal from "./GenericModal";
import { useRequest } from "../../hooks/useRequest";
import { toast } from "react-toastify";

const CreateWishlistModalStyle = styled.div`
  .modal__body {
    padding: 45px 52px;
  }
  label {
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
    text-align: left;
    color: #929292;
    display: inline-block;
    margin-bottom: 18px;
  }
  input {
    width: 100%;
    height: 65px;
    border-radius: 10px;
    border: 1px solid #000000;
    font-size: 20px;
    padding: 0 18px;
  }
`;

const CreateWishlistModal = ({ onMaskClick }) => {
  const [createWishlist, { isLoading }] = useRequest();
  const [wishlistName, setWishlistName] = useState();

  const handlePrimaryClick = async () => {
    if (!wishlistName) return toast.error("Please enter your Instacart name");
    const response = await createWishlist({
      path: `/wishlist/create`,
      method: "POST",
      body: JSON.stringify({ name: wishlistName }),
    });
    if (!response.success) {
      return toast.error(response.message);
    }
    toast.success(response.message);
    onMaskClick();
  };

  return (
    <CreateWishlistModalStyle>
      <GenericModal
        modalTitle={"Add Wishlist"}
        primaryButtonTitle={"Create"}
        onMaskClick={onMaskClick}
        onPrimaryButtonClick={handlePrimaryClick}
      >
        <label htmlFor="name">Name Of Wishlist</label>
        <input
          type="text"
          name="name"
          id="name"
          value={wishlistName}
          onChange={(e) => setWishlistName(e.target.value)}
        />
      </GenericModal>
    </CreateWishlistModalStyle>
  );
};

export default CreateWishlistModal;
