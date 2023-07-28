import {sql} from "@vercel/postgres";

export const upsertPlayerName = async (playerId: string, name: string) => sql`
    insert into Players (player_id, player_name)
    values (${playerId}, ${name})
    on conflict (player_id) do update
    set player_name = ${name};
`;