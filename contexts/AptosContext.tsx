import {createContext, FC, ReactNode, useCallback, useContext, useEffect, useState} from "react"

import {useWallet} from "@aptos-labs/wallet-adapter-react";

import {Network, Provider} from "aptos";

import {getAptosProvider} from "@/services/aptosProvider";

interface ContextType {
    provider: Provider;
    network: Network;
    updateClient: () => Promise<void>;
}

export const DEFAULT_NETWORK: Network = Network.MAINNET;

export const AptosContext = createContext<ContextType>({
    provider: getAptosProvider(Network.MAINNET),
    network: Network.MAINNET,
    updateClient: async () => {}
});

export const useAptos = () => useContext(AptosContext);

interface AptosContextProps {
    children: ReactNode;
}

export const AptosProvider : FC<AptosContextProps> = ({ children }) => {

    const { network: networkInfo } = useWallet();

    let network = DEFAULT_NETWORK;

    const [provider, setProvider] = useState<Provider>(getAptosProvider(Network.MAINNET));

    const updateProvider = useCallback(async () => {
        setProvider(getAptosProvider(network));
    }, [network])

    useEffect(() => {
        updateProvider();
    }, [networkInfo, updateProvider]);
 
    return (
        <AptosContext.Provider
            value={{
                provider,
                network,
                updateClient: updateProvider
            }}
        >
            {children}
        </AptosContext.Provider>
    )
}