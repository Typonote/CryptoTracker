import ApexChart from "react-apexcharts";
import React from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import Loading from "../Components/Loading";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface HistoricalInterface {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const Chart = () => {
  const {
    state: { id: coinId },
  } = useLocation();

  const { isLoading, data } = useQuery<HistoricalInterface[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  console.log(isLoading, data);

  const isDark = useRecoilValue(isDarkAtom);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => price.close),
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
