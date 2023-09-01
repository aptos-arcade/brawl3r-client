import React from 'react';
import {useWallet} from "@aptos-labs/wallet-adapter-react";
import {SimpleGrid} from "@chakra-ui/react";
import WalletOption from "@/components/WalletModal/WalletOption";

const WalletOptions = () => {

    const { wallets } = useWallet();

    return (
        <SimpleGrid
            columns={{ base: 1, sm: 2 }}
            spacing={4}
            alignItems={'center'}
            justifyContent={'center'}
        >
            {
                wallets.map((wallet) => (
                    <WalletOption wallet={wallet} key={wallet.name} />
                ))
            }
        </SimpleGrid>
    );
};

export default WalletOptions;
