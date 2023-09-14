import React from "react";

import {ChakraProvider} from "@chakra-ui/react";

import "@fontsource/press-start-2p";

import type {AppProps} from 'next/app'
import Head from "next/head";
import {Analytics} from '@vercel/analytics/react';

import {AptosProvider} from "@/contexts/AptosContext";
import WalletProvider from "@/contexts/WalletProvider";

import theme from "@/theme";
import {MagicProvider} from "@/contexts/MagicContext";

export default function App({ Component, pageProps }: AppProps) {

  return (
      <MagicProvider>
        <WalletProvider>
          <AptosProvider>
            <ChakraProvider theme={theme}>
              <Head>
                <title>BRAWL3R</title>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="Fight as your Aptos NFTs in an arcade-style 2D platform brawler game." />
                <meta property="og:title" content="BRAWL3R" />
                <meta property="og:image" content="https://www.brawl3r.com/cover.png" />
                <meta name="twitter:title" content="BRAWL3R" />
                <link rel="icon" type="image/png" href="/favicon.png" />
              </Head>
              <Component {...pageProps} />
              <Analytics />
            </ChakraProvider>
          </AptosProvider>
        </WalletProvider>
      </MagicProvider>
  )
}
