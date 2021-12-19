import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import Loading from "../Components/Loading";

import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinPrice } from "../api";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProgressBar from "../Components/ProgressBar";

library.add(faArrowAltCircleLeft);

const Title = styled.h1`
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  color: ${(props) => props.theme.accentColor};
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 500px;
  margin: 0 auto;

  &::-webkit-scrollbar {
    width: 10px;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${(props) => props.theme.accentColor};
  }
`;

const Header = styled.header`
  height: 15vh;
  display: grid;
  grid-template-columns: repeat(3, 0.5fr);
  align-items: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.cardColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  word-break: normal;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 700;
  background-color: ${(props) => props.theme.cardColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

const GoBack = styled.h1`
  font-size: max(min(3rem, 40px), 20px);
  color: ${(props) => props.theme.accentColor};
`;

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
  const { coinId } = useParams();
  const { state } = useLocation();

  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoInterface>(
    ["info", coinId],
    () => fetchCoinInfo(coinId!)
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<PriceInterface>(
    ["price", coinId],
    () => fetchCoinPrice(coinId!),
    {
      refetchInterval: 10000,
    }
  );

  const loading = infoLoading || priceLoading;

  return (
    <>
      <Helmet>
        <title>{infoData?.name}</title>
      </Helmet>
      <ProgressBar />
      <Container>
        <Header>
          <Link to="/">
            <GoBack>
              <FontAwesomeIcon icon={faArrowAltCircleLeft} />
            </GoBack>
          </Link>
          <Title>
            {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
          </Title>
          <div></div>
        </Header>

        {loading ? (
          <Loading />
        ) : (
          <>
            <Overview>
              <OverviewItem>
                <span>Rank</span>
                <span>{infoData?.rank}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Symbol</span>
                <span>${infoData?.symbol}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Price:</span>
                <span>{priceData?.quotes.USD.price.toFixed(3)}</span>
              </OverviewItem>
            </Overview>
            <Description>{infoData?.description}</Description>
            <Overview>
              <OverviewItem>
                <span>Total Suply</span>
                <span>{priceData?.total_supply}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Max Supply</span>
                <span>{priceData?.max_supply}</span>
              </OverviewItem>
            </Overview>

            <Tabs>
              <Tab isActive={chartMatch !== null}>
                <Link to={`/${coinId}/chart`} state={{ id: coinId }}>
                  Chart
                </Link>
              </Tab>
              <Tab isActive={priceMatch !== null}>
                <Link to={`/${coinId}/price`} state={{ id: coinId }}>
                  Price
                </Link>
              </Tab>
            </Tabs>
            <Outlet />
          </>
        )}
      </Container>
    </>
  );
};

export default Coin;
