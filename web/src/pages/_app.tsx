import type { AppProps } from "next/app";

import { Web3ReactProvider } from "@web3-react/core";
import { ChakraProvider , extendTheme } from "@chakra-ui/react";

import "../styles/globals.css";
import getLibrary from "../Wallet/library";




const theme = extendTheme({
  fonts: {
    body: "montserrat, sans-serif",
  },
  textStyles: {
    h1: {
      fontSize: "60px",
      fontWeight: "bold",
    },
  },
});



export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
    </Web3ReactProvider>
  );
}
