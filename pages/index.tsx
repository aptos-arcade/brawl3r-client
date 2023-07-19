import { NextPage } from "next";

import {Divider} from "@chakra-ui/react";

import Layout from "@/components/Layout";
import Header from "@/components/Header";
import Game from "@/components/Game";
import BrawlerMenu from "@/components/BrawlerMenu";
import WalletModal from "@/components/WalletModal";
import Head from "next/head";
import React from "react";

const HomePage: NextPage = () => {
  return (
      <>
          <Head>
              <title>BRAWL3R</title>
              <meta charSet="utf-8"/>
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
              <meta name="description" content="Fight as your Aptos NFTs in an arcade-style 2D platform brawler game." />
              <meta property="og:title" content="BRAWL3R" />
              <meta property="og:image" content="https://www.brawl3r.com/cover.png" />
              <meta name="twitter:title" content="BRAWL3R" />
              <link rel="icon" type="image/png" href="/favicon.png" />
              <link rel="apple-touch-icon" href="/favicon.png" />
          </Head>
          <Layout>
              <Header />
              <Divider />
              <Game />
              <Divider />
              <BrawlerMenu />
              <WalletModal />
          </Layout>
      </>
  )
}

export default HomePage
