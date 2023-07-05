import React from 'react';

import {Flex, Text, VStack} from "@chakra-ui/react";

import CreateBrawlerButton from "@/components/BrawlerMenu/CreateBrawlerButton";
import Characters from "@/components/BrawlerMenu/CharacterSelect/Characters";
import MeleeWeapons from "@/components/BrawlerMenu/MeleeWeaponSelect/MeleeWeapons";
import BrawlerItem from "@/components/BrawlerMenu/BrawlerDisplay/BrawlerItem";
import ConnectWallet from "@/components/Navbar/ConnectWallet";
import CircularProgress from "@/components/Utilities/CircularProgress";
import RangedWeapons from "@/components/BrawlerMenu/RangedWeaponSelect/RangedWeapons";

import usePlayer from "@/hooks/usePlayer";

import { getMeleeWeaponName } from "@/data/meleeWeapons";
import { getRangedWeaponName } from "@/data/rangedWeapons";


const BrawlerDisplay = () => {

    const {
        playerTokenAddress,
        playerMeleeWeapon,
        playerRangedWeapon,
        playerCharacter,
        loading,
        walletConnected
    } = usePlayer()

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
                    Your brawler is used to play ranked mode, where you can earn rewards and compete for the highest ELO rating
                </Text>
                <Text
                    textAlign={'center'}
                >
                    Start composing your brawler by selecting your favorite NFT and equipping a melee weapon
                </Text>
            </VStack>
            {
                walletConnected ? (
                    loading ? (
                        <CircularProgress isIndeterminate />
                    ) : (
                        playerTokenAddress ? (
                            <Flex
                                gap={4}
                                direction={{base: 'column', md: 'row'}}
                                w={'100%'}
                            >
                                <BrawlerItem
                                    title={"Character"}
                                    value={playerCharacter?.name || 'No Character'}
                                    button={
                                        <Characters
                                            selectedCharacter={playerCharacter}
                                        />
                                    }
                                />
                                <BrawlerItem
                                    title={"Melee Weapon"}
                                    value={getMeleeWeaponName(playerMeleeWeapon)}
                                    button={
                                        <MeleeWeapons/>
                                    }
                                />
                                <BrawlerItem
                                    title={"Ranged Weapon"}
                                    value={getRangedWeaponName(playerRangedWeapon)}
                                    button={
                                        <RangedWeapons />
                                    }
                                />
                            </Flex>
                        ) : (
                            <CreateBrawlerButton />
                        )
                    )
                ) : (
                    <ConnectWallet />
                )
            }
        </VStack>
    );
};

export default BrawlerDisplay;
