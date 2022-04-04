import type { AppProps } from "next/app";

import { Web3ReactProvider } from "@web3-react/core";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import "../styles/globals.css";
import getLibrary from "../components/Wallet/library";
import Footer from "../components/Footer/Footer";

const theme = extendTheme({
  fonts: {
    body: "montserrat, sans-serif",
  },
  textStyles: {},
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </Web3ReactProvider>
  );
}
