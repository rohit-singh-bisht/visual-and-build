import React, { useState } from "react";
import styled from "styled-components";
import ProductSpecification from "./tabPanels/ProductSpecification";
import ProductDescription from "./tabPanels/ProductDescription";
import ProductReturn from "./tabPanels/ProductReturn";

const ProductInformationTabsStyle = styled.div`
  margin: 100px 0;
  .tabs__wrapper {
    display: flex;
    gap: 48px;
    margin-bottom: 40px;
    .tab {
      color: #bfbfbf;
      font-size: 16.5px;
      font-weight: 600;
      line-height: 22.5px;
      display: inline-block;
      position: relative;
      padding: 0 4px 14px;
      text-align: center;
      cursor: pointer;
      &.active {
        color: #000;
      }
      &.active::before {
        content: "";
        position: absolute;
        left: 0px;
        bottom: 0px;
        width: 100%;
        height: 2px;
        background-color: #ae0000;
      }
    }
  }
`;

const ProductInformationTabs = () => {
  const [selectedTabId, setSelectedTabId] = useState(0);

  const handleChange = (newValue) => {
    setSelectedTabId(newValue);
  };

  const tabsList = [
    {
      id: 0,
      title: "Specification",
      component: <ProductSpecification />,
    },
    {
      id: 1,
      title: "Description",
      component: <ProductDescription />,
    },
    {
      id: 2,
      title: "Return",
      component: <ProductReturn />,
    },
    {
      id: 3,
      title: "Reviews",
      component: <ProductSpecification />,
    },
  ];

  return (
    <ProductInformationTabsStyle>
      <div className="tabs__wrapper">
        {tabsList?.map((tab) => (
          <div
            className={`tab ${selectedTabId === tab?.id ? "active" : ""}`}
            onClick={() => handleChange(tab?.id)}
          >
            {tab?.title}
          </div>
        ))}
      </div>
      <div className="tab__panel__wrapper">
        {tabsList[selectedTabId]?.component}
      </div>
    </ProductInformationTabsStyle>
  );
};

export default ProductInformationTabs;
