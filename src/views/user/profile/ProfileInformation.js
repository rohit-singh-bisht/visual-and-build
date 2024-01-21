import React from "react";
import styled from "styled-components";
import Button from "../../../components/common/Button";

const ProfileInformationStyle = styled.div`
  .text {
    color: #333;
    font-size: 11.25px;
    font-weight: 400;
    line-height: 18px;
    margin-bottom: 12px;
  }
  .input__wrapper {
    margin-bottom: 11.75px;
    display: flex;
    gap: 12px;
  }
  label {
    color: #333;
    font-size: 10px;
    font-weight: 400;
    line-height: 16px;
  }
  input {
    border-radius: 1.5px;
    border: 0.75px solid #666;
    background: #fff;
    width: 100%;
    height: 32px;
    padding: 6.5px;
    color: #333;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
  }
  .input_group {
    max-width: 370px;
    width: 100%;
  }
  .page__subtitle {
    color: #333;
    font-size: 24px;
    font-weight: 700;
    line-height: 30px;
    margin-bottom: 18px;
    margin-top: 24px;
  }
`;

const ProfileInformation = () => {
  return (
    <ProfileInformationStyle>
      <div className="form__info__wrapper">
        <p className="text">
          Make changes to your business details, as well as update your email
          and password.
        </p>
        <div className="input__wrapper">
          <div className="input_group">
            <label className="required">First name</label>
            <input type="text" />
          </div>
          <div className="input_group">
            <label className="required">Last name</label>
            <input type="text" />
          </div>
        </div>
        <Button type={"save"} title={"Save Changes"} />
        <div className="page__subtitle">Business Details</div>
        <p className="text">
          Your Home Depot rewards will be sent to your registered business
          address.
        </p>
        <div className="input_group">
          <label className="required">Business Name</label>
          <input type="text" />
        </div>
        <div className="input__wrapper">
          <div className="input_group">
            <label className="required">Primary Business Phone</label>
            <input type="text" />
          </div>
          <div className="input_group">
            <label className="required">
              Secondary Business Phone (Optional)
            </label>
            <input type="text" />
          </div>
        </div>
        <div className="input__wrapper">
          <div className="input_group">
            <label className="required">Business Address</label>
            <input type="text" />
          </div>
          <div className="input_group">
            <label className="required">City</label>
            <input type="text" />
          </div>
        </div>
        <div className="input__wrapper">
          <div className="input_group">
            <label className="required">Province</label>
            <select>
              <option>India</option>
              <option>British Columbia </option>
            </select>
          </div>
          <div className="input_group">
            <label className="required">Postal Code – A0A 0A0</label>
            <input type="text" />
          </div>
        </div>
        <div className="input__wrapper">
          <div className="input_group">
            <label className="required">Business or Trade</label>
            <select>
              <option>India</option>
              <option>British Columbia </option>
            </select>
          </div>
        </div>
        <Button type={"save"} title={"Save Changes"} />
        <div className="page__subtitle">Update Email</div>
        <p className="text">
          After saving your new email, you will be signed out and prompted to
          sign in with your new email ID.
        </p>
        <div className="input__wrapper">
          <div className="input_group">
            <label className="required">Email</label>
            <input type="email" />
          </div>
        </div>
        <Button type={"save"} title={"Save Changes"} />

        <div className="page__subtitle">Update Password</div>
        <div className="input__wrapper">
          <div className="input_group">
            <label className="required">Current Password</label>
            <input type="password" />
          </div>
          <div className="input_group">
            <label className="required">New Password</label>
            <input type="password" />
          </div>
        </div>
        <Button type={"save"} title={"Save Changes"} />
      </div>
    </ProfileInformationStyle>
  );
};

export default ProfileInformation;
