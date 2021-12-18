import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import Loading from "../Components/Loading";

import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProgressBar from "../Components/ProgressBar";

library.add(faShoppingBasket);

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: ${(props) => props.theme.textColor};
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
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  border-bottom: 2px solid ${(props) => props.theme.textColor};
  a {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
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
  const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins);
  console.log("mm", data);

  return (
    <>
      <Helmet>
        <title>JK's Coin</title>
      </Helmet>
      <ProgressBar />
      <Container>
        <Header>
          <Title>
            <FontAwesomeIcon icon={faShoppingBasket} />
            &nbsp;Coin Market
          </Title>
        </Header>
        {isLoading ? (
          <Loading />
        ) : (
          <CoinsList>
            {data?.slice(0, 100).map((value) => (
              <Coin key={value.id}>
                <Img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${value.symbol.toLowerCase()}`}
                  alt=""
                />
                <Link to={`/${value.id}`} state={{ name: value.name }}>
                  {value.name}
                </Link>
              </Coin>
            ))}
          </CoinsList>
        )}
      </Container>
    </>
  );
};

export default Coins;
