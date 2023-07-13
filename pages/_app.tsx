import React, {useEffect, useState} from "react";

import { ChakraProvider } from "@chakra-ui/react";

import "@fontsource/press-start-2p";

import { AptosWalletAdapterProvider, Wallet } from "@aptos-labs/wallet-adapter-react";
import { PontemWallet } from "@pontem/wallet-adapter-plugin";
import { RiseWallet } from "@rise-wallet/wallet-adapter";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";

import type { AppProps } from 'next/app'
import Head from "next/head";

import {AptosProvider} from "@/contexts/AptosContext";

import theme from "@/theme";

export default function App({ Component, pageProps }: AppProps) {

  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setWallets([
      new PontemWallet(),
      new RiseWallet(),
      new PetraWallet(),
      new MartianWallet(),
    ])
    setLoaded(true);
  }, [])

  if (!loaded) {
    return null;
  }

  return (
      <AptosWalletAdapterProvider
          plugins={wallets}
          autoConnect={true}
      >
        <AptosProvider>
          <ChakraProvider theme={theme}>
            <Head>
              <title>BRAWL3R</title>
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
              <meta name="description" content="Fight as your Aptos NFTs in an arcade-style 2D platform brawler game." />
              <meta property="og:title" content="BRAWL3R" />
              <meta property="og:image" content="/cover.png" />
              <link rel="icon" type="image/png" href="/logo.png" />
            </Head>
            <Component {...pageProps} />
          </ChakraProvider>
        </AptosProvider>
      </AptosWalletAdapterProvider>
  )
}
