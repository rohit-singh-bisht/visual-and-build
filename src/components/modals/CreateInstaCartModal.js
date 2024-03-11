import React, { useState, useCallback } from "react";
import styled from "styled-components";
import GenericModal from "./GenericModal";
import { useRequest } from "../../hooks/useRequest";
import { toast } from "react-toastify";
import Progress from "../common/Progress";

const CreateInstaCartModalStyle = styled.div`
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

const CreateInstaCartModal = ({ onMaskClick }) => {
  const [instaCartName, setInstaCartName] = useState("");
  const [createInstaCart, { isLoading }] = useRequest();
  console.log("instaCartName", instaCartName);

  const handlePrimaryClick = useCallback(async () => {
    if (!instaCartName) return toast.error("Please enter your Instacart name");
    const response = await createInstaCart({
      path: `/instacart`,
      method: "POST",
      body: JSON.stringify({ name: instaCartName }),
    });
    if (!response.success) {
      return toast.error(response.message);
    }
    toast.success(response.message);
    onMaskClick();
    // eslint-disable-next-line
  }, [instaCartName]);

  return (
    <CreateInstaCartModalStyle>
      <GenericModal
        modalTitle={"Create Instacart"}
        primaryButtonTitle={"Create"}
        onMaskClick={onMaskClick}
        onPrimaryButtonClick={handlePrimaryClick}
      >
        <label htmlFor="name">Name Of the Cart</label>
        <input
          type="text"
          name="name"
          id="name"
          value={instaCartName}
          onChange={(e) => setInstaCartName(e.target.value)}
        />
      </GenericModal>
      {isLoading && <Progress />}
    </CreateInstaCartModalStyle>
  );
};

export default CreateInstaCartModal;
