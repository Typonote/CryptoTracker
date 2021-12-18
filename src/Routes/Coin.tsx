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

interface InfoInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Coin = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const { state } = useLocation() as RouterState;

  const [info, setInfo] = useState<InfoInterface>();
  const [price, setPrice] = useState<PriceInterface>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const GetInfoAPI = async () => {
    setError(null);
    setInfo(undefined);
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
    setPrice(undefined);
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
