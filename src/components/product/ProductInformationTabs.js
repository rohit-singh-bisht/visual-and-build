import React, { useState } from "react";
import styled from "styled-components";
import ProductSpecification from "./tabPanels/ProductSpecification";
import ProductDescription from "./tabPanels/ProductDescription";
import ProductReviews from "./tabPanels/ProductReviews";
import { useAppContext } from "../../context/useAppContext";

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
  @media (max-width: 768px) {
    margin-top: 32px;
    margin-bottom: 0;
    .product__information__mobile {
      padding: 0 15px;
      .product__information__section {
        padding: 20px 0 34px;
        border-top: 1px solid #d9d9d9;
      }
      .product__information__section__title {
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
        margin-bottom: 15px;
      }
    }
  }
`;

const ProductInformationTabs = ({
  specifications,
  description,
  returnText,
}) => {
  const [selectedTabId, setSelectedTabId] = useState(0);
  const { isDesktop } = useAppContext();

  const handleChange = (newValue) => {
    setSelectedTabId(newValue);
  };

  const tabsList = [
    {
      id: 0,
      title: "Specification",
      component: <ProductSpecification specifications={specifications} />,
    },
    {
      id: 1,
      title: "Description",
      component: <ProductDescription description={description} />,
    },
    {
      id: 2,
      title: "Return",
      component: <ProductDescription description={returnText} />,
    },
    {
      id: 3,
      title: "Reviews",
      component: <ProductReviews />,
    },
  ];

  return (
    <ProductInformationTabsStyle>
      {isDesktop ? (
        <>
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
        </>
      ) : (
        <div className="product__information__mobile">
          {tabsList?.map((tab) => (
            <div className="product__information__section">
              <div className="product__information__section__title">
                {tab?.title}
              </div>
              <div className="product__information__section__body">
                {tab?.component}
              </div>
            </div>
          ))}
        </div>
      )}
    </ProductInformationTabsStyle>
  );
};

export default ProductInformationTabs;
