import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CoinApi } from "../API/CoinApi";
import Error from "../Components/Error";
import Loading from "../Components/Loading";

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

const CoinsList = styled.ul``;

const Coin = styled.li`
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  font-weight: 700;
  cursor: pointer;
  border-bottom: 2px solid ${(props) => props.theme.textColor};
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const GetCoinAPI = async () => {
    setError(null);
    setCoins([]);
    setLoading(true);
    const CoinResponse = await CoinApi.Get_Coin("")
      .then((response) => {
        console.log("Coin", response.data.slice(0, 100));
        setCoins(response.data.slice(0, 100));
      })
      .catch((e) => {
        setError(e);
      });
    setLoading(false);
    return CoinResponse;
  };

  useEffect(() => {
    GetCoinAPI();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!coins) return null;

  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      <CoinsList>
        {coins.map((value) => (
          <Coin key={value.id}>
            <Link to={`/${value.name}`}>{value.name} &rarr;</Link>
          </Coin>
        ))}
      </CoinsList>
    </Container>
  );
};

export default Coins;
