import React from "react";
import styled from "styled-components";
import Button from "../../../components/common/Button";
import AddressCard from "../../../components/account/AddressCard";
import AddAddressModal from "../../../components/modals/AddAddressModal";

const AddressStyled = styled.div`
  flex: 0 0 700px;
  .add__address__button {
    margin-bottom: 18.75px;
    button {
      font-size: 12px;
    }
  }
`;

const Address = () => {
  return (
    <>
      <AddressStyled>
        <div className="add__address__button">
          <Button title={"Add New Address"} />
        </div>
        <AddressCard />
        <AddressCard />
        <AddressCard />
      </AddressStyled>
      <AddAddressModal />
    </>
  );
};

export default Address;
