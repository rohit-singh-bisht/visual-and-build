import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as CheckIcon } from "../../assets/check.svg";
import GenericModal from "./GenericModal";
import { useRequest } from "../../hooks/useRequest";
import { toast } from "react-toastify";

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
  quantity,
}) => {
  const [isNormalCartChecked, setIsNormalCartChecked] = useState(false);
  const [addCart, { isLoading }] = useRequest();
  const requestPayload = {
    id: product?.id,
    quantity: quantity,
  };

  const handlePrimaryClick = async () => {
    if (isLoading) return;
    if (isNormalCartChecked) {
      const response = await addCart({
        path: `/cart`,
        method: "POST",
        body: JSON.stringify(requestPayload),
      });
      if (!response.success) {
        return toast.error(response.message, { toastId: "error" });
      }
      toast.success(response.message, { toastId: "success" });
      onMaskClick();
    }
  };

  return (
    <AddToCartModalStyle>
      <GenericModal
        modalTitle={"Add to Cart"}
        primaryButtonTitle={"Save"}
        secondaryButtonTitle={"Add Instacart"}
        onSecondaryButtonClick={handleSecondaryButtonClick}
        onMaskClick={onMaskClick}
        onPrimaryButtonClick={handlePrimaryClick}
      >
        <div className="modal__body__normal__cart">
          <div className="modal__body__title">Normal Cart</div>
          <div className="checkbox__group">
            <label htmlFor="cart">
              <input
                type="checkbox"
                id="cart"
                onChange={(e) => setIsNormalCartChecked(e?.target?.checked)}
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
          <div className="checkbox__group">
            <label htmlFor="cart1">
              <input type="checkbox" id="cart1" />
              <div className="checkbox">
                <CheckIcon />
              </div>
            </label>
            <label htmlFor="cart1">Cart 1</label>
          </div>
          <div className="checkbox__group">
            <label htmlFor="cart2">
              <input type="checkbox" id="cart2" />
              <div className="checkbox">
                <CheckIcon />
              </div>
            </label>
            <label htmlFor="cart2">Cart 2</label>
          </div>
        </div>
      </GenericModal>
    </AddToCartModalStyle>
  );
};

export default AddToCartModal;
