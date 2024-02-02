import React from "react";
import styled from "styled-components";
import StyledMask from "../common/StyledMask";
import Button from "../common/Button";

const GenericModalStyle = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9;
  .modal {
    max-width: 900px;
    width: 100%;
    border-radius: 5px;
    overflow: clip;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border: 1px solid #000;
  }
  .modal__header__title {
    background: #ae0000;
    color: #fff;
    font-size: 26px;
    font-weight: 600;
    line-height: 30px;
    padding: 32px 52px;
  }
  .modal__body {
    padding: 36px 40px 60px;
    max-height: 400px;
    overflow: auto;
    .checkbox__group {
      display: flex;
      gap: 24px;
      align-items: center;
      margin-bottom: 30px;
      input {
        opacity: 0;
        visibility: hidden;
        position: absolute;
        width: 0;
        height: 0;
        &:checked {
          + {
            .checkbox {
              background: #ae0000;
            }
          }
        }
      }
      .checkbox {
        width: 35px;
        height: 35px;
        border-radius: 5px;
        border: 1px solid #000;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .modal__footer {
    border-top: 1px solid #000;
    padding: 25px 35px 30px;
    display: flex;
    justify-content: space-between;
    button {
      width: 225px;
    }
  }
`;

const GenericModal = ({ children, onMaskClick }) => {
  return (
    <GenericModalStyle>
      <StyledMask background={"rgba(0,0,0,0.5)"} onClick={onMaskClick} />
      <div className="modal">
        <div className="modal__header">
          <div className="modal__header__title">Add to Cart</div>
        </div>
        <div className="modal__body">{children}</div>
        <div className="modal__footer">
          <Button type={"dark"} title={"Add instacart"} />
          <Button title={"Save"} />
        </div>
      </div>
    </GenericModalStyle>
  );
};

export default GenericModal;
