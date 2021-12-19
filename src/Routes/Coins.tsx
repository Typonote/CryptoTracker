import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import Loading from "../Components/Loading";

import {
  faShoppingBasket,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProgressBar from "../Components/ProgressBar";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

library.add(faShoppingBasket, faMoon, faSun);

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: ${(props) => props.theme.textColor};

  @media screen and (max-width: 500px) {
    font-size: 2rem;
  }
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 500px;
  margin: 0 auto;
`;

const Header = styled.header`
  margin-top: 1rem;
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

  @media screen and (max-width: 500px) {
    font-size: 1rem;
    width: 70%;
    margin-left: auto;
    margin-right: auto;
  }

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

const Btn = styled.button`
  background-color: transparent;
  border: none;
  font-size: 3rem;
  position: fixed;
  bottom: 1rem;
  left: 0.5rem;
  cursor: pointer;

  @media screen and (max-width: 500px) {
    font-size: 2rem;
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
  const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins);
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  return (
    <>
      <Helmet>
        <title>JK's Coin</title>
      </Helmet>
      <ProgressBar />
      <Container>
        {isDark ? (
          <Btn onClick={toggleDarkAtom} style={{ color: "#e1b12c" }}>
            <FontAwesomeIcon icon={faSun} />
          </Btn>
        ) : (
          <Btn onClick={toggleDarkAtom}>
            <FontAwesomeIcon icon={faMoon} style={{ color: "#e1b12c" }} />
          </Btn>
        )}
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
