import React, { useEffect, useState } from "react";
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
  const [addInstabuildIds, setAddInstabuildIds] = useState([]);

  useEffect(() => {
    !isInstaCartActive && fetchInstaCarts();
  }, [isInstaCartActive]);

  const addInstaBuilds = async (paths) => {
    const results = await Promise.all(
      paths?.map((item) =>
        addCart({
          path: item?.path,
          method: "POST",
          body: JSON.stringify({
            ...requestPayload,
          }),
        })
      )
    );
    console.log("results", results);
  };

  const handlePrimaryClick = async () => {
    if (!addInstabuildIds?.length && !isNormalCartChecked) {
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
        return toast.error(response.message, { toastId: "error" });
      }
      toast.success(response.message, { toastId: "success" });
      onMaskClick();
    }
    if (addInstabuildIds?.length) {
      try {
        const paths = addInstabuildIds?.map((item) => {
          return {
            path: `/instacart/instabuild/${item}`,
            id: item,
          };
        });
        addInstaBuilds(paths);
      } catch (err) {
        return toast.error(
          "Some items are not added to cart. Please try again"
        );
      }
    }
  };

  const handleInstacartClick = (e, item) => {
    if (e.target.checked) {
      setAddInstabuildIds((prev) => [
        ...prev?.filter((build) => build !== item?._id),
        item?._id,
      ]);
    } else {
      setAddInstabuildIds((prev) => [
        ...prev?.filter((build) => build !== item?._id),
      ]);
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
        {instacarts && instacarts?.data?.length && (
          <div className="modal__body__other__carts">
            <div className="modal__body__title">InstaBuild</div>
            {instacarts?.data
              ?.filter((item) => item?.isInstabuild)
              ?.map((item) => {
                return (
                  <div className="checkbox__group" key={item?.id}>
                    <label htmlFor={item?._id}>
                      <input
                        type="checkbox"
                        id={item?._id}
                        checked={addInstabuildIds.includes(item?._id)}
                        onChange={(e) => handleInstacartClick(e, item)}
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
        )}
      </GenericModal>
    </AddToCartModalStyle>
  );
};

export default AddToCartModal;
