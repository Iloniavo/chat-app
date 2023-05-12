import type { AppProps } from "next/app";
import { ApiContextProvider } from "../context/ApiContext";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
