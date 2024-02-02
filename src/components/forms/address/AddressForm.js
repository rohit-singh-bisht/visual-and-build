import React from "react";
import styled from "styled-components";
import Button from "../../common/Button";

const AddressFormStyle = styled.div`
  border-radius: 7.5px;
  border: 0.75px solid #d9d9d9;
  background: #fff;
  overflow: clip;
  .add__address__modal {
    max-width: 880px;
    width: 100%;
    background-color: #fff;
    padding: 20px;
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
      .radio__group {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        input {
          accent-color: #ae0000;
          &:selected {
            & + label {
              color: #ae0000;
            }
          }
        }
        label {
          font-size: 13.5px;
          font-weight: 400;
          line-height: 22.5px;
          margin-left: 2px;
        }
      }
      .submit__button {
        margin-top: 40px;
        button {
          border-radius: 3.75px;
          font-size: 12px;
          font-weight: 600;
          line-height: 22.5px;
        }
      }
    }
  }
`;

const AddressForm = ({ title = "Add Address" }) => {
  return (
    <AddressFormStyle>
      <div className="add__address__modal">
        {title && <div className="modal__title">{title}</div>}

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
          <div className="row">
            <div className="radio__group">
              <input id="home" name="address_type" type="radio" />
              <label htmlFor="home">Home</label>
            </div>
            <div className="radio__group">
              <input id="work" name="address_type" type="radio" />
              <label htmlFor="work">Work</label>
            </div>
          </div>
          <div className="submit__button">
            <Button title={"Save Address"} />
          </div>
        </div>
      </div>
    </AddressFormStyle>
  );
};

export default AddressForm;
