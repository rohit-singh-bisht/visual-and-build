import React, { useEffect } from "react";
import ProductList from "../product/ProductList";
import { useRequest } from "../../hooks/useRequest";

const GroupBuyGrid = ({ limit = 5 }) => {
  const [
    fetchGroupBuy,
    { isLoading: isFetchingGroupBuy, state: groupBuyProducts },
  ] = useRequest();

  useEffect(() => {
    const path = `/product/groupby?limit=${limit}&page=1`;
    fetchGroupBuy({ path });
  }, []);

  return (
    <ProductList
      listTitle={"Group Buy Products"}
      buttonText={"View All"}
      pagination={false}
      buttonArrow={true}
      isLoading={isFetchingGroupBuy}
      productList={groupBuyProducts?.data?.docs}
    />
  );
};

export default GroupBuyGrid;
