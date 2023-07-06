import React from 'react';

import {Image, Text, VStack} from "@chakra-ui/react";

import {useWallet, Wallet} from "@aptos-labs/wallet-adapter-react";

interface Props {
    wallet: Wallet
}

const WalletOption: React.FC<Props> = ({ wallet }) => {

    const { connect } = useWallet();

    const onClick = () => {
        connect(wallet.name);
    }

    return (
        <VStack
            spacing={4}
            onClick={onClick}
            cursor={'pointer'}
            transition={'all .3s ease-in-out'}
            _hover={{
                bg: 'whiteAlpha.50',
            }}
            p={4}
            rounded={'md'}
        >
            <Image
                src={wallet.icon}
                boxSize={8}
                alt={wallet.name}
            />
            <Text>
                { wallet.name }
            </Text>
        </VStack>
    );
};

export default WalletOption;
