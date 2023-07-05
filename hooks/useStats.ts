import { useState, useEffect, useCallback } from 'react'

import {useWallet} from "@aptos-labs/wallet-adapter-react";

import { getPlayerStats } from "@/services/viewFunctions";

import {useAptos} from "@/contexts/AptosContext";

const useStats = () => {

    const { provider } = useAptos();

    const { account } = useWallet();

    const [loading, setLoading] = useState<boolean>(true);
    const [hasPlayerMinted, setHasPlayerMinted] = useState<boolean>(false);
    const [wins, setWins] = useState<number>(0);
    const [losses, setLosses] = useState<number>(0);
    const [eloRating, setEloRating] = useState<number>(0);

    const fetchPlayerStats = useCallback(async () => {
        if(account?.address?.toString() !== undefined) {
            setLoading(true);
            let playerEloRatingData = await getPlayerStats(provider.aptosClient, account?.address?.toString());
            console.log(playerEloRatingData);
            setEloRating(playerEloRatingData.eloRating);
            setWins(playerEloRatingData.wins);
            setLosses(playerEloRatingData.losses);
            setHasPlayerMinted(playerEloRatingData.eloRating > 0);
            setLoading(false);
        }
    }, [account?.address, provider.aptosClient],);


    useEffect(() => {
        fetchPlayerStats();
    }, [fetchPlayerStats]);

    return {
        walletConnected: account?.address?.toString() !== undefined,
        loading,
        hasPlayerMinted,
        wins,
        losses,
        eloRating
    }

}

export default useStats