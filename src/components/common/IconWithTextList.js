import React from "react";
import IconWithText from "./IconWithText";
import styled from "styled-components";
import { data as staticData } from "../../constants/IconsWithTextData";

const IconWithTextStyle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 60px 0;
  @media (max-width: 768px) {
    overflow: auto;
    gap: 20px;
    &::-webkit-scrollbar {
      display: none;
    }
    .icon_with_text {
      padding: 30px 0 40px;
    }
  }
`;

const IconWithTextList = ({ data }) => {
  const iconsData = data || staticData;

  return (
    <div style={{ borderTop: "1px solid rgba(48, 48, 48, 0.25)" }}>
      <IconWithTextStyle className="container">
        {iconsData?.map((item) => (
          <IconWithText
            key={item?.id}
            icon={item?.icon}
            title={item?.title}
            subtitle={item?.subtitle}
          />
        ))}
      </IconWithTextStyle>
    </div>
  );
};

export default IconWithTextList;
