import React from "react";
import styled from "styled-components";

const StyledMaskStyle = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
`;

const StyledMask = ({ background, zIndex, onClick }) => {
  return <StyledMaskStyle onClick={onClick} style={{ background, zIndex }} />;
};

export default StyledMask;
