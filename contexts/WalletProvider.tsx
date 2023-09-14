import React, {useEffect, useState, useMemo} from 'react';

import {AptosWalletAdapterProvider, NetworkName, Wallet} from "@aptos-labs/wallet-adapter-react";
import {IdentityConnectWallet} from "@identity-connect/wallet-adapter-plugin";
import {PontemWallet} from "@pontem/wallet-adapter-plugin";
import {RiseWallet} from "@rise-wallet/wallet-adapter";
import {PetraWallet} from "petra-plugin-wallet-adapter";
import {MartianWallet} from "@martianwallet/aptos-wallet-adapter";
import {useMagic} from "@/contexts/MagicContext";

interface Props {
    children: React.ReactNode;
}

const WalletProvider: React.FC<Props> = ({ children }) => {

    const { magicWallet } = useMagic();

    const [baseWallets, setBaseWallets] = useState<Wallet[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        setBaseWallets([
            new IdentityConnectWallet(
                process.env.NEXT_PUBLIC_IDENTITY_CONNECT_ID as string,
                { networkName: NetworkName.Mainnet}
            ),
            new PontemWallet(),
            new RiseWallet(),
            new PetraWallet(),
            new MartianWallet(),
        ])
        setLoaded(true);
    }, [])

    const wallets = useMemo(() => (
        magicWallet ? [...baseWallets, magicWallet] : baseWallets
    ), [baseWallets, magicWallet]);

    if (!loaded) {
        return null;
    }

    return (
        <AptosWalletAdapterProvider
            plugins={wallets}
            autoConnect={true}
        >
            {children}
        </AptosWalletAdapterProvider>
    );
};

export default WalletProvider;
