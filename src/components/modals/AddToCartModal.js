import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as CheckIcon } from "../../assets/check.svg";
import GenericModal from "./GenericModal";
import { useRequest } from "../../hooks/useRequest";
import { toast } from "react-toastify";
import Progress from "../common/Progress";

const AddToCartModalStyle = styled.div`
  .modal__body {
    .modal__body__title {
      color: #000;
      font-size: 20px;
      font-weight: 600;
      line-height: 30px;
      margin-bottom: 25px;
    }
    .modal__body__normal__cart {
      margin-bottom: 60px;
    }
  }
`;

const AddToCartModal = ({
  onMaskClick,
  handleSecondaryButtonClick,
  product,
  quantity = 1,
  isInstaCartActive,
}) => {
  const [isNormalCartChecked, setIsNormalCartChecked] = useState(false);
  const [addCart, { isLoading }] = useRequest();
  const requestPayload = {
    productId: product?.id,
    quantity: quantity,
    deliveryDate: "",
  };
  const [
    fetchInstaCarts,
    { ioLoading: isFetchingInstacarts, state: instacarts },
  ] = useRequest(`/instacart?limit=10&page=1`);
  const [addInstabuildId, setAddInstabuildId] = useState("");

  useEffect(() => {
    !isInstaCartActive && fetchInstaCarts();
  }, [isInstaCartActive]);

  const handlePrimaryClick = async () => {
    if (!addInstabuildId && !isNormalCartChecked) {
      return toast.error("Please select the cart to add");
    }
    if (isLoading) return;
    if (isNormalCartChecked) {
      const response = await addCart({
        path: `/cart`,
        method: "POST",
        body: JSON.stringify(requestPayload),
      });
      if (!response.success) {
        return toast.error(response.message, { toastId: "cart" });
      }
      toast.success(response.message, { toastId: "cart" });
      onMaskClick();
    } else if (addInstabuildId) {
      const path = `/instacart/instabuild/${addInstabuildId}`;
      const response = await addCart({
        path,
        method: "POST",
        body: JSON.stringify({
          ...requestPayload,
        }),
      });
      if (!response.success) {
        return toast.error(response.message, { toastId: "cart" });
      }
      toast.success(response.message, { toastId: "cart" });
      onMaskClick();
    }
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    if (value === "cart") {
      setAddInstabuildId("");
      setIsNormalCartChecked(true);
    } else {
      setIsNormalCartChecked(false);
      setAddInstabuildId(value);
    }
  };

  return (
    <AddToCartModalStyle>
      <GenericModal
        modalTitle={"Add to Cart"}
        primaryButtonTitle={"Save"}
        secondaryButtonTitle={"Add New Instacart"}
        onSecondaryButtonClick={handleSecondaryButtonClick}
        onMaskClick={onMaskClick}
        onPrimaryButtonClick={handlePrimaryClick}
      >
        <div className="modal__body__normal__cart">
          <div className="modal__body__title">Normal Cart</div>
          <div className="checkbox__group">
            <label htmlFor="cart">
              <input
                type="radio"
                id="cart"
                name="cart"
                value="cart"
                onChange={handleRadioChange}
              />
              <div className="checkbox">
                <CheckIcon />
              </div>
            </label>
            <label htmlFor="cart">Cart</label>
          </div>
        </div>
        <div className="modal__body__other__carts">
          <div className="modal__body__title">InstaBuild</div>
          {instacarts &&
            instacarts?.data?.length > 0 &&
            instacarts?.data
              ?.filter((item) => item?.isInstabuild)
              ?.map((item) => {
                return (
                  <div className="checkbox__group" key={item?.id}>
                    <label htmlFor={item?._id}>
                      <input
                        type="radio"
                        id={item?._id}
                        value={item?._id}
                        onChange={handleRadioChange}
                        name="cart"
                      />
                      <div className="checkbox">
                        <CheckIcon />
                      </div>
                    </label>
                    <label htmlFor={item?._id}>{item?.name}</label>
                  </div>
                );
              })}
        </div>
      </GenericModal>
      {isLoading && <Progress />}
    </AddToCartModalStyle>
  );
};

export default AddToCartModal;
