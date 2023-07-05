import React from 'react';

import {Text, VStack} from "@chakra-ui/react";

import Achievement from "@/components/BrawlerMenu/Achievements/Achievement";
import CreateBrawlerButton from "@/components/BrawlerMenu/CreateBrawlerButton";

import useStats from "@/hooks/useStats";

import {eloAchievement, gamesAchievement, killsAchievement, winsAchievement} from "@/data/achievements";

const Achievements = () => {

    const {
        hasPlayerMinted,
        wins,
        losses,
        eloRating
    } = useStats();

    return (
        <VStack
            spacing={8}
        >
            <VStack
                spacing={4}
            >
                <Text
                    textAlign={'center'}
                >
                    Achievements are earned by playing ranked mode. Each achievement has unique requirements, and issues an in-game reward
                </Text>
            </VStack>
            {
                hasPlayerMinted ? (
                    <VStack
                        w={'100%'}
                        spacing={4}
                    >
                        <Achievement
                            achievement={winsAchievement}
                            value={wins}
                        />
                        <Achievement
                            achievement={gamesAchievement}
                            value={wins + losses}
                        />
                        <Achievement
                            achievement={eloAchievement}
                            value={eloRating}
                        />
                        <Achievement
                            achievement={killsAchievement}
                            value={0}
                        />
                    </VStack>
                ) : (
                    <CreateBrawlerButton />
                )
            }
        </VStack>
    );
};

export default Achievements;
