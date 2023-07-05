import {useCallback, useEffect, useState} from "react";

import {useWallet} from "@aptos-labs/wallet-adapter-react";

import useAptosTransaction from "@/hooks/useAptosTransaction";

import {useAptos} from "@/contexts/AptosContext";

import {equipCharacterPayload} from "@/services/transactionBuilder";

import { TokenId } from "@/types/Token";

const useCharacters = () => {

    const { provider } = useAptos();

    const { account } = useWallet();

    const { submitTransaction } = useAptosTransaction()

    const [characters, setCharacters] = useState<TokenId[]>([]);

    const fetchCharacters = useCallback(async () => {
        if(account?.address?.toString()) {
            const tokens = await fetch('/api/ownedCharacters/' + account?.address?.toString())
                .then((response) => response.json())
                .catch(() => []);
            setCharacters(tokens);
        }
    }, [account?.address, provider.indexerClient])

    useEffect(() => {
        fetchCharacters();
    }, [fetchCharacters]);

    const equipCharacter = async (character: TokenId) => {
        await submitTransaction(equipCharacterPayload(
            character.tokenDataId.creator,
            character.tokenDataId.collection,
            character.tokenDataId.name,
            character.propertyVersion
        ), {
            title: `You successfully equipped ${character.tokenDataId.name}!`,
        });
    }

    return {
        characters,
        equipCharacter
    }
}

export default useCharacters