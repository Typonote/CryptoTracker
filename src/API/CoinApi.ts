import axios from "axios";

const BASE_URL = "https://api.coinpaprika.com/v1/coins";
const PRICE_URL = "https://api.coinpaprika.com/v1/tickers";

function Get_Coin(endpoint: string) {
  return axios.get(BASE_URL + endpoint, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function Get_Info(endpoint: string) {
  return axios.get(BASE_URL + endpoint, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function Get_Price(endpoint: string) {
  return axios.get(PRICE_URL + endpoint, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const CoinApi = {
  Get_Coin,
  Get_Info,
  Get_Price,
};
