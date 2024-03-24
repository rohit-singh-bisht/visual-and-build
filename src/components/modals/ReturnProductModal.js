import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRequest } from "../../hooks/useRequest";
import { Skeleton } from "@mui/material";
import Button from "../common/Button";
import { toast } from "react-toastify";
import StyledMask from "../common/StyledMask";

const ReturnProductModalStyle = styled.div`
  background-color: #fff;
  padding: 40px;
  max-width: 800px;
  width: 100%;
  position: relative;
  z-index: 4;
  .title {
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
    text-align: left;
    color: #000000;
    margin-bottom: 36px;
  }
  .text {
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    text-align: left;
  }
  .form {
    .form__select {
      width: 100%;
      border: 0px;
      &::after {
        right: 12px;
      }
      &:focus {
        outline: none;
      }
    }
    .form__title {
      color: #000000;
      padding: 16px;
      border: 0.75px solid #d9d9d9;
      margin-bottom: 10px;
      border-radius: 7.5px;
      width: 100%;
    }
    .form__value {
      padding: 16px;
      border: 0.75px solid #d9d9d9;
      border-radius: 7.5px;
    }
    textarea {
      width: 99% !important;
      height: 46px !important;
      outline: 0;
      border: 0px;
      margin-top: 16px;
      resize: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
  .pickup__title {
    margin-top: 28px;
    margin-bottom: 10px;
  }
  .address__wrapper {
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    text-align: left;
    padding: 12px;
    border: 0.75px solid #d9d9d9;
    border-radius: 7.5px;
    color: #797979;
    span {
      color: #000000;
    }
    &.selected {
      border: 1.5px solid #ae0000;
      background-color: #fffcfc;
    }
  }
  .button__wrapper {
    margin-top: 38px;
    text-align: end;
  }
`;

const ModalShadeStyle = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9;
`;

const returnOptions = [
  { label: "Why do want to return this product", value: "", disabled: true },
  { label: "The product didn't fit correctly.", value: "Wrong Size" },
  { label: "Received a different color than expected.", value: "Wrong Color" },
  {
    label: "The product arrived damaged or with defects.",
    value: "Defective Product",
  },
  {
    label: "The product didn't match the description or images.",
    value: "Not as Described",
  },
  {
    label: "Decided not to keep the product for personal reasons.",
    value: "Changed Mind",
  },
  {
    label: "Got a different product than ordered.",
    value: "Received Wrong Item",
  },
  {
    label: "Concerns about the quality of the product.",
    value: "Quality Concerns",
  },
  { label: "The product arrived later than expected.", value: "Late Delivery" },
  {
    label: "Accidentally ordered the same product multiple times.",
    value: "Duplicate Order",
  },
];

const ReturnProductModal = ({ orderId, onMaskClick }) => {
  const [subject, setSubject] = useState("");
  const [reason, setReason] = useState("");
  const [fetchAddress, { isLoading, state: addressData }] = useRequest();
  const [returnProduct] = useRequest();
  const [pickupAddress, setPickupAddress] = useState("");

  useEffect(() => {
    const path = `/address?page=1&limit=10`;
    fetchAddress({ path });
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !pickupAddress || !reason) {
      return toast.error("All fields are required");
    }
    const response = await returnProduct({
      path: `/order/${orderId}/return`,
      method: "POST",
      body: JSON.stringify({
        subject,
        type: "refund",
        pickupAddress,
        reason,
      }),
    });
    if (!response?.success) {
      return toast.error(response?.message);
    }
    toast.success(response?.message);
    onMaskClick();
  };

  return (
    <ModalShadeStyle>
      <StyledMask onClick={onMaskClick} />
      <ReturnProductModalStyle>
        <h2 className="title">Return Management</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__title text">
            <select
              className={`form__select text ${!subject ? "error" : ""}`}
              onChange={(e) => setSubject(e?.target?.value)}
            >
              {returnOptions?.map((item) => (
                <option
                  selected={subject === item?.value}
                  value={item?.value}
                  disabled={item?.disabled}
                >
                  {item?.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form__value text">
            Description
            <textarea
              value={reason}
              name="address"
              onChange={(e) => setReason(e.target.value)}
              placeholder="Type something..."
            >
              {reason}
            </textarea>
          </div>
          <div className="pickup__title text">Pickup address</div>
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={50}
              style={{ borderRadius: "7.5px" }}
            />
          ) : (
            <>
              {addressData?.data?.docs?.length &&
                addressData?.data?.docs?.map((item) => (
                  <div
                    className={`address__wrapper ${
                      item?.format === pickupAddress ? "selected" : ""
                    }`}
                    onClick={() => setPickupAddress(item?.format)}
                  >
                    {item?.name && (
                      <>
                        <span>{item?.name}</span>
                        <br />
                      </>
                    )}
                    {item?.format} <br />
                    {item?.phoneNumber}
                  </div>
                ))}
            </>
          )}
          <div className="button__wrapper">
            <Button type={"save"} title={"Return"} />
          </div>
        </form>
      </ReturnProductModalStyle>
    </ModalShadeStyle>
  );
};

export default ReturnProductModal;
