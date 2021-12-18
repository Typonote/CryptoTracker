import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { CoinApi } from "../API/CoinApi";
import Loading from "../Components/Loading";
import Error from "../Components/Error";

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

  const [info, setInfo] = useState({});
  const [price, setPrice] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const GetInfoAPI = async () => {
    setError(null);
    setInfo({});
    setLoading(true);
    const InfoResponse = await CoinApi.Get_Info(`/${coinId}`)
      .then((response) => {
        console.log("Info", response.data);
        setInfo(response.data);
      })
      .catch((e) => {
        setError(e);
      });
    setLoading(false);
    return InfoResponse;
  };

  const GetPriceAPI = async () => {
    setError(null);
    setPrice({});
    setLoading(true);
    const PriceResponse = await CoinApi.Get_Price(`/${coinId}`)
      .then((response) => {
        console.log("price", response.data);
        setPrice(response.data);
      })
      .catch((e) => {
        setError(e);
      });
    setLoading(false);
    return PriceResponse;
  };

  useEffect(() => {
    GetInfoAPI();
    GetPriceAPI();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!info || !price) return null;

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
