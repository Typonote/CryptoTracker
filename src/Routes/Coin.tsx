import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 500px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface RouterState {
  state: {
    name: string;
    rank: number;
  };
}

const Coin = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const { state } = useLocation() as RouterState;

  return (
    <>
      {state && (
        <>
          <Helmet>
            <title>{state.name}</title>
          </Helmet>
          <Container>
            <Header>
              <Title>
                {state.name} / {state.rank}
              </Title>
            </Header>
          </Container>
        </>
      )}
    </>
  );
};

export default Coin;
