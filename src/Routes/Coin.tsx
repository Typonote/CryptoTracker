import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Coin = () => {
  const { coinId } = useParams<{ coinId: string }>();

  return (
    <>
      <Helmet>
        <title>{coinId}</title>
      </Helmet>
      <div>Coin: {coinId}</div>
    </>
  );
};

export default Coin;
