import React, { useState, useEffect, useCallback } from "react";
import GenericModal from "./GenericModal";
import styled from "styled-components";
import { useRequest } from "../../hooks/useRequest";
import { toast } from "react-toastify";
import { ReactComponent as CheckIcon } from "../../assets/check.svg";

const AddToWishlistStyle = styled.div`
  .modal__body {
    .modal__body__title {
      color: #000;
      font-size: 20px;
      font-weight: 600;
      line-height: 30px;
      margin-bottom: 25px;
    }
  }
`;

const AddToWishlist = ({
  onMaskClick,
  product,
  handleSecondaryButtonClick,
  isCreateWishlistActive,
}) => {
  const [pageNumber] = useState(1);
  const [fetchData] = useRequest();
  const [wishlistData, setWishListData] = useState([]);
  const [addWishlistIds, setAddWishlistIds] = useState([]);
  const requestPayload = {
    productId: product?.id,
  };

  const handleAddToWishlist = async () => {
    if (!addWishlistIds?.length) {
      return toast.error("Please select the wishlist to add");
    }
    try {
      const paths = addWishlistIds?.map((item) => {
        return {
          path: `/wishlist/${item}/add-product`,
          id: item,
        };
      });
      const results = await Promise.all(
        paths?.map((item) =>
          fetchData({
            path: item?.path,
            method: "POST",
            body: JSON.stringify({
              ...requestPayload,
            }),
          })
        )
      );
      const allTrue = results.every((obj) => obj.success === true);
      if (allTrue) {
        toast.success("Products added to wishlist");
      } else {
        results.forEach((element) => {
          if (element?.success) {
            toast.success(`Product added to ${element?.data?.name}.`);
          } else {
            return toast.error(`${element?.message}`);
          }
        });
      }
      onMaskClick();
    } catch (err) {
      return toast.error("Some items are not added to cart. Please try again");
    }
  };

  const fetchWishlists = useCallback(
    async (pageNumber) => {
      const path = `/wishlist?limit=10&page=${pageNumber}`;
      const response = await fetchData({ path });
      if (!response.success) {
        return toast.error(response.message);
      }
      setWishListData(response.data);
    },
    [pageNumber]
  );

  useEffect(() => {
    fetchWishlists(pageNumber);
  }, [pageNumber, isCreateWishlistActive]);

  const handleWishlistChange = (e, item) => {
    if (e.target.checked) {
      setAddWishlistIds((prev) => [
        ...prev?.filter((build) => build !== item?._id),
        item?._id,
      ]);
    } else {
      setAddWishlistIds((prev) => [
        ...prev?.filter((build) => build !== item?._id),
      ]);
    }
  };

  return (
    <AddToWishlistStyle>
      <GenericModal
        modalTitle={"Add to Wishlist"}
        primaryButtonTitle={"Save"}
        secondaryButtonTitle={"Create wishlist"}
        onMaskClick={onMaskClick}
        onPrimaryButtonClick={handleAddToWishlist}
        onSecondaryButtonClick={handleSecondaryButtonClick}
      >
        <div className="modal__body__wishlist">
          <div className="modal__body__title">Wishlists</div>
          {wishlistData?.length > 0 ? (
            wishlistData?.map((item) => (
              <div className="checkbox__group" key={item?._id}>
                <label htmlFor={item?._id}>
                  <input
                    type="checkbox"
                    id={item?._id}
                    checked={addWishlistIds.includes(item?._id)}
                    onChange={(e) => handleWishlistChange(e, item)}
                  />
                  <div className="checkbox">
                    <CheckIcon />
                  </div>
                </label>
                <label htmlFor={item?._id}>{item?.name}</label>
              </div>
            ))
          ) : (
            <div className="wishlist__not__found">
              No wishlist found. Please create one to add products.
            </div>
          )}
        </div>
      </GenericModal>
    </AddToWishlistStyle>
  );
};

export default AddToWishlist;
