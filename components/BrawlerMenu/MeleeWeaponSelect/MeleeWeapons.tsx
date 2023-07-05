import React from 'react';

import {VStack, Text, useDisclosure} from "@chakra-ui/react";

import EquipMeleeWeapon from "@/components/BrawlerMenu/MeleeWeaponSelect/EquipMeleeWeapon";
import MintMeleeWeapon from "@/components/BrawlerMenu/MeleeWeaponSelect/MintMeleeWeapon";
import Button from "@/components/Utilities/Button";
import Modal from "@/components/Utilities/Modal";
import CircularProgress from "@/components/Utilities/CircularProgress";

import useMeleeWeapons from "@/hooks/useMeleeWeapons";
import {getMeleeWeaponName} from "@/data/meleeWeapons";

const MeleeWeapons = () => {

    const {
        meleeWeapons,
        hasPlayerMintedMeleeWeapon,
        meleeWeaponsLoading,
        hasPlayerMintedLoading,
        mintMeleeWeapon,
        equipMeleeWeapon
    } = useMeleeWeapons();

    const { isOpen, onOpen, onClose } = useDisclosure()

    const onSelect = async (meleeWeaponAddress: string) => {
        await equipMeleeWeapon(meleeWeaponAddress)
        onClose()
    }

    const onMint = async () => {
        await mintMeleeWeapon()
        onClose()
    }

    return (
        <>
            <Button
                buttonType={'primary'}
                onClick={onOpen}
            >
                Equip
            </Button>
            <Modal
                modalHeader={
                    <Text
                        fontSize={'4xl'}
                        textAlign={'center'}
                    >
                        Melee Weapons
                    </Text>
                }
                modalBody={
                    <VStack>
                        {
                            hasPlayerMintedLoading ? (
                                <CircularProgress />
                            ) : (
                                hasPlayerMintedMeleeWeapon ? (
                                    meleeWeaponsLoading ? (
                                        <CircularProgress isIndeterminate />
                                    ) : (
                                        meleeWeapons.length > 0 ? (
                                            meleeWeapons.map((meleeWeapon, index) => (
                                                <EquipMeleeWeapon
                                                    key={index}
                                                    weaponName={getMeleeWeaponName(meleeWeapon)}
                                                    equipMeleeWeapon={() => onSelect(meleeWeapon.address)}
                                                />
                                            ))
                                        ) : (
                                            <Text
                                                textAlign={'center'}
                                            >
                                                No Uneqipped Melee Weapons
                                            </Text>
                                        )
                                    )
                                ) : (
                                    <MintMeleeWeapon mintMeleeWeapon={onMint} />
                                )
                            )
                        }
                    </VStack>
                }
                isOpen={isOpen}
                onClose={onClose}
                size={'xl'}
            />
        </>
    );
};

export default MeleeWeapons;
