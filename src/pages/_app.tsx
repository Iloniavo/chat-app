import type { AppProps } from "next/app";
import React from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../config/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
