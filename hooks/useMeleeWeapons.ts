import {useCallback, useEffect, useState} from "react";

import {useWallet} from "@aptos-labs/wallet-adapter-react";

import useAptosTransaction from "@/hooks/useAptosTransaction";

import {useAptos} from "@/contexts/AptosContext";

import { getHasPlayerMintedMeleeWeapon } from "@/services/viewFunctions";
import {equipMeleeWeaponPayload, mintAndEquipMeleeWeapon} from "@/services/transactionBuilder";

import {MeleeWeapon} from "@/types/Weapons";

const useMeleeWeapons = () => {

    let { provider } = useAptos();

    let { account } = useWallet();

    let { submitTransaction } = useAptosTransaction();


    const [hasPlayerMintedLoading, setHasPlayerMintedLoading] = useState(true);
    const [hasPlayerMintedMeleeWeapon, setHasPlayerMintedMeleeWeapon] = useState(false);

    const [meleeWeaponsLoading, setMeleeWeaponsLoading] = useState(true);
    const [meleeWeapons, setMeleeWeapons] = useState<MeleeWeapon[]>([]);

    const fetchPlayerHasMintedMeleeWeapon = useCallback(async () => {
        if(account?.address?.toString()) {
            const hasPlayerMintedMeleeWeapon = await getHasPlayerMintedMeleeWeapon(provider.aptosClient, account.address.toString());
            setHasPlayerMintedMeleeWeapon(hasPlayerMintedMeleeWeapon);
            setHasPlayerMintedLoading(false);
        }
    }, [account?.address, provider.aptosClient])

    useEffect(() => {
        fetchPlayerHasMintedMeleeWeapon();
    }, [fetchPlayerHasMintedMeleeWeapon])

    const fetchMeleeWeapons = useCallback(async () => {
        if(account?.address?.toString()) {
            const meleeWeapons = await fetch('/api/ownedMeleeWeapons/' + account?.address?.toString())
                .then((response) => response.json())
                .catch(() => []);
            setMeleeWeapons(meleeWeapons);
            setMeleeWeaponsLoading(false);
        }
    }, [account?.address])

    useEffect(() => {
        fetchMeleeWeapons();
    }, [fetchMeleeWeapons, provider]);

    const mintMeleeWeapon = async () => {
        await submitTransaction(mintAndEquipMeleeWeapon, {
            title: "Melee weapon minted!",
        });
    }

    const equipMeleeWeapon = async (meleeWeaponAddress: string) => {
        await submitTransaction(equipMeleeWeaponPayload(meleeWeaponAddress), {
            title: "Melee weapon equipped!",
        });
    }

    return {
        mintMeleeWeapon,
        equipMeleeWeapon,
        hasPlayerMintedLoading,
        hasPlayerMintedMeleeWeapon,
        meleeWeaponsLoading,
        meleeWeapons
    }
}

export default useMeleeWeapons