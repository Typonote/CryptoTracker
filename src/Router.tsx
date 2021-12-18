import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chart from "./Routes/Chart";
import Coin from "./Routes/Coin";
import Coins from "./Routes/Coins";
import Price from "./Routes/Price";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId" element={<Coin />}>
          <Route path="chart" element={<Chart />} />
          <Route path="price" element={<Price />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
