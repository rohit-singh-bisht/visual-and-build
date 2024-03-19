import React, { useState, useCallback } from "react";
import styled from "styled-components";
import StyledMask from "../common/StyledMask";
import AddressForm from "../forms/address/AddressForm";
import { toast } from "react-toastify";
import { useRequest } from "../../hooks/useRequest";
import Progress from "../common/Progress";

const AddAddressModalStyle = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  z-index: 9;
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

const AddAddressModal = ({ setIsAddressModal, setGetAddressUpdates }) => {
  const [addressData, setAddressData] = useState();
  const [addAddress, { isLoading }] = useRequest();

  const handleAddAddress = useCallback(async () => {
    if (isLoading) return;
    const path = `/address`;
    const response = await addAddress({
      path,
      method: "POST",
      body: JSON.stringify(addressData),
    });
    if (!response.success) {
      return toast.error(response.message);
    }
    toast.success(response.message);
    setIsAddressModal(false);
    setGetAddressUpdates && setGetAddressUpdates((prev) => !prev);
    // eslint-disable-next-line
  }, [addressData]);

  return (
    <>
      <AddAddressModalStyle>
        <StyledMask onClick={() => setIsAddressModal(false)} />
        <AddressForm setState={setAddressData} onClick={handleAddAddress} />
        {isLoading && <Progress />}
      </AddAddressModalStyle>
    </>
  );
};

export default AddAddressModal;
