import React from "react";
import styled from "styled-components";
import StyledMask from "../common/StyledMask";
import AddressForm from "../forms/address/AddressForm";

const AddAddressModalStyle = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

const AddAddressModal = ({ setIsAddressModal }) => {
  return (
    <>
      <AddAddressModalStyle>
        <StyledMask onClick={() => setIsAddressModal(false)} />
        <AddressForm />
      </AddAddressModalStyle>
    </>
  );
};

export default AddAddressModal;
