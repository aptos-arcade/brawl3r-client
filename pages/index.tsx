import { NextPage } from "next";

import {Divider} from "@chakra-ui/react";

import Layout from "@/components/Layout";
import Header from "@/components/Header";
import Game from "@/components/Game";
import BrawlerMenu from "@/components/BrawlerMenu";

const HomePage: NextPage = () => {
  return (
      <Layout>
          <Header />
          <Divider />
          <Game />
          <Divider />
          <BrawlerMenu />
      </Layout>
  )
}

export default HomePage
