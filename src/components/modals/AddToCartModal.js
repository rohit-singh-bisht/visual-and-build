import React from "react";
import styled from "styled-components";
import { ReactComponent as CheckIcon } from "../../assets/check.svg";
import GenericModal from "./GenericModal";

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

const AddToCartModal = () => {
  return (
    <AddToCartModalStyle>
      <GenericModal>
        <div className="modal__body__normal__cart">
          <div className="modal__body__title">Normal Cart</div>
          <div className="checkbox__group">
            <input type="checkbox" id="cart" />
            <div className="checkbox">
              <CheckIcon />
            </div>
            <label htmlFor="cart">Cart</label>
          </div>
        </div>
        <div className="modal__body__other__carts">
          <div className="modal__body__title">InstaBuild</div>
          <div className="checkbox__group">
            <input type="checkbox" id="cart" />
            <div className="checkbox">
              <CheckIcon />
            </div>
            <label htmlFor="cart">Cart 1</label>
          </div>
          <div className="checkbox__group">
            <input type="checkbox" id="cart" />
            <div className="checkbox">
              <CheckIcon />
            </div>
            <label htmlFor="cart">Cart 2</label>
          </div>
        </div>
      </GenericModal>
    </AddToCartModalStyle>
  );
};

export default AddToCartModal;
