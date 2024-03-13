import React, { useEffect } from "react";
import { useRequest } from "../../hooks/useRequest";

const Filters = () => {
  const [fetchCategories, { isLoading, state: Categories }] = useRequest(
    `/category?limit=10&page=1`
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  return <div>Filters</div>;
};

export default Filters;
