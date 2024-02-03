import React from "react";
import IconWithText from "./IconWithText";
import styled from "styled-components";
import { data as staticData } from "../../constants/IconsWithTextData";

const IconWithTextStyle = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    overflow: auto;
    gap: 20px;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const IconWithTextList = ({ data }) => {
  const iconsData = data || staticData;

  return (
    <IconWithTextStyle>
      {iconsData?.map((item) => (
        <IconWithText
          key={item?.id}
          icon={item?.icon}
          title={item?.title}
          subtitle={item?.subtitle}
        />
      ))}
    </IconWithTextStyle>
  );
};

export default IconWithTextList;
