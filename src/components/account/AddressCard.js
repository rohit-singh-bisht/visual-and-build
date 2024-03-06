import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { ReactComponent as More } from "../../assets/vertical-options.svg";
import Dropdown from "../common/Dropdown";
import StyledMask from "../common/StyledMask";
import AddressForm from "../forms/address/AddressForm";
import { useRequest } from "../../hooks/useRequest";
import { toast } from "react-toastify";
import Progress from "../common/Progress";

const AddressCardStyle = styled.div`
  padding: 18px;
  border-radius: 7.5px;
  border: 0.75px solid #d9d9d9;
  background: #fff;
  max-width: 700px;
  width: 100%;
  margin-bottom: 24px;
  position: relative;
  .user__address__type {
    padding: 7.5px;
    border-radius: 5.25px;
    background: #f1eded;
    display: inline-block;
    color: #000;
    font-size: 11.25px;
    font-weight: 500;
    margin-bottom: 25px;
  }
  .user__address__name {
    color: #000;
    font-size: 11.25px;
    font-weight: 400;
  }
  .user__address__details {
    color: #797979;
    font-size: 11.25px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 13.5px 0;
  }
  .user__phone__number {
    color: #000;
    font-size: 11.25px;
    font-weight: 400;
    color: #797979;
    .user__phone__number__title {
      color: #000;
      display: block;
    }
  }
  .user__address__icon {
    padding: 18px;
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
  }
`;

const dropDownOptions = [
  {
    id: 1,
    label: "Edit Address",
    value: "edit",
  },
  {
    id: 2,
    label: "Delete Address",
    value: "delete",
  },
];

const AddressFormStyle = styled.div`
  margin-bottom: 24px;
`;

const AddressCard = () => {
  const [isOptionsActive, setIsOptionsActive] = useState(false);
  const [dropdownAction, setDropdownAction] = useState("");
  const [addAddress, { isLoading }] = useRequest();
  const [addressData, setAddressData] = useState();

  const handleAddAddress = useCallback(async () => {
    try {
      const path = `/address`;
      const response = await addAddress({
        path,
        method: "POST",
        body: JSON.stringify(addressData),
      });
      if (!response.success) {
        return toast.error(response.message);
      }
    } catch (err) {
      console.log("err", err);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {dropdownAction === "edit" ? (
        <AddressFormStyle>
          <AddressForm
            title=""
            onClick={handleAddAddress}
            setState={setAddressData}
          />
        </AddressFormStyle>
      ) : (
        <AddressCardStyle>
          <div className="user__address__type">Home</div>
          <div className="user__address__name">Nishant Choudhary</div>
          <div className="user__address__details">
            House no 11 Sawaswati colony naya pul sehatpur, Naya pul Faridabad -
            121003, Haryana
          </div>
          <div className="user__phone__number">
            <span className="user__phone__number__title">Phone number</span>
            7503063585, 7503063585
          </div>
          <div
            className="user__address__icon"
            onClick={() => setIsOptionsActive(true)}
          >
            <More className="icon" />
          </div>
          {isOptionsActive && (
            <>
              <StyledMask
                onClick={() => setIsOptionsActive(false)}
                zIndex={2}
              />
              <Dropdown
                right={18}
                top={50}
                setValue={setDropdownAction}
                options={dropDownOptions}
                zIndex={4}
              />
            </>
          )}
        </AddressCardStyle>
      )}
      {isLoading && <Progress />}
    </>
  );
};

export default AddressCard;
