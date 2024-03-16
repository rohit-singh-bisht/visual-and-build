import React from "react";
import styled from "styled-components";

const PurchaseHistoryStyle = styled.div`
  .subtitle {
    font-size: 11px;
    font-weight: 400;
    line-height: 18px;
    text-align: left;
    color: #666666;
  }
`;

const PurchaseHistory = () => {
  return (
    <PurchaseHistoryStyle>
      <p className="subtitle">Here is a history of all your purchases made.</p>
    </PurchaseHistoryStyle>
  );
};

export default PurchaseHistory;
