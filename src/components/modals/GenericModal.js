import React from "react";
import styled from "styled-components";
import StyledMask from "../common/StyledMask";
import Button from "../common/Button";

const GenericModalStyle = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9;
  .modal {
    max-width: 700px;
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
    font-size: 20px;
    font-weight: 600;
    line-height: 30px;
    padding: 20px 40px;
  }
  .modal__body {
    padding: 30px;
    height: 350px;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
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
      label {
        font-size: 16px;
        font-weight: 400;
        line-height: 28px;
        text-align: left;
        cursor: pointer;
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
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    button {
      width: 225px;
      font-weight: 500;
    }
    .secondary__button {
      background-color: #000;
    }
    .primary__button {
      margin-left: auto;
    }
  }
`;

const GenericModal = ({
  modalTitle,
  onPrimaryButtonClick,
  primaryButtonTitle,
  onSecondaryButtonClick,
  secondaryButtonTitle,
  children,
  onMaskClick,
}) => {
  return (
    <GenericModalStyle>
      <StyledMask background={"rgba(0,0,0,0.5)"} onClick={onMaskClick} />
      <div className="modal">
        <div className="modal__header">
          <div className="modal__header__title">{modalTitle}</div>
        </div>
        <div className="modal__body">{children}</div>
        <div className="modal__footer">
          {secondaryButtonTitle && (
            <Button
              type={"dark"}
              onClick={onSecondaryButtonClick}
              className={"secondary__button"}
              title={secondaryButtonTitle}
            />
          )}
          {primaryButtonTitle && (
            <Button
              onClick={onPrimaryButtonClick}
              className={"primary__button"}
              title={primaryButtonTitle}
            />
          )}
        </div>
      </div>
    </GenericModalStyle>
  );
};

export default GenericModal;
