import type {NextApiRequest, NextApiResponse} from 'next'

import {Network} from "aptos";

import {getAptosProvider} from "@/services/aptosProvider";
import {getPlayerStats, getProfileCollectionAddress} from "@/services/viewFunctions";

import {OwnersByCollection} from "@/types/Queries";
import {LeaderboardRow} from "@/types/LeaderboardRow";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<LeaderboardRow[]>
) {
    const provider = getAptosProvider(Network.MAINNET);
    const profileCollectionAddress = await getProfileCollectionAddress(provider.aptosClient);
    const owners = (await provider.queryIndexer<OwnersByCollection>({
        query: `
                query MyQuery($collection_id: String) {
                    current_collection_ownership_v2_view(
                        where: {collection_id: {_eq: $collection_id}}
                        limit: 10
                    ) {
                        owner_address
                    }
                }
            `,
        variables: {
            collection_id: profileCollectionAddress,
        }
    })).current_collection_ownership_v2_view.map((row) => row.owner_address);
    let eloRatings: LeaderboardRow[] = (await Promise.all(owners.map(async (owner) => {
        const eloRatingData = await getPlayerStats(provider.aptosClient, owner);
        return {
            name: owner,
            ...eloRatingData
        }
    }))).sort((a, b) => b.eloRating - a.eloRating);
    res.status(200).json(eloRatings);
}


