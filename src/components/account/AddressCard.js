import React from "react";
import styled from "styled-components";

const AddressCardStyle = styled.div`
  padding: 18px;
  border-radius: 7.5px;
  border: 0.75px solid #d9d9d9;
  background: #fff;
  max-width: 700px;
  width: 100%;
  margin-bottom: 24px;
  .user__address__type {
    padding: 7.5px;
    border-radius: 5.25px;
    background: #f1eded;
    display: inline-block;
    color: #000;
    font-size: 11.25px;
    font-weight: 500;
    margin-bottom: 25px;
  }
  .user__address__name {
    color: #000;
    font-size: 11.25px;
    font-weight: 400;
  }
  .user__address__details {
    color: #797979;
    font-family: Inter;
    font-size: 11.25px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 13.5px 0;
  }
  .user__phone__number {
    color: #000;
    font-size: 11.25px;
    font-weight: 400;
    color: #000;
    .user__phone__number__title {
      color: #797979;
      display: block;
    }
  }
`;

const AddressCard = () => {
  return (
    <AddressCardStyle>
      <div className="user__address__type">Home</div>
      <div className="user__address__name">Nishant Choudhary</div>
      <div className="user__address__details">
        House no 11 Sawaswati colony naya pul sehatpur, Naya pul Faridabad -
        121003, Haryana
      </div>
      <div className="user__phone__number">
        <span className="user__phone__number__title">Phone number</span>
        7503063585, 7503063585
      </div>
    </AddressCardStyle>
  );
};

export default AddressCard;
