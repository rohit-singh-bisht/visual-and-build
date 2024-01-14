import React from "react";
import styled from "styled-components";
import InfoCard from "../../components/account/InfoCard";

const AccountStyle = styled.div`
  padding: 60px 0;
  .page__title {
    color: #000;
    font-size: 27px;
    font-weight: 700;
    line-height: 34px;
    margin-bottom: 24px;
  }
  .account__info__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 24px;
    row-gap: 32px;
  }
`;

const Account = () => {
  const accountData = [
    {
      title: `Hi Harmandeep`,
      subtitle: `V&B ID: 6043495244`,
      sub1: `Wander Homes & Consulting ltd..`,
      sub2: `wanderhomes21@gmail.com`,
      sub3: `6043495244`,
      buttonText: `Edit Profile Information`,
    },
    {
      title: `Purchase History`,
      sub1: `Add receipts and keep track of your online and in-store purchases.`,
      buttonText: `View Purchase History`,
    },
    {
      title: `My List`,
      sub1: `You have not saved any products yet.`,
      buttonText: `View My List`,
    },
    {
      title: `My Wallet`,
      sub1: `Add a Payment method for Faster Checkout.`,
      buttonText: `View Wallet`,
    },
    {
      title: `My Addresses`,
      sub1: `Add and manage your addresses like shipping`,
      buttonText: `View My Address`,
    },
    {
      title: `Payment Methods`,
      sub1: `Add a Payment method for Faster Checkout.`,
      buttonText: `Add Payment Method`,
    },
  ];

  return (
    <AccountStyle>
      <div className="container">
        <div className="page__title">My Account</div>
        <div className="account__info__grid">
          {accountData?.map((data) => (
            <InfoCard {...data} />
          ))}
        </div>
      </div>
    </AccountStyle>
  );
};

export default Account;
