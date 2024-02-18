import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";

const ProgressStyle = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  inset: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Progress = () => {
  return (
    <ProgressStyle>
      <CircularProgress />
    </ProgressStyle>
  );
};

export default Progress;
