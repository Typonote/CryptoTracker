import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { theme } from "./theme";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ThemeProvider>
  </React.StrictMode>,

  document.getElementById("root")
);
