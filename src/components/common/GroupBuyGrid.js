import React from "react";
import ProductList from "../product/ProductList";
import { useNavigate } from "react-router-dom";

const GroupBuyGrid = ({ limit = 5 }) => {
  const navigate = useNavigate();
  return (
    <ProductList
      listTitle={"Group Buy Products"}
      buttonText={"View All"}
      pagination={false}
      buttonArrow={true}
      apiPath={"/product/groupby"}
      handleButtonClick={() => navigate("/group-buy")}
    />
  );
};

export default GroupBuyGrid;
