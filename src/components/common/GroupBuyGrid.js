import React from "react";
import ProductList from "../product/ProductList";

const GroupBuyGrid = ({ limit = 5 }) => {
  return (
    <ProductList
      listTitle={"Group Buy Products"}
      buttonText={"View All"}
      pagination={false}
      buttonArrow={true}
      apiPath={"/product/groupby"}
    />
  );
};

export default GroupBuyGrid;
