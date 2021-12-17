import axios from "axios";

const BASE_URL = "https://api.coinpaprika.com/v1/coins";

function Get_Coin(endpoint: string) {
  return axios.get(BASE_URL + endpoint, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const CoinApi = {
  Get_Coin,
};
