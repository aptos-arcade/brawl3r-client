import {useState, useEffect, useCallback} from "react";

import {useWallet} from "@aptos-labs/wallet-adapter-react";

import { getPlayerBrawlerTokenAddress, getPlayerBrawlerData } from "@/services/viewFunctions";

import {useAptos} from "@/contexts/AptosContext";

import {CharacterData, MeleeWeaponData, RangedWeaponData} from "@/types/BrawlerData";

const usePlayer = () => {

    let { provider } = useAptos();

    let { account } = useWallet();

    const [loading, setLoading] = useState(true);
    const [playerTokenAddress, setPlayerTokenAddress] = useState("");
    const [playerCharacter, setPlayerCharacter] = useState<CharacterData>();
    const [playerMeleeWeapon, setPlayerMeleeWeapon] = useState<MeleeWeaponData>();
    const [playerRangedWeapon, setPlayerRangedWeapon] = useState<RangedWeaponData>();


    const fetchPlayerTokenAddress = useCallback(async () => {
        if(account?.address?.toString()) {
            const playerTokenAddress = await getPlayerBrawlerTokenAddress(provider.aptosClient, account.address.toString());
            setPlayerTokenAddress(playerTokenAddress);
            setLoading(false);
        }
    }, [account?.address, provider.aptosClient])


    useEffect(() => {
        fetchPlayerTokenAddress();
    }, [fetchPlayerTokenAddress]);

    const fetchBrawlerData = useCallback(async () => {
        if(account?.address?.toString()) {
            const brawlerData = await getPlayerBrawlerData(provider.aptosClient, account?.address?.toString());
            setPlayerCharacter(brawlerData.character);
            setPlayerMeleeWeapon(brawlerData.meleeWeapon);
            setPlayerRangedWeapon(brawlerData.rangedWeapon);
        }
    }, [account?.address, provider.aptosClient]);

    useEffect(() => {
        fetchBrawlerData();
    }, [fetchBrawlerData]);

    return {
        walletConnected: Boolean(account?.address?.toString()),
        loading,
        playerTokenAddress,
        playerCharacter,
        playerMeleeWeapon,
        playerRangedWeapon
    }
}

export default usePlayer;