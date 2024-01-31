import React, { useState } from "react";
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
  const [isAddressModal, setIsAddressModal] = useState(false);

  return (
    <>
      <AddressStyled>
        <div className="add__address__button">
          <Button
            title={"Add New Address"}
            onClick={() => setIsAddressModal(true)}
          />
        </div>
        <AddressCard />
        <AddressCard />
        <AddressCard />
      </AddressStyled>
      {isAddressModal && (
        <AddAddressModal setIsAddressModal={setIsAddressModal} />
      )}
    </>
  );
};

export default Address;
