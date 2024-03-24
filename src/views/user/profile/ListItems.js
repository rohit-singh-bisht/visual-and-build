import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../../components/common/Button";
import { BsTrash3 } from "react-icons/bs";
import AddToCartModal from "../../../components/modals/AddToCartModal";
import CreateInstaCartModal from "../../../components/modals/CreateInstaCartModal";
import { useRequest } from "../../../hooks/useRequest";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Progress from "../../../components/common/Progress";

const ListItemsStyle = styled.div`
  flex: 1;
  .list__item {
    display: flex;
    padding: 20px;
    gap: 20px;
    border: 0.75px solid #cccccc;
  }
  .list__item__img {
    width: 120px;
  }
  .list__item__info {
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    text-align: left;
    color: #333333;
    flex: 1;
    .list__item__product__name {
      font-weight: 700;
      text-transform: capitalize;
    }
    .list__item__product__sku {
      color: #666666;
    }
  }
  .list__item__subtotal {
    font-size: 14px;
    font-weight: 700;
    line-height: 22px;
    flex: 0 0 200px;
  }
  .list__item__action {
    display: flex;
    align-items: center;
    gap: 20px;
    .trash__icon {
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      svg {
        width: 22px;
        height: 22px;
      }
    }
  }
`;

const ProductsNotFound = styled.div`
  text-align: center;
  padding: 50px 0;
  .sad__emoji {
    font-size: 100px;
  }
  .not__found {
    font-size: 24px;
    font-weight: 500;
  }
`;

const ListItems = ({ listItems, setListItems, setIsRefetchWishlist }) => {
  const [isAddToCartActive, setIsAddToCartActive] = useState(false);
  const [isInstaCartActive, setIsInstaCartActive] = useState(false);
  const [product, setProduct] = useState();
  const [removeProduct, { isLoading }] = useRequest();
  const navigate = useNavigate();

  useEffect(() => {
    if (!listItems?._id) {
      navigate(`/account/lists`);
    }
  }, [listItems]);

  const handleRemoveProduct = async (wishlistId, productId, listItemId) => {
    const path = `/wishlist/${wishlistId}/clear-product/${productId}`;
    const response = await removeProduct({ path, method: "DELETE" });
    console.log(response, "response");
    if (!response?.success) {
      return toast.error(response.message);
    }
    toast.success(response.message);
    const filteredItems = listItems?.items?.filter(
      (item) => item?._id !== listItemId
    );
    setListItems((prev) => ({ ...prev, items: filteredItems }));
    setIsRefetchWishlist((prev) => !prev);
  };

  return (
    <>
      <ListItemsStyle>
        {listItems?.items?.length ? (
          listItems?.items?.map((item) => (
            <div className="list__item">
              <div className="list__item__img">
                <img
                  src={
                    process.env.REACT_APP_MEDIA_ASSETS_URL +
                    "/" +
                    item?.product?.image
                  }
                  alt={item?.product?.name}
                />
              </div>
              <div className="list__item__info">
                <div className="list__item__product__name">
                  {item?.product?.name}
                </div>
                <div className="list__item__product__sku">
                  Store SKU: {item?.product?.sku}
                </div>
              </div>
              <div className="list__item__subtotal">
                {process.env.REACT_APP_PRICE_SYMBOL}
                {item?.product?.price.toFixed(2)}
              </div>
              <div className="list__item__action">
                <div
                  className="trash__icon"
                  onClick={() =>
                    handleRemoveProduct(
                      listItems?._id,
                      item?.product?.id,
                      item?._id
                    )
                  }
                >
                  <BsTrash3 />
                </div>
                <Button
                  title={"Add To Cart"}
                  onClick={() => {
                    setProduct(item?.product);
                    setIsAddToCartActive(true);
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <ProductsNotFound>
            <span className="sad__emoji">😞</span>
            <h2 className="not__found">Products Not Found In The List!</h2>
          </ProductsNotFound>
        )}
      </ListItemsStyle>
      {isAddToCartActive && (
        <AddToCartModal
          onMaskClick={() => setIsAddToCartActive(false)}
          handleSecondaryButtonClick={() => setIsInstaCartActive(true)}
          product={product}
          isInstaCartActive={isInstaCartActive}
        />
      )}
      {isInstaCartActive && (
        <CreateInstaCartModal onMaskClick={() => setIsInstaCartActive(false)} />
      )}
      {isLoading && <Progress />}
    </>
  );
};

export default ListItems;
