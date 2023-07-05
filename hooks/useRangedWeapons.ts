import {useCallback, useEffect, useState} from "react";

import {useWallet} from "@aptos-labs/wallet-adapter-react";

import useAptosTransaction from "@/hooks/useAptosTransaction";

import {useAptos} from "@/contexts/AptosContext";

import { getHasPlayerMintedRangedWeapon } from "@/services/viewFunctions";
import { equipRangedWeaponPayload, mintAndEquipRangedWeapon } from "@/services/transactionBuilder";

import {RangedWeapon} from "@/types/Weapons";

const useRangedWeapons = () => {

    let { provider } = useAptos();

    let { account } = useWallet();

    let { submitTransaction } = useAptosTransaction();

    const [hasPlayerMintedLoading, setHasPlayerMintedLoading] = useState(true);
    const [hasPlayerMintedRangedWeapon, setHasPlayerMintedRangedWeapon] = useState(false);

    const [rangedWeaponsLoading, setRangedWeaponsLoading] = useState(true);
    const [rangedWeapons, setRangedWeapons] = useState<RangedWeapon[]>([]);

    const fetchPlayerHasMintedRangedWeapon = useCallback(async () => {
        if(account?.address?.toString()) {
            const hasPlayerMintedRangedWeapon = await getHasPlayerMintedRangedWeapon(provider.aptosClient, account.address.toString());
            setHasPlayerMintedRangedWeapon(hasPlayerMintedRangedWeapon);
            setHasPlayerMintedLoading(false);
        }
    }, [account?.address, provider.aptosClient])

    useEffect(() => {
        fetchPlayerHasMintedRangedWeapon();
    }, [fetchPlayerHasMintedRangedWeapon])

    const fetchRangedWeapons = useCallback(async () => {
        if(account?.address?.toString()) {
            const rangedWeapons = await fetch('/api/ownedRangedWeapons/' + account?.address?.toString())
                .then((response) => response.json())
                .catch(() => []);
            setRangedWeapons(rangedWeapons);
            setRangedWeaponsLoading(false);
        }
    }, [account?.address, provider])

    useEffect(() => {
        fetchRangedWeapons();
    }, [fetchRangedWeapons]);

    const mintRangedWeapon = async () => {
        await submitTransaction(mintAndEquipRangedWeapon, {
            title: "Ranged weapon minted!",
        });
    }

    const equipRangedWeapon = async (RangedWeaponAddress: string) => {
        await submitTransaction(equipRangedWeaponPayload(RangedWeaponAddress), {
            title: "Ranged weapon equipped!",
        });
    }

    return {
        mintRangedWeapon,
        equipRangedWeapon,
        hasPlayerMintedLoading,
        hasPlayerMintedRangedWeapon,
        rangedWeaponsLoading,
        rangedWeapons
    }
}

export default useRangedWeapons