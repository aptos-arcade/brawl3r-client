import {AptosClient} from "aptos";

import {viewRequest} from "@/services/viewFunctions/viewRequest";

import {aptosArenaModule} from "@/data/modules";
import {PlayerStats} from "@/types/PlayerStats";

export const getProfileCollectionAddress = async (client: AptosClient): Promise<string> => (
    client.view(viewRequest(
        aptosArenaModule,
        "get_profile_collection_address",
        [],
        []
    ))
        .then((result) => result[0] as string)
        .catch(() => "")
)

export const getPlayerStats = async (client: AptosClient, playerAddress: string): Promise<PlayerStats> => (
    client.view(viewRequest(
        aptosArenaModule,
        "get_player_stats",
        [playerAddress],
        []
    ))
        .then((result) => ({
            eloRating: parseInt(result[0] as string),
            wins: parseInt(result[1] as string),
            losses: parseInt(result[2] as string)
        }))
        .catch(() => ({
            wins: 0,
            losses: 0,
            eloRating: 0
        }))
)