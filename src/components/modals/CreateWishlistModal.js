import React from "react";
import styled from "styled-components";
import GenericModal from "./GenericModal";
import { useRequest } from "../../hooks/useRequest";

const CreateWishlistModalStyle = styled.div``;

const CreateWishlistModal = ({ onMaskClick }) => {
  const [createWishlist, { isLoading }] = useRequest();

  const handlePrimaryClick = () => {};

  return (
    <CreateWishlistModalStyle>
      <GenericModal
        modalTitle={"Create Instacart"}
        primaryButtonTitle={"Create"}
        onMaskClick={onMaskClick}
        onPrimaryButtonClick={handlePrimaryClick}
      ></GenericModal>
    </CreateWishlistModalStyle>
  );
};

export default CreateWishlistModal;
