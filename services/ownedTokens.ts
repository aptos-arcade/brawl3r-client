import {IndexerClient} from "aptos";

import supportedCollections from "@/data/supportedCollections";

import {TokenId} from "@/types/Token/TokenId";

export const getOwnedTokens = async (
    indexerClient: IndexerClient,
    accountAddress: string,
    collection_ids: string[]
): Promise<TokenId[]> => {
    const tokens = await indexerClient.getOwnedTokens(accountAddress);
    return tokens
        .current_token_ownerships_v2
        .filter((token) => {
            let collection_id = token.current_token_data?.current_collection?.collection_id;
            return collection_id && collection_ids.includes(collection_id);
        })
        .map((token) => ({
            tokenDataId: {
                name: token.current_token_data?.token_name || "",
                collection: token.current_token_data?.current_collection?.collection_name || "",
                creator: token.current_token_data?.current_collection?.creator_address || "",
            },
            propertyVersion: token.property_version_v1 as number || 0
        }));
}

export const getAptosArenaOwnedTokens = async (
    indexerClient: IndexerClient,
    accountAddress: string
): Promise<TokenId[]> => {
    return getOwnedTokens(indexerClient, accountAddress, supportedCollections);
}