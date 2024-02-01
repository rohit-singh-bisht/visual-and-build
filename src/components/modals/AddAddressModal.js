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
  .add__address__modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    max-height: 80vh;
    padding: 40px;
  }
  .submit__button {
    text-align: right;
    margin-top: 120px;
  }
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
