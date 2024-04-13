import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../common/Button";
import { addressFormObj } from "../../../utils/constants";

const AddressFormStyle = styled.div`
  border-radius: 7.5px;
  border: 0.75px solid #d9d9d9;
  background: #fff;
  overflow: clip;
  .add__address__modal {
    max-width: 880px;
    width: 100%;
    background-color: #fff;
    padding: 20px;
    overflow: auto;
    .modal__title {
      color: #000;
      font-size: 20px;
      font-weight: 600;
      line-height: 22.5px;
      margin-bottom: 46px;
    }
    .add__address__modal__body {
      .row {
        display: flex;
        gap: 24px;
      }
      .form__group {
        width: 100%;
        margin-bottom: 23px;
        label {
          color: #000;
          font-size: 13.5px;
          font-weight: 400;
          line-height: 22.5px;
          display: block;
          margin-bottom: 10px;
        }
        input,
        textarea {
          display: block;
          width: 100%;
          height: 49px;
          padding: 13px 16px;
          border-radius: 3.75px;
          border: 0.75px solid #d9d9d9;
          background: #fff;
          color: #000;
          font-size: 13.5px;
          font-weight: 400;
          line-height: 22.5px;
          &::placeholder {
            color: #898989;
          }
          &:focus {
            outline: 1px solid #898989;
          }
        }
        textarea {
          height: 100px;
        }
      }
      .radio__group {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        input {
          accent-color: #ae0000;
          &:selected {
            & + label {
              color: #ae0000;
            }
          }
        }
        label {
          font-size: 13.5px;
          font-weight: 400;
          line-height: 22.5px;
          margin-left: 2px;
        }
      }
      .submit__button {
        margin-top: 40px;
        button {
          border-radius: 3.75px;
          font-size: 12px;
          font-weight: 600;
          line-height: 22.5px;
        }
      }
    }
  }
`;

const AddressForm = ({ title = "Add Address", state, setState, onClick }) => {
  const [addressData, setAddressData] = useState(state || addressFormObj);
  const [isOtherActive, setIsOtherActive] = useState(false);
  const [otherValue, setOtherValue] = useState("");

  useEffect(() => {
    addressData?.label === "other" && setIsOtherActive(true);
    setState && setState(addressData);
  }, [addressData]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "radio" && name === "label") {
      setIsOtherActive(false);
    }
    if (name === "phoneNumber") {
      const input = value.replace(/\D/g, "");
      const truncatedInput = input.slice(0, 11);
      return setAddressData((prev) => ({
        ...prev,
        [name]: truncatedInput,
      }));
    }
    setAddressData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setAddressData((prev) => ({
      ...prev,
      label: otherValue ? otherValue : "other",
    }));
  }, [otherValue]);

  const handleOtherValue = (e) => {
    const value = e.target.value;
    setOtherValue(value);
  };

  return (
    <AddressFormStyle>
      <div className="add__address__modal">
        {title && <div className="modal__title">{title}</div>}

        <div className="add__address__modal__body">
          <div className="row">
            <div className="form__group">
              <label>Full name</label>
              <input
                type="text"
                name="name"
                value={addressData?.name}
                placeholder="Full Name"
                onChange={handleChange}
              />
            </div>
            <div className="form__group">
              <label>Phone Number</label>
              <input
                type="number"
                name="phoneNumber"
                value={addressData?.phoneNumber}
                placeholder="Phone Number"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="form__group">
              <label>Pincode</label>
              <input
                type="number"
                pattern="/d*"
                name="pincode"
                value={addressData?.pincode}
                placeholder="Pincode"
                onChange={handleChange}
              />
            </div>
            <div className="form__group">
              <label>Locality</label>
              <input
                type="text"
                name="locality"
                value={addressData?.locality}
                placeholder="Locality"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form__group">
            <label>Address</label>
            <textarea
              value={addressData?.address}
              name="address"
              onChange={handleChange}
              placeholder="Enter Address"
            >
              {addressData?.address}
            </textarea>
          </div>
          <div className="row">
            <div className="form__group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={addressData?.city}
                onChange={handleChange}
                placeholder="Enter City"
              />
            </div>
            <div className="form__group">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={addressData?.state}
                onChange={handleChange}
                placeholder="Enter State"
              />
            </div>
          </div>
          <div className="row">
            <div className="form__group">
              <label>Landmark</label>
              <input
                type="text"
                name="landmark"
                value={addressData?.landmark}
                onChange={handleChange}
                placeholder="Enter Landmark"
              />
            </div>
            <div className="form__group">
              <label>Alternate Mobile Number</label>
              <input
                type="tel"
                name="alternateNumber"
                value={addressData?.alternateNumber}
                onChange={handleChange}
                placeholder="Enter alternate mobile number"
              />
            </div>
          </div>
          <div className="row">
            <div className="radio__group">
              <input
                id="home"
                onChange={handleChange}
                name="label"
                type="radio"
                value={"home"}
                checked={addressData?.label === "home"}
              />
              <label htmlFor="home">Home</label>
            </div>
            <div className="radio__group">
              <input
                id="work"
                onChange={handleChange}
                name="label"
                type="radio"
                value={"work"}
                checked={addressData?.label === "work"}
              />
              <label htmlFor="work">Work</label>
            </div>
            <div className="radio__group">
              <input
                id="other"
                onChange={handleChange}
                name="label"
                type="radio"
                value={"other"}
                checked={
                  addressData?.label !== "work" && addressData?.label !== "home"
                }
              />
              <label htmlFor="other">Other</label>
              {isOtherActive && (
                <div className="form__group" style={{ marginBottom: 0 }}>
                  <input
                    type="text"
                    name="other"
                    value={otherValue}
                    onChange={handleOtherValue}
                    style={{ padding: "4px 12px", height: "36px" }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="submit__button">
            <Button title={"Save Address"} onClick={onClick} />
          </div>
        </div>
      </div>
    </AddressFormStyle>
  );
};

export default AddressForm;
