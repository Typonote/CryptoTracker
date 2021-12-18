import React from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { fetchCoinHistory } from "../api";

const Chart = () => {
  const {
    state: { id: coinId },
  } = useLocation();

  const { isLoading, data } = useQuery(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  console.log(isLoading, data);
  return <h1>{coinId}</h1>;
};

export default Chart;
