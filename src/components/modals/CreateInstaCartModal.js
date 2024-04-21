import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import GenericModal from "./GenericModal";
import { useRequest } from "../../hooks/useRequest";
import { toast } from "react-toastify";
import Progress from "../common/Progress";

const CreateInstaCartModalStyle = styled.div`
  .modal__body {
    padding: 30px 40px !important;
  }
  label {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    text-align: left;
    color: #929292;
    display: inline-block;
    margin-bottom: 12px;
  }
  input,
  .select {
    width: 100%;
    height: 54px;
    border-radius: 10px;
    border: 1px solid #000000;
    font-size: 20px;
    padding: 0 18px;
  }
  .select {
    margin-bottom: 30px;
  }
  select {
    width: 100%;
    outline: 0px;
    border: 0px;
    height: 50px;
    font-size: 16px;
  }
`;

const CreateInstaCartModal = ({ onMaskClick }) => {
  const [instaCartName, setInstaCartName] = useState("");
  const [createInstaCart, { isLoading }] = useRequest();
  const [fetchInstaCarts, { state: instacarts }] = useRequest(
    `/instacart?limit=10&page=1`
  );

  useEffect(() => {
    fetchInstaCarts();
  }, []);

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
        <label htmlFor="parentSelect">Parent Instacart</label>
        <div className="select">
          <select name="parentInstacart" id="parentSelect">
            <option selected disabled>
              Select Instacart
            </option>
            {instacarts &&
              instacarts?.data?.length > 0 &&
              instacarts?.data
                ?.filter((item) => item?.isInstabuild)
                ?.map((item) => {
                  return <option>{item?.name}</option>;
                })}
          </select>
        </div>
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
