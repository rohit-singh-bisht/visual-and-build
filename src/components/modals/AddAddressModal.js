import React from "react";
import styled from "styled-components";
import StyledMask from "../common/StyledMask";

const AddAddressModalStyle = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  .add__address__modal {
    max-width: 880px;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    background-color: #fff;
    padding: 40px;
    max-height: 80vh;
    overflow: auto;
    .modal__title {
      color: #000;
      font-size: 20px;
      font-weight: 600;
      line-height: 22.5px;
      margin-bottom: 46px;
    }
    .add__address__modal__body {
      .row {
        display: flex;
        gap: 16px;
      }
      .form__group {
        width: 100%;
        margin-bottom: 23px;
        label {
          color: #000;
          font-size: 13.5px;
          font-weight: 400;
          line-height: 22.5px;
          display: block;
          margin-bottom: 10px;
        }
        input,
        textarea {
          display: block;
          width: 100%;
          height: 49px;
          padding: 13px 16px;
          border-radius: 3.75px;
          border: 0.75px solid #d9d9d9;
          background: #fff;
          color: #898989;
          font-size: 13.5px;
          font-weight: 400;
          line-height: 22.5px;
        }
        textarea {
          height: 100px;
        }
      }
    }
  }
`;

const AddAddressModal = () => {
  return (
    <>
      <AddAddressModalStyle>
        <StyledMask />
        <div className="add__address__modal">
          <div className="modal__title">Add Address</div>

          <div className="add__address__modal__body">
            <div className="row">
              <div className="form__group">
                <label>Full name</label>
                <input type="text" placeholder="Full Name" />
              </div>
              <div className="form__group">
                <label>Phone Number</label>
                <input type="tel" placeholder="Phone Number" />
              </div>
            </div>
            <div className="row">
              <div className="form__group">
                <label>Pincode</label>
                <input type="number" placeholder="Pincode" />
              </div>
              <div className="form__group">
                <label>Locality</label>
                <input type="text" placeholder="Locality" />
              </div>
            </div>
            <div className="form__group">
              <label>Address</label>
              <textarea placeholder="Enter Address"></textarea>
            </div>
            <div className="row">
              <div className="form__group">
                <label>City</label>
                <input type="text" placeholder="Enter City" />
              </div>
              <div className="form__group">
                <label>State</label>
                <input type="text" placeholder="Enter State" />
              </div>
            </div>
            <div className="row">
              <div className="form__group">
                <label>Landmark</label>
                <input type="text" placeholder="Enter Landmark" />
              </div>
              <div className="form__group">
                <label>Alternate Mobile Number</label>
                <input type="tel" placeholder="Enter alternate mobile number" />
              </div>
            </div>
          </div>
        </div>
      </AddAddressModalStyle>
    </>
  );
};

export default AddAddressModal;
