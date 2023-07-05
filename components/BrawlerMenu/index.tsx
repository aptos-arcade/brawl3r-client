import React from 'react';

import {Tab, TabList, TabPanel, TabPanels, Tabs, VStack} from "@chakra-ui/react";

import BrawlerDisplay from "@/components/BrawlerMenu/BrawlerDisplay";
import PlayerStats from "@/components/BrawlerMenu/PlayerStats";
import Leaderboard from "@/components/BrawlerMenu/Leaderboard";
import Achievements from "@/components/BrawlerMenu/Achievements";


const BrawlerMenu = () => {
    return (
        <VStack
            spacing={8}
        >
            <Tabs
                isFitted
                colorScheme='brand'
                size='lg'
                w={'100%'}
            >
                <TabList>
                    <Tab>Your BRAWL3R</Tab>
                    <Tab>Stats</Tab>
                    <Tab>Leaderboard</Tab>
                    <Tab>Achievements</Tab>
                </TabList>
                <TabPanels
                    py={8}
                >
                    <TabPanel>
                        <BrawlerDisplay />
                    </TabPanel>
                    <TabPanel>
                        <PlayerStats />
                    </TabPanel>
                    <TabPanel>
                        <Leaderboard />
                    </TabPanel>
                    <TabPanel>
                        <Achievements />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </VStack>
    )
};

export default BrawlerMenu;
