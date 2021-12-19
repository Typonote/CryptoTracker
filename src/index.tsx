import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,

  document.getElementById("root")
);
