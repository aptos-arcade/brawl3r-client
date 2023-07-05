import {Network, Provider} from "aptos";

export const getAptosProvider = (network: Network) => new Provider(network);

export const getAptosClient = (network: Network) => getAptosProvider(network).aptosClient;

export const getIndexerClient = (network: Network) => getAptosProvider(network).indexerClient;

