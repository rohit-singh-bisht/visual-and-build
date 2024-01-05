import React from "react";
import IconWithText from "./IconWithText";
import styled from "styled-components";
import { ReactComponent as Headphone } from "../../assets/headphone.svg";
import { ReactComponent as Secure } from "../../assets/secure.svg";
import { ReactComponent as Shipping } from "../../assets/shipping.svg";
import { ReactComponent as Transparent } from "../../assets/transparent.svg";

const IconWithTextStyle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconWithTextList = () => {
  const data = [
    {
      id: 0,
      title: "Responsive",
      subtitle: "Customer service available 24/7",
      icon: <Headphone />,
    },
    {
      id: 1,
      title: "Secure",
      subtitle: "Certified marketplace since 2017",
      icon: <Secure />,
    },
    {
      id: 2,
      title: "Shipping",
      subtitle: "Fast, and reliable worldwide",
      icon: <Shipping />,
    },
    {
      id: 3,
      title: "Transparent",
      subtitle: "Hassle-free return policy",
      icon: <Transparent />,
    },
  ];

  return (
    <IconWithTextStyle>
      {data?.map((item) => (
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
