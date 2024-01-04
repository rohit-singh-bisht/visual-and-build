import React, { useState, useRef } from "react";
import styled from "styled-components";
import { ReactComponent as ChevronRed } from "../../assets/chevron-red.svg";

const FaqAccordionStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 45px;
  max-width: 712px;
  width: 100%;
  margin: auto;
  border-radius: 18.75px;
  background: #fff;
  transition: all 0.3s;
  &.show {
    background: rgba(174, 0, 0, 0.1);
    .accordion__header {
      margin-bottom: 11.5px;
    }
    .icon {
      transform: rotate(90deg);
      circle {
        fill: #fff;
        stroke-width: 0.75px;
        stroke: #ae0000;
      }
      path {
        fill: #ae0000;
      }
    }
  }
  .accordion__header {
    display: flex;
    align-items: center;
    gap: 24px;
    cursor: pointer;
    .icon {
      display: block;
      transition: all 0.3s;
      .circle,
      path {
        transition: all 0.3s;
      }
    }
    .accordion__title {
      color: #303030;
      font-size: 18px;
      font-weight: 600;
      line-height: 22.5px;
      cursor: pointer;
    }
  }
  .accordion__body {
    color: #303030;
    font-size: 15px;
    font-weight: 400;
    line-height: 22.5px; /* 150% */
    height: 0px;
    opacity: 0;
    overflow: clip;
    padding-left: 49px;
    transition: all 0.3s;
  }
`;

const FaqAccordion = () => {
  const [showBody, setShowBody] = useState(false);
  const contentRef = useRef(null);

  return (
    <FaqAccordionStyle className={`${showBody ? "show" : "hide"}`}>
      <div className="accordion__header" onClick={() => setShowBody(!showBody)}>
        <ChevronRed className="icon" />
        <h2 className="accordion__title" onClick={() => setShowBody(!showBody)}>
          What payment methods do you accept?
        </h2>
      </div>
      <div
        className={`accordion__body`}
        ref={contentRef}
        style={{
          height: showBody ? contentRef.current.scrollHeight : 0,
          opacity: showBody ? 1 : 0,
        }}
      >
        Absolutely! Once your order has been shipped, we'll send you a tracking
        num-ber and a link to our carrier's website where you can track your
        package in real-time. You can also check the status of your order by
        logging into your account and viewing your order history.
      </div>
    </FaqAccordionStyle>
  );
};

export default FaqAccordion;
