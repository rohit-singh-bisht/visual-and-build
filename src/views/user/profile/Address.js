import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../../components/common/Button";
import AddressCard from "../../../components/account/AddressCard";
import AddAddressModal from "../../../components/modals/AddAddressModal";
import { useRequest } from "../../../hooks/useRequest";
import Progress from "../../../components/common/Progress";

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
  const [fetchAddress, { isLoading: isFetchingAddress, state }] = useRequest();

  useEffect(() => {
    const path = `/address?page=1&limit=10`;
    fetchAddress({ path });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AddressStyled>
        <div className="add__address__button">
          <Button
            title={"Add New Address"}
            onClick={() => setIsAddressModal(true)}
          />
        </div>
        {state?.data?.docs?.map((item) => (
          <AddressCard />
        ))}
      </AddressStyled>
      {isAddressModal && (
        <AddAddressModal setIsAddressModal={setIsAddressModal} />
      )}
      {isFetchingAddress && <Progress />}
    </>
  );
};

export default Address;
