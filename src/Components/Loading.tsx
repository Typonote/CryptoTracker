import React from "react";
import styled from "styled-components";

const Loader = styled.div`
  height: 100vh;
  font-size: 4rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
`;

const Loading = () => {
  return (
    <>
      <Loader>Loading...</Loader>
    </>
  );
};

export default Loading;
