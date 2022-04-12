import type { AppProps } from "next/app";

import { Provider } from "react-redux";
import { Web3ReactProvider } from "@web3-react/core";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { store } from "../redux/store";
import "../styles/globals.css";
import Layout from "../components/estructura/Layout";
import getLibrary from "../components/Wallet/library";

const theme = extendTheme({
  fonts: {
    body: "montserrat, sans-serif",
  },
  textStyles: {},
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </Web3ReactProvider>
    </Provider>
  );
}
